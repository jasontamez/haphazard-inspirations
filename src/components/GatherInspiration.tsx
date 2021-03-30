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
	return original.filter((test: any) => 
		!omit.some((prop: string) => test[prop])
	);
};

const makeInspirations = (omit: string[] = []) => {
	const inspirations: BasicIdea[] = [
		...filter(action.contents, omit).map(a => new Action(a)),
		...filter(characters.contents, omit).map(c => new Character(c)),
		...filter(event.contents, omit).map(e => new AnEvent(e)),
		...filter(locale.contents, omit).map(l => new Locale(l)),
		...filter(object.contents, omit).map(o => new AnObject(o)),
		...filter(time.contents, omit).map(t => new Time(t)),
		...filter(topic.contents, omit).map(t => new Topic(t))
	];
	return inspirations;
}
export default makeInspirations;
