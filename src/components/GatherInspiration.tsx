import { IdeaStorage } from './PersistentInfo';
import { useDispatch } from "react-redux";
import { StateObject, removeFromUsed, setIdeas } from './ReduxDucks';
import shuffle from 'array-shuffle';
import characters from '../data/characters.json';
import action from '../data/actions.json';
import event from '../data/events.json';
import locale from '../data/locales.json';
import time from '../data/times.json';
import object from '../data/objects.json';
import topic from '../data/topics.json';

//npm install english-number
//import { nameOf } from 'english-number';
//const englishNumber = (input: number) => nameOf(input).toLowerCase().replace(/ and /g, " ");
//export default englishNumber;

const EnglishNumbers = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen",
	"twenty"
];

export class BasicIdea {
	idea?: string
	type?: string
	fantasy?: boolean
	medievalFantasy?: boolean
	historicalFiction?: boolean
	western?: boolean
	samurai?: boolean
	superhero?: boolean
	horror?: boolean
	scifi?: boolean
	spacefaring?: boolean
	properName?: boolean
	humanDeath?: boolean
	humanDistress?: boolean
	animalDeath?: boolean
	animalDistress?: boolean
	religionAndMyths?: boolean
	christianity?: boolean
	greekRomanMyth?: boolean
	sexual?: boolean
	illicitSubstances?: boolean
	alcohol?: boolean
	tobacco?: boolean
	modern?: boolean
	// eslint-disable-next-line
	constructor() {}
	getIdea() {
		console.log(this);
		return this.idea || "idea";
	}
	id() {
		return String(this.idea) + String(this.type);
	}
}

// Character, Object
class PossiblePlural extends BasicIdea {
	min?: number
	max?: number
	rateBy?: number | "incremental"
	rateFavorsLower?: boolean
	plural?: string | boolean
	article?: string
	numerals?: boolean
	getNumber(n: number) {
		return EnglishNumbers[n];
	}
	getIdea(Idea = this) {
		console.log(Idea);
		const plu = Idea.plural;
		const idea = Idea.idea || "idea";
		if((typeof plu) === "boolean") {
			return idea;
		}
		const plural = plu || "s";
		const article = Idea.article || "a";
		let amounts: number[] = [];
		const rate = Idea.rateBy === undefined ? 1 : Idea.rateBy;
		let min = Idea.min || 0;
		let max = Idea.max || 5;
		if(Idea.rateFavorsLower) {
			let many = 1;
			while(max >= min) {
				for(let x = 0; x < many; x++) {
					amounts.push(max);
				}
				max--;
				if(rate === "incremental") {
					many++;
				} else {
					many = many * rate;
				}
			}
		} else {
			let many = 1;
			while(min <= max) {
				for(let x = 0; x < many; x++) {
					amounts.push(min);
				}
				min++;
				if(rate === "incremental") {
					many++;
				} else {
					many = many * rate;
				}
			}
		}
		let choice = amounts[Math.floor(Math.random() * amounts.length)];
		if(choice === 0) {
			return idea + plural;
		} else if (choice === 1) {
			return article + " " + idea;
		} else if (Idea.numerals) {
			return choice.toString() + " " + idea + plural;
		}
		return EnglishNumbers[choice] + " " + idea + plural;
	}
}
class AnObject extends PossiblePlural {
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = object.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "object";
	}
}

class Character extends PossiblePlural {
	realPerson?: boolean
	getIdea() {
		if(this.realPerson) {
			console.log(this);
			return this.idea || "idea";
		}
		return super.getIdea(this);
	}
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = characters.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "character";
	}
}

class Locale extends BasicIdea {
	political?: boolean
	geographical?: boolean
	construct?: boolean
	preposition?: string
	size?: "large" | "medium" | "small" | "variable" | "tiny"
	specific?: boolean
	getIdea() {
		console.log(this);
		return (this.preposition || "in") + " " + (this.idea || "idea");
	}
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = locale.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "locale";
	}
}

class AnEvent extends BasicIdea {
	plural?: boolean
	punctual?: boolean
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = event.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "event";
	}
}

class Topic extends BasicIdea {
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = topic.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "topic";
	}
}

class Time extends BasicIdea {
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = time.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "time";
	}
}

class Action extends BasicIdea {
	constructor(initializer: any) {
		super();
		let newObj: any = this;
		const parent: any = action.default;
		Object.getOwnPropertyNames(parent).forEach(
			(prop: string) =>
				(newObj[prop] = parent[prop])
		);
		Object.getOwnPropertyNames(initializer).forEach(
			(prop: string) =>
				(newObj[prop] = initializer[prop])
		);
		this.type = "action";
	}
}

const filter = (original: any[], omit: string[] = []) => {
	if(omit.length === 0) {
		return original;
	}
	let gone: any[] = [];
	let staying: any[] =[];
	original.forEach((testing: any) => {
		let test: any = testing;
		if(Array.isArray(test)) {
			test = testing[0];
		}
		if(omit.some((prop: string) => test[prop])) {
			gone.push(testing);
		} else {
			staying.push(testing);
		}
	});
	return [gone, staying];
};

const makeInspirations = (omit: string[] = []) => {
	const inspirations: BasicIdea[] = [
		...filter(action.contents, omit)[1].map((a: any) => new Action(a)),
		...filter(characters.contents, omit)[1].map((c: any) => new Character(c)),
		...filter(event.contents, omit)[1].map((e: any) => new AnEvent(e)),
		...filter(locale.contents, omit)[1].map((l: any) => new Locale(l)),
		...filter(object.contents, omit)[1].map((o: any) => new AnObject(o)),
		...filter(time.contents, omit)[1].map((t: any) => new Time(t)),
		...filter(topic.contents, omit)[1].map((t: any) => new Topic(t))
	];
	return inspirations;
}
export default makeInspirations;

export const initializeIdeas = () => {
	let all: BasicIdea[] = shuffle([
		...action.contents.map(a => new Action(a)),
		...characters.contents.map(c => new Character(c)),
		...event.contents.map(e => new AnEvent(e)),
		...locale.contents.map(l => new Locale(l)),
		...object.contents.map(o => new AnObject(o)),
		...time.contents.map(t => new Time(t)),
		...topic.contents.map(t => new Topic(t))
	]);
	let sent: BasicIdea[] = all.slice(0, 100);
	let ideas: BasicIdea[] = all.slice(100);
	Promise.all([
		IdeaStorage.setItem("sent", sent),
		IdeaStorage.setItem("ideas", ideas),
		IdeaStorage.setItem("used", []),
		IdeaStorage.setItem("omit", []),
		IdeaStorage.setItem("omissions", "")
	]).then(() => {
		const dispatch = useDispatch();
		dispatch(setIdeas(sent));
	}).catch((e) => {
		console.log("ERROR - INIT IDEAS:");
		console.log(e);
	});
};

type UsedItem = [BasicIdea, number]

export const updateFromState = (state: StateObject) => {
	Promise.all([
		IdeaStorage.getItem("sent"),
		IdeaStorage.getItem("ideas"),
		IdeaStorage.getItem("used"),
		IdeaStorage.getItem("omit"),
		IdeaStorage.getItem("omissions")
	]).then((values: any[]) => {
		const getOmissions = () => {
			let objects: any[] = [
				state.locales,
				state.genres,
				state.content,
				state.person,
				state.event,
				state.triggers
			];
			let omissions: string[] = [];
			objects.forEach((o: any) => {
				Object.keys(o).forEach((k: string) => {
					if(o[k]) {
						omissions.push(k);
					}
				});
			});
			return omissions;
		};
		const usedSort = (a: [any, number], b: [any, number]) => {
			return a[1] - b[1];
		};
		const now = Date.now();
		let stateUsed = state.used.map((idea: BasicIdea) => idea.id());
		let sent: BasicIdea[] = values.shift();
		let ideas: BasicIdea[] = values.shift();
		let used: UsedItem[] = values.shift();
		let omit: (BasicIdea | UsedItem)[] = values.shift();
		let omissions: string = values.shift();
		let newOmissions = getOmissions();
		if(omissions !== newOmissions.join("")) {
			// Need to scan everything to omit/restore
			let storage: any[] = [];
			let o: any = [];
			let k: any = [];
			let u: UsedItem[] = [];
			[o, k] = filter(omit, newOmissions);
			omit = o;
			storage = k.filter((x: any) => {
				if(Array.isArray(x)) {
					u.push(x as UsedItem);
					return false;
				}
				return true;
			});
			[o, k] = filter(ideas, newOmissions);
			omit = omit.concat(o);
			ideas = k;
			if(ideas.length > 100) {
				let lenny = Math.floor(ideas.length / 2);
				let front = ideas.slice(0, lenny);
				let back = ideas.slice(lenny).concat(storage);
				shuffle(back);
				ideas = front.concat(back);
			}
			[o, k] = filter(sent, newOmissions);
			omit = omit.concat(o);
			sent = k;
			[o, k] = filter(used, newOmissions);
			omit = omit.concat(o);
			used = k.concat(u);
			used.sort(usedSort);
		}
		let removed: BasicIdea[] = [];
		sent = sent.filter((idea: BasicIdea) => {
			if(stateUsed.indexOf(idea.id())) {
				used.push([idea, now]);
				removed.push(idea);
				return false;
			}
			return true;
		});
		const dispatch = useDispatch();
		dispatch(removeFromUsed(removed));
		IdeaStorage.setItem("sent", sent);
		IdeaStorage.setItem("ideas", ideas);
		IdeaStorage.setItem("used", used);
		IdeaStorage.setItem("omit", omit);
		IdeaStorage.setItem("omissions", newOmissions.join(""));
	});
	return null;
};
