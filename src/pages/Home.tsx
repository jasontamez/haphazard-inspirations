import React from 'react';
import {
	IonContent,
	IonMenuButton,
	IonPage,
//	IonTitle,
	IonIcon,
	useIonViewDidEnter,
	IonFab,
	IonFabButton
} from '@ionic/react';
import {
	StatusObject,
	updateIdeas,
	setStatus,
	reduceStatus,
	setOmitStatus,
	deleteNewItemsFlag,
	setTotal,
	addFave,
	removeFave,
	currentPage,
	setFlushNowStatus
} from "../components/ReduxDucks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Shake } from '@ionic-native/shake';
import { BasicIdea, Character, getNewIdeas, initializeIdeas, pruneIdeas, loadNewAndModifiedIdeas } from '../components/GatherInspiration';
import './Home.css';
import { starOutline, star, bulbOutline } from 'ionicons/icons';
import fireSwal from '../components/Swal';
import { $delay, $i } from '../components/DollarSignImports';

const Home = () => {
	const state = useSelector((state: any) => state, shallowEqual);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(currentPage("home"));
	});
	const fetchStatus: StatusObject = reduceStatus(state.status);
	const animToggle = Math.floor(Math.random() * 3);

	// Handle shake-to-update
	if(state.settings.shake) {
		const shakeToUpdate = () => {
			console.log("SHAKE DETECTED on " + state.page);
			state.page === "home" && maybeGenerateNewIdea();
		};
		Shake.startWatch().subscribe(() => shakeToUpdate());
	}

	const getDirection = () => {
		switch(animToggle) {
			case 0:
				return "Left";
			case 1:
				return "Right";
		}
		return "Up";
	};

	const maybeGenerateNewIdea = (status: StatusObject = fetchStatus, output: any = undefined) => {
		if(output !== undefined) {
			switch(output.type) {
				case "initialized":
					// Save the number of inspirations possible
					dispatch(setTotal(output.value));
					status.total = output.value;
					break;
				case "new items loaded":
					dispatch(deleteNewItemsFlag());
					dispatch(setTotal(output.value));
					dispatch(setOmitStatus(true));
					delete status.new;
					status.total = output.value;
					status.omitsChanged = true;
					break;
				case "omissions noted":
					status.omitsChanged = false;
					dispatch(setOmitStatus(false));
					break;
				case "animation finished":
					dispatch(setStatus(true));
			}
		} else if (status.generating) {
			// Did not come with an output object: hit by the user while generation in progress
			return;
		} else {
			// Did not come with an output object: hit by the user, so start generation
			let cls = "exit" + getDirection();
			$i("ideaWrap").classList.add(cls);
			$delay(750).then(() => {
				maybeGenerateNewIdea(status, {type: "animation finished"});
			});
			return;
		}
		if(!status.total) {
			// Inititalize;
			let ns = reduceStatus(status);
			initializeIdeas(maybeGenerateNewIdea, ns);
		} else if(status.new !== undefined) {
			// New ideas
			let ns = reduceStatus(status);
			loadNewAndModifiedIdeas(maybeGenerateNewIdea, ns);
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
			let doFlush: boolean;
			if(status.flushNow) {
				doFlush = true;
				dispatch(setFlushNowStatus(false));
			} else {
				doFlush = (state.nextIdeaFlush < Date.now());
			}
			getNewIdeas(receiveNewIdeas, doFlush);
		}
	};

	// Set up variables
	interface Format extends Array<string[]> {
		lastFormat?: string[]
	}
	let singleFormats: Format = [
		["Create a story about ", "."],
		["Write about ", "."],
		["Picture this: ", "."],
		["", " could be the nucleus of a story."],
		["You can write about ", "."],
		["Go write about ", "."],
		["Here's a story seed: ", "."],
		["Imagine ", "."],
		["Try writing about ", "."],
		["Contemplate ", " and imagine what happens."],
		["Topic: ", "."],
		["Your new muse: ", "."],
		["Consider ", "."],
		["Ponder ", " and start writing."]
	];
	let doubleFormats: Format = [
		["Write about ", " and include ", "."],
		["Ponder ", " and ", " before you start writing."],
		["", " could be a part of a story about ", "."],
		["Go write about ", ", but also have ", " be important."],
		["Put ", " and ", " together."],
		["Try writing about ", " and ", "."],
		["Here's a story seed: ", " mixed up with ", "."],
		["Your new muses: ", " and ", "."],
		["Scrutinize ", " through the lens of ", "."],
		["Consider ", " transposed with ", "."],
		["Think about ", ", and then consider ", "."],
		["Write about ", " and ", "."],
		["How does ", " affect ", "? Or vice versa?"]
	];
	let doubleLocaleFormats: Format = [
		["Create a story set ", "."],
		["Your tale begins and ends ", "."],
		["What happens ", "?"],
		["Ruminate on goings-on ", "."],
		["Set your story ", "."],
		["Imagine what happens ", "."]
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

	const receiveNewIdeas = (idea1: BasicIdea, idea2: BasicIdea, flushFlag: boolean = false) => {
		let formatting: string[] = [];
		let singleFormatType = singleFormats;
		let ideasToDisplay: string[] = [];
		const maybeModifyForGender = (ideaObj: BasicIdea, character: Character | null) => {
			let idea = ideaObj.getIdea();
			if(!ideaObj.possessive) {
				return idea;
			}
			let possessive = character ? character.genderPossessive || "their" : "one's";
			return idea.replace(/\[THEIR\]/g, possessive);
		};
		const type1 = idea1.type;	
		const type2 = idea2.type;
		if(type1 === "error" || type2 === "error") {
			let cls = "start" + getDirection();
			$i("ideaWrap").classList.remove(cls);
			$delay(500).then(() => {
				dispatch(setStatus(false));
			});
			return dispatch(updateIdeas([idea1, idea2, flushFlag, [idea1.idea!, idea2.idea!, "", idea1.idea!, ": ", idea2.idea!, ""]]));
		}
		const i1 = maybeModifyForGender(idea1, type2 === "character" ? idea2 as Character : null);
		const i2 = maybeModifyForGender(idea2, type1 === "character" ? idea1 as Character : null);
		let rawIdeas: string[] = [i1, i2];
		if(type1 === "character" && type2 === "action")  {
			// CHARACTER ACTION
			ideasToDisplay = [i1 + " " + i2];
		} else if (type1 === "action" && type2 === "character") {
			// ACTION CHARACTER
			rawIdeas = [i2 , i1];
			ideasToDisplay = [i2 + " " + i1];
		} else if (type1 === type2 && (type1 === "time" || type1 === "locale")) {
			// TIME TIME
			// LOCALE LOCALE
			formatting = getFormat(doubleLocaleFormats);
			formatting = [formatting[0], " and ", formatting[1]];
			ideasToDisplay = [i1, i2];
		} else if (type1 === "time" && type2 === "locale") {
			// TIME LOCALE
			singleFormatType = doubleLocaleFormats;
			rawIdeas = [i2 , i1];
			ideasToDisplay = [i2 + " " + i1];
		} else if  (type2 === "time" && type1 === "locale") {
			// LOCALE TIME
			singleFormatType = doubleLocaleFormats;
			ideasToDisplay = [i1 + " " + i2];
		} else if ((type1 === "time") || (type1 === "locale")) {
			// TIME [ANY]
			// LOCALE [ANY]
			ideasToDisplay = [i2 + " " + i1];
			rawIdeas = [i2, i1];
		} else if ((type2 === "time") || (type2 === "locale")) {
			// [ANY] TIME
			// [ANY] LOCALE
			ideasToDisplay = [i1 + " " + i2];
		} else {
			// ALL OTHERS
			formatting = getFormat(doubleFormats);
			ideasToDisplay = [i1, i2];
		}
		// Apply the singular format
		if(formatting.length === 0) {
			formatting = getFormat(singleFormatType);
		}
		let final: string[] = [formatting.shift()!];
		while(formatting.length > 0) {
			final.push(ideasToDisplay.shift()!, formatting.shift()!)
		}
		let cls = "start" + getDirection();
		$i("ideaWrap").classList.remove(cls);
		dispatch(updateIdeas([idea1, idea2, flushFlag, [...rawIdeas, ...final]]));
		$delay(500).then(() => {
			dispatch(setStatus(false));
		});
	};

	const displayIdea = () => {
		if(fetchStatus.generating || state.idea1 === null || state.idea2 === null) {
			return (<p className="theIdea loading selectable">Click on the light bulb icon to start generating ideas.</p>);
		}
		const encase = (text: string) => {
			return (<span className="idea" key={"ID"+text}>{text}</span>);
		};
		let flag = true;
		return (<p className="theIdea selectable">{
			state.ideas.slice(2).map((s: string) => {
				if(flag) {
					flag = false;
					return s;
				}
				flag = true;
				return encase(s);
			})
		}</p>);
	};

	const toggleFavorite = () => {
		if(state.status.generating) {
			return;
		}
		if(state.currentFave) {
			dispatch(removeFave(state.currentFave));
			fireSwal({
				title: "Removed from Favorites",
				customClass: {popup: 'dangerToast'},
				toast: true,
				timer: 2500,
				position: 'top',
				timerProgressBar: true,
				showConfirmButton: false
			});
			return;
		}
		dispatch(addFave());
		fireSwal({
			title: "Saved to Favorites",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});
	};

	return (
		<IonPage>
			<IonContent fullscreen id="homePage" className={"blown" + String(1 + Math.floor(Math.random() * 6))}>
				<IonFab horizontal="start" vertical="top"><IonMenuButton color="primary" /></IonFab>
				<IonFab horizontal="start" vertical="bottom">
					<IonFabButton onClick={() => toggleFavorite()} color="secondary">
						<IonIcon icon={state.currentFave ? star : starOutline} />
					</IonFabButton>
				</IonFab>
				<IonFab horizontal="end" vertical="bottom">
					<IonFabButton onClick={() => maybeGenerateNewIdea()} color="primary">
						<IonIcon icon={bulbOutline} />
					</IonFabButton>
				</IonFab>
				<div id="ideaWrap" className={fetchStatus.generating ? "start" + getDirection() : ""}>{displayIdea()}</div>
			</IonContent>
		</IonPage>
		
	);
};

export default Home;
