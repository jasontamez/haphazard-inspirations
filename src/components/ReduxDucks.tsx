import maybeUpdateTheme from './MaybeUpdateTheme';
import { StateStorage } from './PersistentInfo';
//import { BasicIdea, updateFromState } from './GatherInspiration';
import debounce from './Debounce';
import packageJson from '../../package.json';
import { BasicIdea } from './GatherInspiration';


//
//
// CONSTS
//
//
export const ONE_DAY = 86400000; // 1000 * 60 * 60 * 24
//const THIRTY_DAYS = 2592000000; // 1000 * 60 * 60 * 24 * 30;
export let VERSION = {
	current: packageJson.version
};
const p = "haphazard-inspiration/reducer/";
const OVERWRITE_STATE = p+"OVERWRITE_STATE";
const UPDATE_THEME = p+"UPDATE_THEME";
const UPDATE_IDEAS = p+"UPDATE_IDEAS";
const UPDATE_FETCH_STATUS = p+"UPDATE_FETCH_STATUS";
const SET_CONTENT_LIMITS = p+"SET_CONTENT_LIMITS";
//const B = p+"";
//const C = p+"";
//const D = p+"";
//const E = p+"";
//const F = p+"";


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
export function updateIdeas(payload: [BasicIdea, BasicIdea, boolean]) {
	return {type: UPDATE_IDEAS, payload};
}
export function setFetchStatus(payload: number) {
	return {type: UPDATE_FETCH_STATUS, payload};
}
//export function removeFromUsed(payload: BasicIdea[]) {
//	return {type: REMOVE_FROM_USED, payload};
//}
export function setSettings(payload: [SettingsObject, LocalesObject, GenresObject, ContentObject, PersonObject, EventObject, TriggersObject]) {
	return {type: SET_CONTENT_LIMITS, payload};
}

//
//
// INTERFACES
//
//
export interface SettingsObject {
	shake: boolean
}
export interface LocalesObject {
	any: boolean
	specific: boolean
	political: boolean
	large: boolean
	medium: boolean
	small: boolean
	tiny: boolean
}
export interface GenresObject {
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
export interface ContentObject {
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
export interface PersonObject {
	realPerson: boolean
}
export interface EventObject {
	nonPunctualEvent: boolean
}
export interface TriggersObject {
	humanDeath: boolean
	humanDistress: boolean
	animalDeath: boolean
	animalDistress: boolean
}
export interface StateObject {
	currentVersion: string
	newIdeas: boolean
	theme: string
	idea1: BasicIdea | null
	idea2: BasicIdea | null
	lastIdeaGenerated: number
	nextIdeaFlush: number
	flushDays: number
	fetchStatus: number
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
	newIdeas: true,
	theme: "Default",
	idea1: null,
	idea2: null,
	lastIdeaGenerated: 0,
	nextIdeaFlush: Date.now(),
	flushDays: 365,
	fetchStatus: -1,
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
		newIdeas: state.newIdeas,
		theme: state.theme,
		idea1: state.idea1,
		idea2: state.idea2,
		lastIdeaGenerated: state.lastIdeaGenerated,
		nextIdeaFlush: state.nextIdeaFlush,
		flushDays: state.flushDays,
		fetchStatus: state.fetchStatus,
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
	switch(action.type) {
		case OVERWRITE_STATE:
			final = reduceAll(payload);
			break;
		case UPDATE_THEME:
			final = reduceAll(state);
			final.theme = payload;
			maybeUpdateTheme(state.theme, payload);
			break;
		case UPDATE_IDEAS:
			final = reduceAll(state);
			let [one, two, flush] = (payload as [BasicIdea, BasicIdea, boolean]);
			final.idea1 = one;
			final.idea2 = two;
			final.lastIdeaGenerated = Date.now();
			flush && (final.nextIdeaFlush = Date.now() + ONE_DAY);
			final.fetchStatus = 0;
			break;
		case UPDATE_FETCH_STATUS:
			final = reduceAll(state);
			final.fetchStatus = payload;
			break;
		case SET_CONTENT_LIMITS:
			final = reduceAll(state);
			final.settings = {...payload.shift()};
			final.locales = {...payload.shift()};
			final.genres = {...payload.shift()};
			final.content = {...payload.shift()};
			final.person = {...payload.shift()};
			final.event = {...payload.shift()};
			final.triggers = {...payload.shift()};
			final.fetchStatus = 10;
			break;
		default:
			return state;
	}
	debounce(saveCurrentState, [final]);
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
