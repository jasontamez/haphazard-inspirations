import maybeUpdateTheme from './MaybeUpdateTheme';

const p = "haphazard-inspiration/reducer/";
const UPDATE_THEME = p+"UPDATE_THEME";

export function updateTheme(payload: string) {
	return {type: UPDATE_THEME, payload};
}

interface StateObject {
	theme: string
}
export const blankAppState: StateObject = {
	theme: "Default"
};

export function reducer(state: StateObject = blankAppState, action: any) {
	const payload = action.payload;
	let final: StateObject = {...state};
	switch(action.type) {
		case UPDATE_THEME:
			final.theme = payload;
			maybeUpdateTheme(state.theme, final.theme);
			break;
	}
	return final;
}
