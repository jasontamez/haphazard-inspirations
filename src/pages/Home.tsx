import React from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
//	IonTitle,
	IonToolbar,
	IonLabel,
	IonIcon
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { StatusObject, updateIdeas, setStatus, reduceStatus, setOmitStatus, setTotal } from "../components/ReduxDucks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Shake } from '@ionic-native/shake';
import { BasicIdea, getNewIdeas, initializeIdeas, pruneIdeas } from '../components/GatherInspiration';
import './Home.css';
import { starOutline } from 'ionicons/icons';

const Home = () => {
	const state = useSelector((state: any) => state, shallowEqual);
	const dispatch = useDispatch();
	// fetchStatus controls whether or not we can spit out a new idea.
	const fetchStatus: StatusObject = state.status;

	// Handle shake-to-update
	if(state.settings.shake) {
		const shakeToUpdate = () => {
			maybeGenerateNewIdea();
		};
		Shake.startWatch().subscribe(() => shakeToUpdate());
	}

	const receiveNewIdeas = (idea1: BasicIdea, idea2: BasicIdea, flushFlag: boolean = false) => {
		dispatch(updateIdeas([idea1, idea2, flushFlag]));
	};

	const maybeGenerateNewIdea = (status: StatusObject = fetchStatus, output: any = undefined) => {
		if(output !== undefined) {
			switch(output.type) {
				case "initialized":
					dispatch(setTotal(output.value));
					status.total = output.value;
					break;
				case "new items loaded":
					delete status.new;
					break;
				case "omissions noted":
					status.omitsChanged = false;
					dispatch(setOmitStatus(false));
					break;
			}
		} else if (status.generating) {
			return;
		}
		if(!status.total) {
			// Inititalize;
			let ns = reduceStatus(status);
			initializeIdeas(maybeGenerateNewIdea, ns);
		} else if(status.new !== undefined) {
			// New ideas
			//
			//
			//
			//
			//
		} else if(status.omitsChanged) {
			// Omits updated
			let ns = reduceStatus(status);
			pruneIdeas(maybeGenerateNewIdea, [
				state.locales,
				state.genres,
				state.content,
				state.person,
				state.event,
				state.triggers
			], ns);
		} else {
			// Ok to fetch!
			dispatch(setStatus(true));
			getNewIdeas(receiveNewIdeas, (state.nextIdeaFlush < Date.now()));
		}
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
		["Maybe you can write about ", "?"],
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
		["Try writing about ", " and ", "."],
		["Here's a random seed for a story: ", " mixed up with ", "."],
		["Your new muse: ", " with ", "."],
		["Consider ", " transposed with ", "."],
		["Think about ", ", and then consider ", "."],
		["Write about ", " and ", "."]
	];
	let singleLocaleFormats: Format = [
		["Create a story set ", "."],
		["What do you think about a tale set ", "?"],
		["A story set ", " might be interesting."],
		["What would happen in a book set ", "?"],
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

	const displayIdea = () => {
		if(!fetchStatus || state.idea1 === null || state.idea2 === null) {
			return (<p className="theIdea loading">LOADING</p>);
		}
		let chosen: string[];
		let singleFormatType = singleFormats;
		let msg: any = "";
		let idea1: BasicIdea = state.idea1;
		let idea2: BasicIdea = state.idea2;
		const type1 = idea1.type;	
		const type2 = idea2.type;
		const encase = (text: string) => {
			return (<span className="idea">{text}</span>);
		};
		if(type1 === "error" || type2 === "error") {
			return encase(idea1.idea + ": " + idea2.idea);
		}
		const i1 = idea1.getIdea();
		const i2 = idea2.getIdea();
		if(type1 === "character" && type2 === "action")  {
			// CHARACTER ACTION
			msg = encase(i1 + " " + i2);
		} else if (type1 === "action" && type2 === "character") {
			// ACTION CHARACTER
			msg = encase(i2 + " " + i1);
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
					{/*<IonTitle>Get Inspired</IonTitle>*/}
					<IonButtons slot="start">
						<IonMenuButton />
						<IonButton onClick={() => {maybeGenerateNewIdea()}}><IonLabel>CLICK</IonLabel></IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={() => {maybeGenerateNewIdea()}}><IonIcon icon={starOutline} /></IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{displayIdea()}
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
