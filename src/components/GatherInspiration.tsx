import characters from '../data/characters.json';
import action from '../data/characters.json';
import event from '../data/characters.json';
import locale from '../data/characters.json';
import time from '../data/characters.json';
import object from '../data/characters.json';
import topic from '../data/characters.json';

//npm install english-number

interface BasicIdea {
	name: string,
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
	realPerson?: boolean
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
}

// Character, Object
interface PossiblePlural extends BasicIdea {
	min: number
	max: number
	rateBy: number
	rateInverse: boolean
	plural: string | boolean
	article: string
	numeric: boolean
}

interface Locale extends BasicIdea {
	type: "place" | "political" | "geographical" | "construct"
	size: "large" | "medium" | "small" | "variable" | "tiny"
	specific: boolean
}

interface Event extends BasicIdea {
	plural: boolean
	punctual: boolean
}
