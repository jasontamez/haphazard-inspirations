import maybeUpdateTheme from './MaybeUpdateTheme';
import { StateStorage } from './PersistentInfo';
import debounce from './Debounce';

//
//
// CONSTS
//
//
const p = "haphazard-inspiration/reducer/";
const UPDATE_THEME = p+"UPDATE_THEME";
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
export function updateTheme(payload: string) {
	return {type: UPDATE_THEME, payload};
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
interface ReducerAction {
	type: string
	payload?: any
}
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
	theme: string
	settings: SettingsObject
	locales: LocalesObject
	genres: GenresObject
	content: ContentObject
	person: PersonObject
	event: EventObject
	triggers: TriggersObject
}
export const blankAppState: StateObject = {
	theme: "Default",
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
const reduceAll = (state: StateObject) => {
	return {
		theme: state.theme,
		settings: {...state.settings},
		locales: {...state.locales},
		genres: {...state.genres},
		content: {...state.content},
		person: {...state.person},
		event: {...state.event},
		triggers: {...state.triggers}
	};
}

//
//
// REDUCER
//
//
export function reducer(state: StateObject = blankAppState, action: ReducerAction) {
	const payload = action.payload;
	let final: StateObject;
	let b: string;
	switch(action.type) {
		case UPDATE_THEME:
			final = reduceAll(state);
			final.theme = payload;
			maybeUpdateTheme(state.theme, payload);
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
	return final;
}

const saveCurrentState = (state: StateObject) => {
	let newState = {...state};
	StateStorage.setItem("lastState", newState);
};

