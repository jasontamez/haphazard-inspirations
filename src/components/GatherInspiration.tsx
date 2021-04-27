import { IdeaStorage } from './PersistentInfo';
import shuffle from 'array-shuffle';
import characters from '../data/characters.json';
import action from '../data/actions.json';
import event from '../data/events.json';
import locale from '../data/locales.json';
import time from '../data/times.json';
import object from '../data/objects.json';
import topic from '../data/topics.json';
import {
	LocalesObject,
	GenresObject,
	ContentObject,
	PersonObject,
	EventObject,
	TriggersObject,
	StatusObject
} from '../components/ReduxDucks';
import compareVersions from 'compare-versions';
import converter from 'number-to-words';

export class BasicIdea {
	idea?: string
	type?: string
	mod?: string
	new?: string
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
	mythsReligionsAndMetaphysics?: boolean
	judaism?: boolean
	christianity?: boolean
	islam?: boolean
	greekRomanMyth?: boolean
	metaphysics?: boolean
	sexual?: boolean
	illicitSubstances?: boolean
	alcohol?: boolean
	tobacco?: boolean
	modern?: boolean
	// eslint-disable-next-line
	constructor() {}
	getIdea() {
		return this.idea || "idea";
	}
	id() {
		return String(this.idea) + String(this.type);
	}
}

class BasicError extends BasicIdea {
	constructor(msg: string) {
		super();
		this.idea = msg;
		this.type = "error";
	}
}
let BasicError1 = new BasicError("ERROR");

// Character, Object
class PossiblePlural extends BasicIdea {
	min?: number
	max?: number
	rateBy?: number | "incremental"
	rateFavorsLower?: boolean
	plural?: string | boolean | [string, string]
	article?: string
	numerals?: boolean
	genderPossessive?: string | false
	getIdea(Idea = this) {
		const plural = Idea.plural;
		const idea = Idea.idea || "blank idea";
		if(plural === true || plural === false) {
			// Permanently plural or singular. No further action needed.
			return idea;
		}
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
		if(Array.isArray(plural)) {
			// [pre number, post number]
			if(choice === 1) {
				return idea;
			} else if (Idea.numerals) {
				return plural[0] + String(choice) + plural[1];
			}
			return plural[0] + converter.toWords(choice) + plural[1];
		}
		const pluralEnd: string = (plural === "" ? "" : (plural || "s"));
		const article = Idea.article || "a";
		if(choice === 0) {
			return idea + pluralEnd;
		} else if (choice === 1) {
			return article + " " + idea;
		} else if (Idea.numerals) {
			return choice.toString() + " " + idea + pluralEnd;
		}
		return converter.toWords(choice) + " " + idea + pluralEnd;
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
	}
}
export class Character extends PossiblePlural {
	realPerson?: boolean
	fictionalCharacter?: boolean
	getIdea() {
		if(this.realPerson) {
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
	}
}

class Locale extends BasicIdea {
	political?: boolean
	geographical?: boolean
	construct?: boolean
	preposition?: string
	largeSize?: boolean
	mediumSize?: boolean
	smallSize?: boolean
	variableSize?: boolean
	tinySize?: boolean
	specific?: boolean
	getIdea() {
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
	}
}

class ATime extends BasicIdea {
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
	}
}

export class Action extends BasicIdea {
	possessive?: boolean
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
	}
}

type UsedIdea = [any, number];
type Omit = BasicIdea | UsedIdea;

const makeIdea = (idea: any) => {
	switch(idea.type) {
		case "action":
			return new Action(idea);
		case "character":
			return new Character(idea);
		case "event":
			return new AnEvent(idea);
		case "locale":
			return new Locale(idea);
		case "object":
			return new AnObject(idea);
		case "time":
			return new ATime(idea);
		case "topic":
			return new Topic(idea);
	}
	return BasicError1;
};

const loadAndTotalInformation = () => {
	let total = 0;
	let mtot = 0;
	let mods: number[] = [];
	const mapAndMods = (base: any, item: any, type: string) => {
		const o = {...base, ...item, type: type};
		if(typeof o.plural === "string") {
			let m = o.max - o.min + 1;
			mtot += m;
			mods.push(m);
		}
		return o;
	};
	let ideas: object[] = [
		...action.contents.map(a => ({...action.default, ...a, type: "action"})),
		...characters.contents.map(c => mapAndMods(characters.default, c, "character")),
		...event.contents.map(e => ({...event.default, ...e, type: "event"})),
		...locale.contents.map(l => ({...locale.default, ...l, type: "locale"})),
		...object.contents.map(o => mapAndMods(object.default, o, "object")),
		...time.contents.map(t => ({...time.default, ...t, type: "time"})),
		...topic.contents.map(t => ({...topic.default, ...t, type: "topic"}))
	];
	let items = ideas.length + mtot - 1;
	let c = ideas.length - mods.length;
	while (c > 0) {
		total += items;
		items--;
		c--;
	}
	// sort
	mods.sort((a: number, b: number) => a - b);
	// remove highest number
	mods.pop();
	while(mods.length > 0) {
		let m = mods.shift()!;
		mtot -= m;
		total += (mtot * m);
	}
	return {
		ideas,
		total
	};
};

export const initializeIdeas = (callback: Function, status: StatusObject) => {
	let info = loadAndTotalInformation();
	let ideas = shuffle(info.ideas);
	let total = info.total;
	Promise.all([
		IdeaStorage.setItem("sent", []),
		IdeaStorage.setItem("ideas", ideas),
		IdeaStorage.setItem("omit", [])
	]).then(() => {
		callback(status, {type: "initialized", value: total});
	}).catch((e) => {
		console.log("ERROR - INIT IDEAS:");
		console.log(e);
		callback(status, {type: "initialized", value: total});
	});
};

export const loadNewAndModifiedIdeas = (callback: Function, status: StatusObject) => {
	Promise.all([
		IdeaStorage.getItem("sent"),
		IdeaStorage.getItem("ideas"),
		IdeaStorage.getItem("omit")
	]).then((values: any[]) => {
		let sent = values[0] as UsedIdea[];
		let ideas = values[1] as any[];
		let omit = values[2] as Omit[];
		let info = loadAndTotalInformation();
		let allIdeas = info.ideas;
		let total = info.total;
		let modded: any = { length: 0 };
		let added: any[] = [];
		const lastUpdate = status.new as string;
		allIdeas.forEach((i: any) => {
			if(i.new) {
				if(compareVersions.compare(i.new, lastUpdate, ">")) {
					// no need to modify if it's new to us
					i.mod && (delete i.mod);
					i.rename && (delete i.rename);
					added.push(i);	
				}
				delete i.new;
			}
			if(i.mod) {
				if(compareVersions.compare(i.mod, lastUpdate, ">")) {
					let front: string = i.idea as string;
					if(i.rename !== undefined) {
						front = i.rename;
					}
					modded[front + " " + (i.type as string)] = i;
					modded.length++;
				}
				delete i.mod;
				i.rename && (delete i.rename);
			}
		});
		console.log(modded);
		console.log(added);
		if(modded.length > 1) {
			ideas = ideas.map((i: any) => {
				let prop = (i.idea as string) + " " + (i.type as string);
				return modded[prop] || i;
			});
			sent = sent.map((s: UsedIdea) => {
				let i = s[0];
				let prop = i.idea + " " + i.type;
				return [modded[prop] || i, s[1]];
			});
			omit = omit.map((o: Omit) => {
				if(Array.isArray(o)) {
					let i = o[0];
					let prop = i.idea + " " + i.type;
					return [modded[prop] || i, o[1]];
				}
				let prop = (o.idea as string) + " " + (o.type as string);
				return modded[prop] || o;
			});
		}
		if(added.length > 1) {
			ideas = shuffle(ideas.concat(added));
		}
		Promise.all([
			IdeaStorage.setItem("sent", sent),
			IdeaStorage.setItem("ideas", ideas),
			IdeaStorage.setItem("omit", omit)
		]).then(() => {
			callback(status, {type: "new items loaded", value: total});
		}).catch((e) => {
			console.log("ERROR - NEW/MODDED IDEAS:");
			console.log(e);
			callback(status, {type: "new items loaded", value: total});
		});
	});
};

export const getNewIdeas = (callback: Function, doFlush: boolean = false, amount: number = 2) => {
	let flushFlag = false;
	Promise.all([
		IdeaStorage.getItem("sent"),
		IdeaStorage.getItem("ideas")
	]).then((values: any[]) => {
		let NOW = Date.now();
		let sent = values[0] as UsedIdea[];
		let ideas = values[1] as any[];
		if(doFlush) {
			// Check sent ideas to see if they can be re-introduced to the pool
			let ind = -1;
			sent.every((pair: UsedIdea, i: number) => {
				if(pair[1] > NOW) {
					ind = i;
					return true;
				}
				return false;
			});
			if(ind !== -1) {
				ind++;
				let expired: any[] = sent.slice(0, ind).map(pair => pair[0]);
				sent = sent.slice(ind);
				let lenny = ideas.length;
				if(lenny > 50) {
					lenny = Math.floor(lenny / 2);
					let back = shuffle(ideas.slice(lenny).concat(expired));
					ideas = ideas.slice(0, lenny).concat(back);
				} else {
					ideas = shuffle(ideas.concat(expired));
				}
			}
			flushFlag = true;
		}
		if(ideas.length < 2) {
			// We do not have enough ideas. Expire some from sent.
			let expired: any[] = shuffle(sent.slice(0, 20).map(pair => pair[0]));
			sent = sent.slice(20);
			ideas = ideas.concat(expired);
			flushFlag = true;
		}
		let idea1: any = ideas.shift();
		let idea2: any = ideas.shift();
		let Idea1: BasicIdea = makeIdea(idea1);
		let Idea2: BasicIdea = makeIdea(idea2);
		sent.push([idea1, NOW], [idea2, NOW]);
		if(Idea1 === BasicError1 || Idea2 === BasicError1) {
			Idea1 = BasicError1;
			Idea2 = new BasicError("comp/GI/mi");
		}
		Promise.all([
			IdeaStorage.setItem("sent", sent),
			IdeaStorage.setItem("ideas", ideas)
		]).then(() => {
			callback(Idea1, Idea2, flushFlag);
		}).catch((e) => {
			console.log("ERROR - SAVE IDEAS AFTER GET:");
			console.log(e);
			callback(BasicError1, new BasicError("comp/GI/gni2"), flushFlag)
		});
	}).catch((e) => {
		console.log("ERROR - GET NEW IDEAS:");
		console.log(e);
		callback(BasicError1, new BasicError("comp/GI/gni1"))
	});
};

export const pruneIdeas = (callback: Function, objects: [LocalesObject, GenresObject, ContentObject, PersonObject, EventObject, TriggersObject], status: StatusObject) => {
	const getOmissions = () => {
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
	const isOmittable = (check: any, omissions: string[]) => {
		return omissions.some((p: string) => {
			return check[p];
		});
	};
	Promise.all([
		IdeaStorage.getItem("sent"),
		IdeaStorage.getItem("ideas"),
		IdeaStorage.getItem("omit")
	]).then((values: any[]) => {
		let sent = values[0] as UsedIdea[];
		let ideas = values[1] as any[];
		let omit = values[2] as Omit[];
		let newOmit: Omit[] = [];
		let unomit: Omit[] = [];
		let omissions = getOmissions();
		sent = sent.filter((s: UsedIdea) => {
			let res: boolean = isOmittable(s[0], omissions);
			if(res) {
				newOmit.push(s);
			}
			return !res;
		});
		ideas = ideas.filter((s: any) => {
			let res: boolean = isOmittable(s, omissions);
			if(res) {
				newOmit.push(s);
			}
			return !res;
		});
		omit = omit.filter((s: Omit) => {
			let test = Array.isArray(s) ? s[0] : s;
			let res: boolean = isOmittable(test, omissions);
			if(!res) {
				unomit.push(s);
			}
			return res;
		});
		unomit = unomit.filter((s: Omit) => {
			if(Array.isArray(s)) {
				sent.push(s);
				return false;
			}
			return true;
		});
		sent.sort((a: UsedIdea, b: UsedIdea) => {
			return a[1] - b[1];
		});
		if(ideas.length > 50) {
			let lenny = ideas.length;
			let i1 = ideas.slice(0, lenny);
			let i2 = shuffle(ideas.slice(lenny).concat(unomit as BasicIdea[]));
			ideas = i1.concat(i2);
		} else {
			ideas = shuffle(ideas.concat(unomit as BasicIdea[]));
		}
		omit = omit.concat(newOmit);
		Promise.all([
			IdeaStorage.setItem("sent", sent),
			IdeaStorage.setItem("ideas", ideas),
			IdeaStorage.setItem("omit", omit)
		]).then(() => {
			callback(status, {type: "omissions noted"});
		}).catch((e) => {
			console.log("ERROR - SAVE IDEAS AFTER OMISSIONS:");
			console.log(e);
		});
	}).catch((e) => {
		console.log("ERROR - SAVE IDEAS TRYING TO OMIT OMISSIONS:");
		console.log(e);
	});
};


export const hiddenDebugInfo = (callback: Function) => {
	Promise.all([
		IdeaStorage.getItem("sent"),
		IdeaStorage.getItem("ideas"),
		IdeaStorage.getItem("omit")
	]).then((values: any[]) => {
		let output: string[] = [];
		let sent = values[0] as UsedIdea[];
		let ideas = values[1] as any[];
		let omit = values[2] as Omit[];
		output.push("SENT", "----");
		sent.forEach((s: UsedIdea) => {
			output.push(JSON.stringify(s));
		});
		output.push("", "", "IDEAS", "-----");
		ideas.forEach((i: any) => {
			output.push(JSON.stringify(i));
		});
		output.push("", "", "OMITTED", "-------");
		omit.forEach((o: Omit) => {
			output.push(JSON.stringify(o));
		});
		callback(output);
	});
};