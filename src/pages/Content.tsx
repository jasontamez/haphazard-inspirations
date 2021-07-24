import React from 'react';
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonList,
	IonItem,
	IonLabel,
	IonToggle,
	IonListHeader,
	IonNote,
	IonFooter,
	IonButton,
	IonIcon,
	useIonViewDidEnter
} from '@ionic/react';
import fireSwal from '../components/Swal';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	setSettings,
	LocalesObject,
	GenresObject,
	ContentObject,
	PersonObject,
	EventObject,
	TriggersObject,
	currentPage
} from '../components/ReduxDucks';
import { $a, $i } from '../components/DollarSignImports';
import './Home.css';
import { saveOutline } from 'ionicons/icons';

const ContentFilters = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(currentPage("home"));
	});
	const [
		locales,
		genres,
		content,
		person,
		event,
		triggers
	] = useSelector((state: any) => [
		state.locales,
		state.genres,
		state.content,
		state.person,
		state.event,
		state.triggers
	], shallowEqual);
	let TempLocales: LocalesObject = {...locales};
	let TempGenres: GenresObject = {...genres};
	let TempContent: ContentObject = {...content};
	let TempPerson: PersonObject 	= {...person};
	let TempEvent: EventObject = {...event};
	let TempTriggers: TriggersObject = {...triggers};
	let button = $i("SaveButton") as HTMLInputElement;
	const toggleTempLocale = (prop: keyof LocalesObject) => {
		let value = TempLocales[prop];
		TempLocales[prop] = !value;
		button.disabled = false;
	};
	const toggleTempGenre = (prop: keyof GenresObject) => {
		let value = TempGenres[prop];
		TempGenres[prop] = !value;
		$a(".disableGenres-" + prop).forEach((tog: HTMLInputElement) => {
			let p = tog.dataset.prop as keyof GenresObject;
			TempGenres[p] = false;
			tog.disabled = !tog.disabled;
			tog.checked = false;
		});
		button.disabled = false;
	};
	const toggleTempContent = (prop: keyof ContentObject) => {
		let value = TempContent[prop];
		TempContent[prop] = !value;
		$a(".disableContent-" + prop).forEach((tog: HTMLInputElement) => {
			let p = tog.dataset.prop as keyof ContentObject;
			TempContent[p] = false;
			tog.disabled = !tog.disabled;
			tog.checked = false;
		});
		button.disabled = false;
	};
	const toggleTempPerson = (prop: keyof PersonObject) => {
		let value = TempPerson[prop];
		TempPerson[prop] = !value;
		button.disabled = false;
	};
	const toggleTempEvent = (prop: keyof EventObject) => {
		let value = TempEvent[prop];
		TempEvent[prop] = !value;
		button.disabled = false;
	};
	const toggleTempTrigger = (prop: keyof TriggersObject) => {
		let value = TempTriggers[prop];
		TempTriggers[prop] = !value;
		$a(".disableTriggers-" + prop).forEach((tog: HTMLInputElement) => {
			let p = tog.dataset.prop as keyof TriggersObject;
			TempTriggers[p] = false;
			tog.disabled = !tog.disabled;
			tog.checked = false;
		});
		button.disabled = false;
	};
	const saveSettings = () => {
		dispatch(setSettings([
			TempLocales,
			TempGenres,
			TempContent,
			TempPerson,
			TempEvent,
			TempTriggers
		]));
		button.disabled = true;
		fireSwal({
			title: "Filters saved",
			toast: true,
			timer: 3500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Content Filters</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="onlyList settingsPage">
				<IonList lines="none" className="buttonFilled longLabels">
					<IonListHeader>
						<IonLabel>Locales</IonLabel>
						<IonNote>Do not suggest locations of the following types</IonNote>
					</IonListHeader>
					<IonItem>
						<IonLabel>Specific places (Notre Dame, the UN, Texas, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("specific")} slot="end" checked={locales.specific} />
					</IonItem>
					<IonItem>
						<IonLabel>Countries, states and cities (Japan, California, Paris, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("political")} slot="end" checked={locales.political} />
					</IonItem>
					<IonItem>
						<IonLabel>Large locations (India, the Amazon basin, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("largeSize")} slot="end" checked={locales.largeSize} />
					</IonItem>
					<IonItem>
						<IonLabel>Medium-sized locations (Jamaica, Siberia, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("mediumSize")} slot="end" checked={locales.mediumSize} />
					</IonItem>
					<IonItem>
						<IonLabel>Small locations (Mt. Everest, the Vatican, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("smallSize")} slot="end" checked={locales.smallSize} />
					</IonItem>
					<IonItem>
						<IonLabel>Tiny locations (a bedroom, a wedding, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("tinySize")} slot="end" checked={locales.tinySize} />
					</IonItem>
					<IonItem>
						<IonLabel>The Americas</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("americas")} slot="end" checked={locales.americas} />
					</IonItem>
					<IonItem>
						<IonLabel>Europe</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("europe")} slot="end" checked={locales.europe} />
					</IonItem>
					<IonItem>
						<IonLabel>Africa</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("africa")} slot="end" checked={locales.africa} />
					</IonItem>
					<IonItem>
						<IonLabel>West Asia (Saudi Arabia, India, Turkey...)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("westAsia")} slot="end" checked={locales.westAsia} />
					</IonItem>
					<IonItem>
						<IonLabel>East Asia (China, Indonesia, Siberia...)</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("eastAsia")} slot="end" checked={locales.eastAsia} />
					</IonItem>
					<IonItem>
						<IonLabel>Australia and Oceania</IonLabel>
						<IonToggle onClick={() => toggleTempLocale("oceania")} slot="end" checked={locales.oceania} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Genres</IonLabel>
						<IonNote>Do not suggest ideas closely associated with any of the following</IonNote>
					</IonListHeader>
					<IonItem>
						<IonLabel>Fantasy</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("fantasy")} slot="end" checked={genres.fantasy} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Western Medieval Fantasy</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("medievalFantasy")} slot="end" className="disableGenres-fantasy" data-prop="medievalFantasy" disabled={genres.fantasy} checked={genres.medievalFantasy} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Superheroes</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("superhero")} slot="end" className="disableGenres-fantasy" data-prop="superhero" disabled={genres.fantasy} checked={genres.superhero} />
					</IonItem>
					<IonItem>
						<IonLabel>Fairy Tales and Urban Legends</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("fairyTalesAndUrbanLegends")} slot="end" checked={genres.fairyTalesAndUrbanLegends} />
					</IonItem>
					<IonItem>
						<IonLabel>Historical Fiction</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("historicalFiction")} slot="end" checked={genres.historicalFiction} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Westerns</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("western")} slot="end" className="disableGenres-historicalFiction" data-prop="western" disabled={genres.historicalFiction} checked={genres.western} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Medieval Japan</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("samurai")} slot="end" className="disableGenres-historicalFiction" data-prop="samurai" disabled={genres.historicalFiction} checked={genres.samurai} />
					</IonItem>
					<IonItem>
						<IonLabel>Horror</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("horror")} slot="end" checked={genres.horror} />
					</IonItem>
					<IonItem>
						<IonLabel>Science Fiction</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("scifi")} slot="end" checked={genres.scifi} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Spacefaring Sagas</IonLabel>
						<IonToggle onClick={() => toggleTempGenre("spacefaring")} slot="end" className="disableGenres-scifi" data-prop="spacefaring" disabled={genres.scifi} checked={genres.spacefaring} />
					</IonItem>
					<IonListHeader>
						<IonLabel>General Content</IonLabel>
						<IonNote>Do not suggest ideas containing the following</IonNote>
					</IonListHeader>
					<IonItem>
						<IonLabel>Anything with a proper name (George Washington, Twinkies, Japan, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempContent("properName")} slot="end" checked={content.properName} />
					</IonItem>
					<IonItem>
						<IonLabel>Modern ideas (things that occured only in the last 50-70 years)</IonLabel>
						<IonToggle onClick={() => toggleTempContent("modern")} slot="end" checked={content.modern} />
					</IonItem>
					<IonItem>
						<IonLabel>Monsters and monstrous creatures</IonLabel>
						<IonToggle onClick={() => toggleTempContent("monster")} slot="end" checked={content.monster} />
					</IonItem>
					<IonItem>
						<IonLabel>Myths, Religion and Metaphysics</IonLabel>
						<IonToggle onClick={() => toggleTempContent("mythsReligionsAndMetaphysics")} slot="end" checked={content.mythsReligionsAndMetaphysics} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Judaism</IonLabel>
						<IonToggle onClick={() => toggleTempContent("judaism")} slot="end" className="disableContent-mythsReligionsAndMetaphysics" data-prop="judaism" disabled={content.mythsReligionsAndMetaphysics} checked={content.judaism} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Christianity</IonLabel>
						<IonToggle onClick={() => toggleTempContent("christianity")} slot="end" className="disableContent-mythsReligionsAndMetaphysics" data-prop="christianity" disabled={content.mythsReligionsAndMetaphysics} checked={content.christianity} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Islam</IonLabel>
						<IonToggle onClick={() => toggleTempContent("islam")} slot="end" className="disableContent-mythsReligionsAndMetaphysics" data-prop="islam" disabled={content.mythsReligionsAndMetaphysics} checked={content.islam} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Greek/Roman Mythology</IonLabel>
						<IonToggle onClick={() => toggleTempContent("greekRomanMyth")} slot="end" className="disableContent-mythsReligionsAndMetaphysics" data-prop="greekRomanMyth" disabled={content.mythsReligionsAndMetaphysics} checked={content.greekRomanMyth} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Metaphysics (psychics, spirits, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempContent("metaphysics")} slot="end" className="disableContent-mythsReligionsAndMetaphysics" data-prop="metaphysics" disabled={content.mythsReligionsAndMetaphysics} checked={content.metaphysics} />
					</IonItem>
					<IonItem>
						<IonLabel>Sexually suggestive material</IonLabel>
						<IonToggle onClick={() => toggleTempContent("sexual")} slot="end" checked={content.sexual} />
					</IonItem>
					<IonItem>
						<IonLabel>Illicit Substances (marijuana, cocaine, etc)</IonLabel>
						<IonToggle onClick={() => toggleTempContent("illicitSubstances")} slot="end" checked={content.illicitSubstances} />
					</IonItem>
					<IonItem>
						<IonLabel>Alcohol use</IonLabel>
						<IonToggle onClick={() => toggleTempContent("alcohol")} slot="end" checked={content.alcohol} />
					</IonItem>
					<IonItem>
						<IonLabel>Tobacco Use</IonLabel>
						<IonToggle onClick={() => toggleTempContent("tobacco")} slot="end" checked={content.tobacco} />
					</IonItem>
					<IonItem>
						<IonLabel>Real people</IonLabel>
						<IonToggle onClick={() => toggleTempPerson("realPerson")} slot="end" checked={person.realPerson} />
					</IonItem>
					<IonItem>
						<IonLabel>Specific fictional characters</IonLabel>
						<IonToggle onClick={() => toggleTempPerson("fictionalCharacter")} slot="end" checked={person.fictionalCharacter} />
					</IonItem>
					<IonItem>
						<IonLabel>Events that generally last longer than an hour</IonLabel>
						<IonToggle onClick={() => toggleTempEvent("nonPunctualEvent")} slot="end" checked={event.nonPunctualEvent} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Trigger Warnings</IonLabel>
						<IonNote>Do not show ideas even somewhat related to the following</IonNote>
					</IonListHeader>
					<IonItem>
						<IonLabel>Human death</IonLabel>
						<IonToggle onClick={() => toggleTempTrigger("humanDeath")} slot="end" checked={triggers.humanDeath} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Violent Death</IonLabel>
						<IonToggle onClick={() => toggleTempTrigger("humanDeathViolent")} slot="end" className="disableTriggers-humanDeath" data-prop="humanDeathViolent" disabled={genres.humanDeath} checked={genres.humanDeathViolent} />
					</IonItem>
					<IonItem>
						<IonLabel className="subTopic">Natural Death</IonLabel>
						<IonToggle onClick={() => toggleTempTrigger("humanDeathNatural")} slot="end" className="disableTriggers-humanDeath" data-prop="humanDeathNatural" disabled={genres.humanDeath} checked={genres.humanDeathNatural} />
					</IonItem>
					<IonItem>
						<IonLabel>Human distress</IonLabel>
						<IonToggle onClick={() => toggleTempTrigger("humanDistress")} slot="end" checked={triggers.humanDistress} />
					</IonItem>
					<IonItem>
						<IonLabel>Animal death</IonLabel>
						<IonToggle onClick={() => toggleTempTrigger("animalDeath")} slot="end" checked={triggers.animalDeath} />
					</IonItem>
					<IonItem>
						<IonLabel>Animal distress</IonLabel>
						<IonToggle onClick={() => toggleTempTrigger("animalDistress")} slot="end" checked={triggers.animalDistress} />
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButtons slot="end" className="ion-margin-horizontal">
						<IonButton fill="solid" size="large" expand="block" shape="round" color="primary" disabled={true} onClick={() => saveSettings()} id="SaveButton">
							<IonIcon style={ { padding: "0 0 0 0.5rem", fontWeight: "bold" } } icon={saveOutline} />
							<IonLabel style={ { padding: "0 0.5rem", fontWeight: "bold" } }>Save</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default ContentFilters;
