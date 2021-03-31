import maybeUpdateTheme from './MaybeUpdateTheme';
import { StateStorage } from './PersistentInfo';
import { BasicIdea, updateFromState } from './GatherInspiration';
import debounce from './Debounce';
import packageJson from '../../package.json';


//
//
// CONSTS
//
//
//const ONE_DAY = 86400000; // 1000 * 60 * 60 * 24
//const THIRTY_DAYS = 2592000000; // 1000 * 60 * 60 * 24 * 30;
const IDEA_DELAY = 2500; // 2.5 seconds
export let VERSION = {
	current: packageJson.version
};
const p = "haphazard-inspiration/reducer/";
const OVERWRITE_STATE = p+"OVERWRITE_STATE";
const UPDATE_THEME = p+"UPDATE_THEME";
const UPDATE_IDEA = p+"UPDATE_IDEA";
const SET_IDEAS = p+"SET_IDEAS";
const REMOVE_FROM_USED = p+"REMOVE_FROM_USED";
//const B = p+"";
//const C = p+"";
//const D = p+"";
//const E = p+"";
//const F = p+"";
const TOGGLE_SETTING = p+"TOGGLE_SETTING";
const TOGGLE_LOCALE = p+"TOGGLE_LOCALE";
const TOGGLE_GENRE = p+"TOGGLE_GENRE";
const TOGGLE_CONTENT = p+"TOGGLE_CONTENT";
const TOGGLE_PERSON = p+"TOGGLE_PERSON";
const TOGGLE_EVENT = p+"TOGGLE_EVENT";
const TOGGLE_TRIGGER = p+"TOGGLE_TRIGGER";


//
//
// FUNCTIONS
//
//
export function overwriteState(payload: StateObject) {
	return {type: OVERWRITE_STATE, payload};
}
export function updateTheme(payload: string) {
	return {type: UPDATE_THEME, payload};
}
export function updateIdea(payload: number) {
	return {type: UPDATE_IDEA, payload};
}
export function setIdeas(payload: BasicIdea[]) {
	return {type: SET_IDEAS, payload};
}
export function removeFromUsed(payload: BasicIdea[]) {
	return {type: REMOVE_FROM_USED, payload};
}
export function toggleSetting(payload: keyof SettingsObject) {
	return {type: TOGGLE_SETTING, payload};
}
export function toggleLocale(payload: keyof LocalesObject) {
	return {type: TOGGLE_LOCALE, payload};
}
export function toggleGenre(payload: keyof GenresObject) {
	return {type: TOGGLE_GENRE, payload};
}
export function toggleContent(payload: keyof ContentObject) {
	return {type: TOGGLE_CONTENT, payload};
}
export function togglePerson(payload: keyof PersonObject) {
	return {type: TOGGLE_PERSON, payload};
}
export function toggleEvent(payload: keyof EventObject) {
	return {type: TOGGLE_EVENT, payload};
}
export function toggleTrigger(payload: keyof TriggersObject) {
	return {type: TOGGLE_TRIGGER, payload};
}

//
//
// INTERFACES
//
//
interface SettingsObject {
	shake: boolean
}
interface LocalesObject {
	any: boolean
	specific: boolean
	political: boolean
	large: boolean
	medium: boolean
	small: boolean
	tiny: boolean
}
interface GenresObject {
	fantasy: boolean
	medievalFantasy: boolean
	superhero: boolean
	historicalFiction: boolean
	western: boolean
	samurai: boolean
	horror: boolean
	scifi: boolean
	spacefaring: boolean
}
interface ContentObject {
	properName: boolean
	modern: boolean
	religionAndMyths: boolean
	christianity: boolean
	greekRomanMyth: boolean
	sexual: boolean
	illicitSubstances: boolean
	alcohol: boolean
	tobacco: boolean
}
interface PersonObject {
	realPerson: boolean
}
interface EventObject {
	nonPunctualEvent: boolean
}
interface TriggersObject {
	humanDeath: boolean
	humanDistress: boolean
	animalDeath: boolean
	animalDistress: boolean
}
export interface StateObject {
	currentVersion: string
	theme: string
	idea1: string | null
	idea2: string | null
	lastIdeaGenerated: number,
	pending: BasicIdea[] | null
	used: BasicIdea[]
	settings: SettingsObject
	locales: LocalesObject
	genres: GenresObject
	content: ContentObject
	person: PersonObject
	event: EventObject
	triggers: TriggersObject
}
export const blankAppState: StateObject = {
	currentVersion: VERSION.current,
	theme: "Default",
	idea1: null,
	idea2: null,
	lastIdeaGenerated: 0,
	pending: null,
	used: [],
	settings: {
		shake: false
	},
	locales: {
		any: false,
		specific: false,
		political: false,
		large: false,
		medium: false,
		small: false,
		tiny: false
	},
	genres: {
		fantasy: false,
		medievalFantasy: false,
		superhero: false,
		historicalFiction: false,
		western: false,
		samurai: false,
		horror: false,
		scifi: false,
		spacefaring: false
	},
	content: {
		properName: false,
		modern: false,
		religionAndMyths: false,
		christianity: false,
		greekRomanMyth: false,
		sexual: false,
		illicitSubstances: false,
		alcohol: false,
		tobacco: false
	},
	person: {
		realPerson: false
	},
	event: {
		nonPunctualEvent: false
	},
	triggers: {
		humanDeath: false,
		humanDistress: false,
		animalDeath: false,
		animalDistress: false	
	}
};

//
//
// SUB-REDUCERS
//
//
const reduceAll = (state: StateObject, setPending: boolean = true) => {
	return {
		currentVersion: state.currentVersion,
		theme: state.theme,
		idea1: state.idea1,
		idea2: state.idea2,
		lastIdeaGenerated: state.lastIdeaGenerated,
		pending: setPending && state.pending ? [...state.pending] : null,
		used: [...state.used],
		settings: {...state.settings},
		locales: {...state.locales},
		genres: {...state.genres},
		content: {...state.content},
		person: {...state.person},
		event: {...state.event},
		triggers: {...state.triggers}
	};
}
export const checkIfState = (possibleState: StateObject | any): possibleState is StateObject => {
	const check = (possibleState as StateObject);
	return Object.keys(blankAppState).every((prop: string) => {
		const p: any = check[prop as keyof StateObject];
		return p !== undefined;
	});
};

//
//
// REDUCER
//
//
export function reducer(state: StateObject = blankAppState, action: any) {
	const payload = action.payload;
	let final: StateObject;
	let b: string;
	let idea: BasicIdea;
	let ideaStateUpdate = false;
	switch(action.type) {
		case OVERWRITE_STATE:
			final = reduceAll(payload);
			break;
		case UPDATE_THEME:
			final = reduceAll(state);
			final.theme = payload;
			maybeUpdateTheme(state.theme, payload);
			break;
		case UPDATE_IDEA:
			if(state.pending !== null) {
				return state;
			}
			final = reduceAll(state);
			idea = final.pending!.shift() as BasicIdea;
			if(payload === 1) {
				final.idea1 = idea.getIdea();
			} else {
				final.idea2 = idea.getIdea();
			}
			final.used.push(idea);
			final.lastIdeaGenerated = Date.now() + IDEA_DELAY;
			ideaStateUpdate = true;
			break;
		case SET_IDEAS:
			final = reduceAll(state, false);
			final.pending = [...payload];
			break;
		case REMOVE_FROM_USED:
			final = reduceAll(state);
			final.used = final.used.filter((used: BasicIdea) => {
				return payload.indexOf(used) === -1;
			});
			break;
		case TOGGLE_SETTING:
			b = payload;
			final = reduceAll(state);
			final.settings[b as keyof SettingsObject] = !final.settings[b as keyof SettingsObject];
			break;
		case TOGGLE_LOCALE:
			b = payload;
			final = reduceAll(state);
			final.locales[b as keyof LocalesObject] = !final.locales[b as keyof LocalesObject];
			break;
		case TOGGLE_GENRE:
			b = payload;
			final = reduceAll(state);
			final.genres[b as keyof GenresObject] = !final.genres[b as keyof GenresObject];
			break;
		case TOGGLE_CONTENT:
			b = payload;
			final = reduceAll(state);
			final.content[b as keyof ContentObject] = !final.content[b as keyof ContentObject];
			break;
		case TOGGLE_PERSON:
			b = payload;
			final = reduceAll(state);
			final.person[b as keyof PersonObject] = !final.person[b as keyof PersonObject];
			break;
		case TOGGLE_EVENT:
			b = payload;
			final = reduceAll(state);
			final.event[b as keyof EventObject] = !final.event[b as keyof EventObject];
			break;
		case TOGGLE_TRIGGER:
			b = payload;
			final = reduceAll(state);
			final.triggers[b as keyof TriggersObject] = !final.triggers[b as keyof TriggersObject];
			break;
		default:
			return state;
	}
	debounce(saveCurrentState, [final]);
	if(ideaStateUpdate) {
		debounce(updateFromState, [final], 250);
	}
	console.log(action.type);
	console.log(final);
	return final;
}

const saveCurrentState = (state: StateObject) => {
	let newState = reduceAll(state);
	// Save
	StateStorage.setItem("lastState", newState);
	console.log("Save");
	console.log(newState);
};
