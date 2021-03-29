import React from 'react';
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { shallowEqual, useSelector } from "react-redux";
import { Shake } from '@ionic-native/shake';
import './Home.css';

const Home = () => {
	const state = useSelector((state: any) => state, shallowEqual);
	// Handle shake-to-update
	state.shake && Shake.startWatch().subscribe(() => getNewIdea());

	const getNewIdea = () => {};

	// Set up variables
	interface Format extends Array<string[]> {
		lastFormat?: string[]
	}
	let singleFormats: Format = [
			["Create a story about <em>", "</em>."],
			["Write about <em>", "</em>."],
			["What do you think about a story involving <em>", "</em>?"],
			["<em>", "</em> could be the nucleus of a story."],
			["Maybe you can write about <em>", "</em>."],
			["When nothing else comes to mind, you can still write about <em>", "</em>."],
			["Here's a random seed for a story: <em>", "</em>."],
			["What would happen in a story with <em>", "</em>?"],
			["Try writing about <em>", "</em>."],
			["Write about <em>", "</em> and see what happens."],
			["Stop everything and write about <em>", "</em>!"],
			["Your new muse: <em>", "</em>."],
			["Consider <em>", "</em>."],
			["Ponder <em>", "</em> and start writing."]
		];
	let doubleFormats: Format = [
			["What would happen in a story with <em>", "</em> that also involved <em>", "</em>?"],
			["Ponder <em>", "</em> and <em>", "</em> before you start writing."],
			["<em>", "</em> could be a part of a story about <em>", "</em>."],
			["Your next plot could involve <em>", "</em>, but also have <em>", "</em>."],
			["Put <em>", "</em> and <em>", "</em> together and see what happens."],
			["Write about <em>", "</em> and <em>", "</em>."]
		];
	let singleLocaleFormats: Format = [
			["Create a story set <em>", "</em>."],
			["What do you think about a story set <em>", "</em>?"],
			["A story set <em>", "</em> might be interesting."],
			["What would happen in a story set <em>", "</em>?"],
			["Try writing a story set <em>", "</em>."],
			["Write about anything, but set the story <em>", "</em>!"],
			["Imagine what happens <em>", "</em> and start writing."]
		];

	const getFormat = (format: Format) => {
		const	x = generateRandomNumber(format.length);
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

	// 2^0 = 1  : TOPIC
	// 2^1 = 2  : ACTION
	// 2^2 = 4  : CHARACTER
	// 2^3 = 8  : EVENT
	// 2^4 = 16 : LOCALE
	// 2^5 = 32 : TIME
	// 2^6 = 64 : OBJECT

	const grabAndFormatDoubleIdea = () => {
		let chosen: string[];
		let singleFormatType = singleFormats;
		let msg: any = 0;
		const [m1, c1] = ["", 2];
		const [m2, c2] = ["", 4];
		const code = c1 + c2;
		switch(code) {
			// CHARACTER ACTION
			case 6:
				// Determine which is the ACTION and put it last
				if(c1 === 2) {
					msg = m2 + " " + m1;
				} else {
					msg = m1 + " " + m2;
				}
				break;
			// TOPIC/ACTION/CHARACTER/EVENT/OBJECT TIME
			case 33:
			case 34:
			case 36:
			case 40:
			case 96:
				// Determine which is the TIME and put it last
				if(c1 === 32) {
					msg = m2 + " " + m1;
				} else {
					msg = m1 + " " + m2;
				}
				// Check for the special case of LOCALE TIME
				if(c1 === 16 || c2 === 16) {
					singleFormatType = singleLocaleFormats;
				}
				break;
			// TOPIC/ACTION/CHARACTER/EVENT/OBJECT LOCALE
			case 17:
			case 18:
			case 20:
			case 24:
			case 80:
				// Determine which is the LOCALE and put it last
				if(c1 === 16) {
					msg = m2 + " " + m1;
				} else {
					msg = m1 + " " + m2;
				}
				break;
			// LOCALE and LOCALE
			// TIME and TIME
			case 32:
			case 64:
				msg = m1 + "</em> and <em>" + m2;
				singleFormatType = singleLocaleFormats;
				break;
			// LOCALE TIME
			case 48:
				// Determine which is the TIME and put it last
				if(c1 === 32) {
					msg = m2 + " " + m1;
				} else {
					msg = m1 + " " + m2;
				}
				singleFormatType = singleLocaleFormats;
				break;
			// ALL OTHERS
			default:
				// Two separate ideas
				chosen = getFormat(doubleFormats);
				return chosen[0] + m1 + chosen[1] + m2 + chosen[2];
		}
		// Apply the singular format
		chosen = getFormat(singleFormatType);
		return chosen[0] + msg + chosen[1];
	};


	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Get Inspired</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<p>{grabAndFormatDoubleIdea()}</p>
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
