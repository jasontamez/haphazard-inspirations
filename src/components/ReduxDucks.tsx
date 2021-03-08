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

//
//
// FUNCTIONS
//
//
export function updateTheme(payload: string) {
	return {type: UPDATE_THEME, payload};
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
interface StateObject {
	theme: string
}
export const blankAppState: StateObject = {
	theme: "Default"
};

//
//
// SUB-REDUCERS
//
//

//
//
// REDUCER
//
//
export function reducer(state: StateObject = blankAppState, action: ReducerAction) {
	const payload = action.payload;
	let final: StateObject = {...state};
	switch(action.type) {
		case UPDATE_THEME:
			final.theme = payload;
			maybeUpdateTheme(state.theme, payload);
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

