import React from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonLabel
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { updateIdea } from "../components/ReduxDucks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Shake } from '@ionic-native/shake';
import makeInspirations, { BasicIdea } from '../components/GatherInspiration';
import './Home.css';

const Home = () => {
	const state = useSelector((state: any) => state, shallowEqual);
	const dispatch = useDispatch();
	const settings = state.settings;
	// Handle shake-to-update
	settings.shake && Shake.startWatch().subscribe(() => makeIdea());

	const inspirations = makeInspirations();

	const getNewIdea = () => {
		return inspirations[generateRandomNumber(inspirations.length)];
	};

	const forceNewIdea = (i: 1 | 2) => {
		const idea = getNewIdea();
		dispatch(updateIdea([i, idea]));
		return idea;
	};

	// Set up variables
	interface Format extends Array<string[]> {
		lastFormat?: string[]
	}
	let singleFormats: Format = [
			["Create a story about ", "."],
			["Write about ", "."],
			["What do you think about a story involving ", "?"],
			["", " could be the nucleus of a story."],
			["Maybe you can write about ", "."],
			["When nothing else comes to mind, you can still write about ", "."],
			["Here's a random seed for a story: ", "."],
			["What would happen in a story with ", "?"],
			["Try writing about ", "."],
			["Write about ", " and see what happens."],
			["Stop everything and write about ", "!"],
			["Your new muse: ", "."],
			["Consider ", "."],
			["Ponder ", " and start writing."]
		];
	let doubleFormats: Format = [
			["What would happen in a story with ", " that also involved ", "?"],
			["Ponder ", " and ", " before you start writing."],
			["", " could be a part of a story about ", "."],
			["Your next plot could involve ", ", but also have ", "."],
			["Put ", " and ", " together and see what happens."],
			["Write about ", " and ", "."]
		];
	let singleLocaleFormats: Format = [
			["Create a story set ", "."],
			["What do you think about a story set ", "?"],
			["A story set ", " might be interesting."],
			["What would happen in a story set ", "?"],
			["Try writing a story set ", "."],
			["Write about anything, but set the story ", "!"],
			["Imagine what happens ", " and start writing."]
		];

	const getFormat = (format: Format) => {
		const x = generateRandomNumber(format.length);
		const choice = format[x];
		// remove the picked format
		format.splice(x, 1);
		// if we've prevously saved a format, reintroduce it to the list
		if(format.lastFormat) {
			format.push(format.lastFormat);
		}
		// save the current format so it can't be used the very next time
		format.lastFormat = choice;
		// return the chosen format
		return choice;
	};

	const generateRandomNumber = (n: number) => {
		// Returns a number from 0 to n-1
		return Math.floor(Math.random() * n);
	};

	const makeIdea = () => {
		let chosen: string[];
		let singleFormatType = singleFormats;
		let msg: any = "";
		let idea1: BasicIdea;
		if(state.idea1 !== null) {
			idea1 = state.idea1;
		} else {
			idea1 = forceNewIdea(1);
		}
		let idea2: BasicIdea;
		if(state.idea2 !== null) {
			idea2 = state.idea2;
		} else {
			idea2 = forceNewIdea(2);
		}
		const type1 = idea1.type;
		const type2 = idea2.type;
		const i1 = idea1.getIdea();
		const i2 = idea2.getIdea();
		const encase = (text: string) => {
			return (<span className="idea">{text}</span>);
		};
		if(type1 === "action" && type2 === "character")  {
			// ACTION CHARACTER
			msg = encase(i2 + " " + i1);
		} else if (type2 === "action" && type1 === "character") {
			// CHARACTER ACTION
			msg = encase(i1 + " " + i2);
		} else if (type1 === type2 && (type1 === "time" || type1 === "locale")) {
			// TIME TIME
			// LOCALE LOCALE
			chosen = getFormat(singleLocaleFormats);
			return (<p>{chosen[0]}{encase(i1)} and {encase(i2)}{chosen[1]}</p>);
		} else if (type1 === "time" && type2 === "locale") {
			// TIME LOCALE
			singleFormatType = singleLocaleFormats;
			msg = encase(i2 + " " + i1);
		} else if  (type2 === "time" && type1 === "locale") {
			// LOCALE TIME
			singleFormatType = singleLocaleFormats;
			msg = encase(i1 + " " + i2);
		} else if ((type1 === "time") || (type1 === "locale")) {
			// TIME [ANY]
			// LOCALE [ANY]
			msg = encase(i2 + " " + i1);
		} else if ((type2 === "time") || (type2 === "locale")) {
			// [ANY] TIME
			// [ANY] LOCALE
			msg = encase(i1 + " " + i2);
		} else {
			// ALL OTHERS
			chosen = getFormat(doubleFormats);
			return (<p className="theIdea">{chosen[0]}{encase(i1)}{chosen[1]}{encase(i2)}{chosen[2]}</p>);
		}
		// Apply the singular format
		chosen = getFormat(singleFormatType);
		return (<p className="theIdea">{chosen[0]}{msg}{chosen[1]}</p>);
	};


	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Get Inspired</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
						<IonButton onClick={() => {forceNewIdea(1); forceNewIdea(2);}}><IonLabel>CLICK</IonLabel></IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{makeIdea()}
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
