import maybeUpdateTheme from './MaybeUpdateTheme';
import { StateStorage } from './PersistentInfo';
import debounce from './Debounce';
import packageJson from '../../package.json';
import { BasicIdea } from './GatherInspiration';
import { v4 as uuidv4 } from 'uuid';


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
const SET_EXACT_IDEAS = p+"SET_EXACT_IDEAS";
const UPDATE_STATUS = p+"UPDATE_STATUS";
const UPDATE_TOTAL_IDEAS = p+"UPDATE_TOTAL_IDEAS";
const UPDATE_OMIT_STATUS = p+"UPDATE_OMIT_STATUS";
const DELETE_NEW_ITEMS_FLAG = p+"DELETE_NEW_ITEMS_FLAG";
const UPDATE_FLUSH_STATUS = p+"UPDATE_FLUSH_STATUS";
const SET_CONTENT_LIMITS = p+"SET_CONTENT_LIMITS";
const SET_BOOLEAN = p+"SET_BOOLEAN";
const SET_NUMBER = p+"SET_NUMBER";
const ADD_FAVORITE = p+"ADD_FAVORITE";
const REMOVE_FAVORITE = p+"REMOVE_FAVORITE";
const REORDER_FAVORITES = p+"REORDER_FAVORITES";
const SET_PAGE = p+"SET_PAGE";


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
export function updateIdeas(payload: [BasicIdea, BasicIdea, boolean, string[]]) {
	return {type: UPDATE_IDEAS, payload};
}
export function setExactIdeas(payload: string[]) {
	return {type: SET_EXACT_IDEAS, payload};
}
export function setStatus(payload: boolean | 1) {
	return {type: UPDATE_STATUS, payload};
}
export function setTotal(payload: string) {
	return {type: UPDATE_TOTAL_IDEAS, payload};
}
export function setOmitStatus(payload: boolean) {
	return {type: UPDATE_OMIT_STATUS, payload};
}
export function deleteNewItemsFlag() {
	return {type: DELETE_NEW_ITEMS_FLAG};
}
export function setFlushNowStatus(payload: boolean) {
	return {type: UPDATE_FLUSH_STATUS, payload};
}
export function setBoolean(payload: [keyof TogglesObject, boolean]) {
	return {type: SET_BOOLEAN, payload};
}
export function setNumber(payload: [keyof SettingsObject, number]) {
	return {type: SET_NUMBER, payload};
}
export function setSettings(payload: [LocalesObject, GenresObject, ContentObject, PersonObject, EventObject, TriggersObject]) {
	return {type: SET_CONTENT_LIMITS, payload};
}
export function addFave() {
	return {type: ADD_FAVORITE};
}
export function removeFave(payload: string) {
	return {type: REMOVE_FAVORITE, payload};
}
export function reorderFaves(payload: string[][]) {
	return {type: REORDER_FAVORITES, payload};
}
export function currentPage(payload: string) {
	return {type: SET_PAGE, payload};
}
//export function removeFromUsed(payload: BasicIdea[]) {
//	return {type: REMOVE_FROM_USED, payload};
//}

//
//
// INTERFACES
//
//
export interface SettingsObject {
	flushDays: number
}
const minSett: SettingsObject = {
	flushDays: 1
}
const maxSett: SettingsObject = {
	flushDays: 7305 // 20 years!
}
export interface TogglesObject {
	showMinimumFave: boolean
}
export interface LocalesObject {
	any: boolean
	specific: boolean
	political: boolean
	largeSize: boolean
	mediumSize: boolean
	smallSize: boolean
	tinySize: boolean
	americas: boolean
	europe: boolean
	africa: boolean
	oceania: boolean
	westAsia: boolean
	eastAsia: boolean
}
export interface GenresObject {
	fantasy: boolean
	medievalFantasy: boolean
	superhero: boolean
	fairyTalesAndUrbanLegends: boolean
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
	monster: boolean
	mythsReligionsAndMetaphysics: boolean
	judaism: boolean
	christianity: boolean
	islam: boolean
	greekRomanMyth: boolean
	metaphysics: boolean
	sexual: boolean
	illicitSubstances: boolean
	alcohol: boolean
	tobacco: boolean
}
export interface PersonObject {
	realPerson: boolean
	fictionalCharacter: boolean
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
export interface StatusObject {
	total: number
	new?: string
	omitsChanged: boolean
	generating: boolean | 1
	nextIdeaFlush: number
	flushNow: boolean
}
export interface StateObject {
	currentVersion: string
	theme: string
	idea1: BasicIdea | null
	idea2: BasicIdea | null
	ideas: string[]
	currentFave: string
	status: StatusObject
	favorites: string[][]
	toggles: TogglesObject
	settings: SettingsObject
	locales: LocalesObject
	genres: GenresObject
	content: ContentObject
	person: PersonObject
	event: EventObject
	triggers: TriggersObject
	page: string
}
export const blankAppState: StateObject = {
	currentVersion: VERSION.current,
	theme: "Default",
	idea1: null,
	idea2: null,
	ideas: [],
	currentFave: "",
	status: {
		total: 0,
		omitsChanged: false,
		generating: false,
		nextIdeaFlush: Date.now() + ONE_DAY,
		flushNow: false
	},
	favorites: [],
	toggles: {
		showMinimumFave: false
	},
	settings: {
		flushDays: 365
	},
	locales: {
		any: false,
		specific: false,
		political: false,
		largeSize: false,
		mediumSize: false,
		smallSize: false,
		tinySize: false,
		americas: false,
		europe: false,
		africa: false,
		oceania: false,
		westAsia: false,
		eastAsia: false
		},
	genres: {
		fantasy: false,
		medievalFantasy: false,
		superhero: false,
		fairyTalesAndUrbanLegends: false,
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
		monster: false,
		mythsReligionsAndMetaphysics: false,
		judaism: false,
		christianity: false,
		islam: false,
		greekRomanMyth: false,
		metaphysics: false,
		sexual: false,
		illicitSubstances: false,
		alcohol: false,
		tobacco: false
	},
	person: {
		realPerson: false,
		fictionalCharacter: false
	},
	event: {
		nonPunctualEvent: false
	},
	triggers: {
		humanDeath: false,
		humanDistress: false,
		animalDeath: false,
		animalDistress: false	
	},
	page: "home"
};

//
//
// SUB-REDUCERS
//
//
const reduceAll = (state: StateObject, setPending: boolean = true) => {
	let o: StateObject = {
		currentVersion: state.currentVersion,
		theme: state.theme,
		idea1: state.idea1,
		idea2: state.idea2,
		ideas: [...state.ideas],
		currentFave: state.currentFave,
		status: reduceStatus(state.status),
		favorites: state.favorites.map((fave: string[]) => [...fave]),
		settings: {...state.settings},
		toggles: {...state.toggles},
		locales: {...state.locales},
		genres: {...state.genres},
		content: {...state.content},
		person: {...state.person},
		event: {...state.event},
		triggers: {...state.triggers},
		page: state.page
	};
	return o;
}
export const reduceStatus = (status: StatusObject) => {
	let reduced: StatusObject = {...status};
	return reduced;
};
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
			maybeUpdateTheme(state.theme, final.theme);
			break;
		case UPDATE_THEME:
			final = reduceAll(state);
			final.theme = payload;
			maybeUpdateTheme(state.theme, payload);
			break;
		case UPDATE_IDEAS:
			final = reduceAll(state);
			let [one, two, flush, ideas] = (payload as [BasicIdea, BasicIdea, boolean, string[]]);
			final.idea1 = one;
			final.idea2 = two;
			flush && (final.status.nextIdeaFlush = Date.now() + ONE_DAY);
			final.ideas = ideas;
			final.status.generating = 1;
			final.currentFave = "";
			break;
		case UPDATE_STATUS:
			final = reduceAll(state);
			final.status.generating = payload;
			break;
		case UPDATE_TOTAL_IDEAS:
			final = reduceAll(state);
			final.status.total = payload;
			break;
		case SET_CONTENT_LIMITS:
			final = reduceAll(state);
			final.locales = {...payload.shift()};
			final.genres = {...payload.shift()};
			final.content = {...payload.shift()};
			final.person = {...payload.shift()};
			final.event = {...payload.shift()};
			final.triggers = {...payload.shift()};
			final.status.omitsChanged = true;
			break;
		case UPDATE_OMIT_STATUS:
			final = reduceAll(state);
			final.status.omitsChanged = payload;
			break;
		case DELETE_NEW_ITEMS_FLAG:
			final = reduceAll(state);
			delete final.status.new;
			break;
		case UPDATE_FLUSH_STATUS:
			final = reduceAll(state);
			final.status.flushNow = payload;
			break;
		case SET_BOOLEAN:
			final = reduceAll(state);
			final.toggles[payload[0] as keyof TogglesObject] = payload[1] as boolean;
			break;
		case SET_NUMBER:
			final = reduceAll(state);
			let num = payload[1] as number;
			let prop = payload[0] as keyof SettingsObject;
			final.settings[prop] = Math.min(maxSett[prop], Math.max(minSett[prop], Math.floor(num)));
			break;
		case ADD_FAVORITE:
			final = reduceAll(state);
			let fave = state.ideas.slice();
			let id = uuidv4();
			fave.unshift(id);
			final.favorites.push(fave);
			final.currentFave = id;
			break;
		case REMOVE_FAVORITE:
			final = reduceAll(state);
			final.favorites = final.favorites.filter((fave: string[]) => fave[0] !== payload);
			if(final.currentFave === payload) {
				final.currentFave = "";
			}
			break;
		case REORDER_FAVORITES:
			final = reduceAll(state);
			final.favorites = payload;
			break;
		case SET_PAGE:
			final = reduceAll(state);
			final.page = payload;
			break;
		default:
			return state;
	}
	debounce(saveCurrentState, [final]);
	maybeLog(action.type);
	maybeLog(final);
	return final;
}

const saveCurrentState = (state: StateObject) => {
	let newState = reduceAll(state);
	// Save
	StateStorage.setItem("lastState", newState);
	maybeLog("Save");
	maybeLog(newState);
};

const maybeLog = (...args: any[]) => {
	// Comment out if no longer debugging
	//args.forEach((x: any) => console.log(x));
};
