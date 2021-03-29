import characters from '../data/characters.json';
import action from '../data/characters.json';
import event from '../data/characters.json';
import locale from '../data/characters.json';
import time from '../data/characters.json';
import object from '../data/characters.json';
import topic from '../data/characters.json';

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

class BasicIdea {
	name?: string
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
	constructor(initializer: any) {
		let newObj = this;
		Object.getOwnPropertyNames(initializer).forEach((prop) =>(newObj[prop as keyof BasicIdea] = initializer[prop]));
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
	getIdea() {
		const plural = this.plural || "s";
		const n = this.name || "thing";
		if((typeof plural) === "boolean") {
			return n;
		}
		const article = this.article || "a";
		let amounts: number[] = [];
		const rate = this.rateBy;
		let min = this.min || 0;
		let max = this.max || 5;
		if(this.rateFavorsLower) {
			let many = 1;
			while(max >= min) {
				for(let x = 0; x < many; x++) {
					amounts.push(max);
				}
				max--;
				if(rate === "incremental") {
					many++;
				} else {
					many = many * rate!;
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
					many = many * rate!;
				}
			}
		}
		let choice = amounts[Math.floor(Math.random() * amounts.length)];
		if(choice === 0) {
			return n + plural;
		} else if (choice === 1) {
			return article + " " + n;
		} else if (this.numerals) {
			return choice.toString() + " " + n + plural;
		}
		return EnglishNumbers[choice] + " " + n + plural;
	}
}
class AnObject extends PossiblePlural {}
let proto: any = AnObject.prototype;
let def: any = object.default;
proto.min = def.min;
proto.max = def.max;
proto.rateBy = def.rateBy;
proto.rateFavorsLower = def.rateFavorsLower;
proto.plural = def.plural;
proto.article = def.article;
proto.numerals = def.numerals;

class Character extends PossiblePlural {
	realPerson?: boolean
}
proto = Character.prototype;
def = characters.default;
proto.min = def.min;
proto.max = def.max;
proto.rateBy = def.rateBy;
proto.rateFavorsLower = def.rateFavorsLower;
proto.plural = def.plural;
proto.article = def.article;
proto.numerals = def.numerals;
proto.realPerson = def.realPerson;

class Locale extends BasicIdea {
	political?: boolean
	geographical?: boolean
	construct?: boolean
	preposition?: string
	size?: "large" | "medium" | "small" | "variable" | "tiny"
	specific?: boolean
	getIdea() {
		return (this.preposition || "in") + " " + (this.name || "thing");
	}
}
proto = Locale.prototype;
def = locale.default;
proto.size = def.size;
proto.specific = def.specific;
proto.preposition = def.preposition;

class AnEvent extends BasicIdea {
	plural?: boolean
	punctual?: boolean
	getIdea() {
		return this.name || "thing";
	}
}
proto = AnEvent.prototype;
def = event.default;
proto.plural = def.plural;
proto.punctual = def.punctual;

class Topic extends BasicIdea {
	getIdea() {
		return this.name || "thing";
	}
}

class Time extends BasicIdea {
	getIdea() {
		return this.name || "thing";
	}
}

class Action extends BasicIdea {
	getIdea() {
		return this.name || "thing";
	}
}

const inspirations = {
	actions: action.content.map(a => new Action(a)),
	characters: characters.content.map(c => new Character(c)),
	events: event.content.map(e => new AnEvent(e)),
	locales: locale.content.map(l => new Locale(l)),
	objects: object.content.map(o => new AnObject(o)),
	times: time.content.map(t => new Time(t)),
	topics: topic.content.map(t => new Topic(t))
};

export default inspirations;
