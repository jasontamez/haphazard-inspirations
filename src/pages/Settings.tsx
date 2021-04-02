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
	IonIcon
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	setSettings,
	SettingsObject,
	LocalesObject,
	GenresObject,
	ContentObject,
	PersonObject,
	EventObject,
	TriggersObject
} from '../components/ReduxDucks';
import { $a } from '../components/DollarSignImports';
import './Home.css';
import { saveOutline } from 'ionicons/icons';

const Home = () => {
	const dispatch = useDispatch();
	const [
		settings,
		locales,
		genres,
		content,
		person,
		event,
		triggers
	] = useSelector((state: any) => [
		state.settings,
		state.locales,
		state.genres,
		state.content,
		state.person,
		state.event,
		state.triggers
	], shallowEqual);
	let TempSettings = {...settings};
	let TempLocales = {...locales};
	let TempGenres = {...genres};
	let TempContent = {...content};
	let TempPerson = {...person};
	let TempEvent = {...event};
	let TempTriggers = {...triggers};
	const toggleTempSetting = (prop: keyof SettingsObject) => {
		let value = TempSettings[prop];
		TempSettings[prop] = !value;
		console.log(TempSettings);
	};
	const toggleTempLocale = (prop: keyof LocalesObject) => {
		let value = TempLocales[prop];
		TempLocales[prop] = !value;
		console.log(TempLocales);
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
		console.log(TempGenres);
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
		console.log(TempContent);
	};
	const toggleTempPerson = (prop: keyof PersonObject) => {
		let value = TempPerson[prop];
		TempPerson[prop] = !value;
		console.log(TempPerson);
	};
	const toggleTempEvent = (prop: keyof EventObject) => {
		let value = TempEvent[prop];
		TempEvent[prop] = !value;
		console.log(TempEvent);
	};
	const toggleTempTrigger = (prop: keyof TriggersObject) => {
		let value = TempTriggers[prop];
		TempTriggers[prop] = !value;
		console.log(TempTriggers);
	};
	const saveSettings = () => {
		dispatch(setSettings([
			TempSettings,
			TempLocales,
			TempGenres,
			TempContent,
			TempPerson,
			TempEvent,
			TempTriggers
		]));
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Settings</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="onlyList">
				<IonList lines="none" className="buttonFilled longLabels">
					<IonListHeader>
						<IonLabel>General Settings</IonLabel>
					</IonListHeader>
					<IonItem button={true} onClick={() => toggleTempSetting("shake")}>
						<IonLabel>Shake for new idea</IonLabel>
						<IonToggle slot="end" defaultChecked={settings.shake} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Locales</IonLabel>
						<IonNote>Do not suggest locations of the following types</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => toggleTempLocale("specific")}>
						<IonLabel>Specific places (Notre Dame, the UN, Texas, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={locales.specific} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempLocale("political")}>
						<IonLabel>Countries, states and cities (Japan, California, Paris, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={locales.political} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempLocale("large")}>
						<IonLabel>Large locations (India, the Amazon basic, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={locales.large} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempLocale("medium")}>
						<IonLabel>Medium-sized locations (Jamaica, Siberia, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={locales.medium} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempLocale("small")}>
						<IonLabel>Small locations (Mt. Everest, the Vatican, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={locales.small} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempLocale("tiny")}>
						<IonLabel>Tiny locations (a bedroom, a wedding, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={locales.tiny} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Genres</IonLabel>
						<IonNote>Do not suggest ideas closely associated with any of the following</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => toggleTempGenre("fantasy")}>
						<IonLabel>Fantasy</IonLabel>
						<IonToggle slot="end" defaultChecked={genres.fantasy} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("medievalFantasy")}>
						<IonLabel className="subTopic">Western Medieval Fantasy</IonLabel>
						<IonToggle slot="end" className="disableGenres-fantasy" data-prop="medievalFantasy" disabled={genres.fantasy} defaultChecked={genres.fantasy || genres.medievalFantasy} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("superhero")}>
						<IonLabel className="subTopic">Superheroes</IonLabel>
						<IonToggle slot="end" className="disableGenres-fantasy" data-prop="superhero" disabled={genres.fantasy} defaultChecked={genres.fantasy || genres.superhero} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("historicalFiction")}>
						<IonLabel>Historical Fiction</IonLabel>
						<IonToggle slot="end" defaultChecked={genres.historicalFiction} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("western")}>
						<IonLabel className="subTopic">Westerns</IonLabel>
						<IonToggle slot="end" className="disableGenres-historicalFiction" data-prop="western" disabled={genres.historicalFiction} defaultChecked={genres.historicalFiction || genres.western} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("samurai")}>
						<IonLabel className="subTopic">Medieval Japan</IonLabel>
						<IonToggle slot="end" className="disableGenres-historicalFiction" data-prop="samurai" disabled={genres.historicalFiction} defaultChecked={genres.historicalFiction || genres.samurai} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("horror")}>
						<IonLabel>Horror</IonLabel>
						<IonToggle slot="end" defaultChecked={genres.horror} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("scifi")}>
						<IonLabel>Science Fiction</IonLabel>
						<IonToggle slot="end" defaultChecked={genres.scifi} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempGenre("spacefaring")}>
						<IonLabel className="subTopic">Spacefaring Sagas</IonLabel>
						<IonToggle slot="end" className="disableGenres-scifi" data-prop="spacefaring" disabled={genres.scifi} defaultChecked={genres.scifi || genres.spacefaring} />
					</IonItem>
					<IonListHeader>
						<IonLabel>General Content</IonLabel>
						<IonNote>Do not suggest ideas containing the following</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => toggleTempContent("properName")}>
						<IonLabel>Anything with a proper name (George Washington, Twinkies, Japan, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={content.properName} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("modern")}>
						<IonLabel>Modern ideas (things that occured only in the last 50-70 years)</IonLabel>
						<IonToggle slot="end" defaultChecked={content.modern} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("religionAndMyths")}>
						<IonLabel>Religion, Myths and similar topics</IonLabel>
						<IonToggle slot="end" defaultChecked={content.religionAndMyths} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("christianity")}>
						<IonLabel className="subTopic">Christianity</IonLabel>
						<IonToggle slot="end" className="disableContent-religionAndMyths" data-prop="christianity" disabled={content.religionAndMyths} defaultChecked={content.religionAndMyths || content.christianity} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("greekRomanMyth")}>
						<IonLabel className="subTopic">Greek/Roman Mythology</IonLabel>
						<IonToggle slot="end" className="disableContent-religionAndMyths" data-prop="greekRomanMyth" disabled={content.religionAndMyths} defaultChecked={content.religionAndMyths || content.greekRomanMyth} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("sexual")}>
						<IonLabel>Sexually suggestive material</IonLabel>
						<IonToggle slot="end" defaultChecked={content.sexual} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("illicitSubstances")}>
						<IonLabel>Illicit Substances (marijuana, cocaine, etc)</IonLabel>
						<IonToggle slot="end" defaultChecked={content.illicitSubstances} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("alcohol")}>
						<IonLabel>Alcohol use</IonLabel>
						<IonToggle slot="end" defaultChecked={content.alcohol} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempContent("tobacco")}>
						<IonLabel>Tobacco Use</IonLabel>
						<IonToggle slot="end" defaultChecked={content.tobacco} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempPerson("realPerson")}>
						<IonLabel>Real people</IonLabel>
						<IonToggle slot="end" defaultChecked={person.realPerson} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempEvent("nonPunctualEvent")}>
						<IonLabel>Events that generally last longer than an hour</IonLabel>
						<IonToggle slot="end" defaultChecked={event.nonPunctualEvent} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Trigger Warnings</IonLabel>
						<IonNote>Do not show ideas even somewhat related to the following</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => toggleTempTrigger("humanDeath")}>
						<IonLabel>Human death</IonLabel>
						<IonToggle slot="end" defaultChecked={triggers.humanDeath} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempTrigger("humanDistress")}>
						<IonLabel>Human distress</IonLabel>
						<IonToggle slot="end" defaultChecked={triggers.humanDistress} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempTrigger("animalDeath")}>
						<IonLabel>Animal death</IonLabel>
						<IonToggle slot="end" defaultChecked={triggers.animalDeath} />
					</IonItem>
					<IonItem button={true} onClick={() => toggleTempTrigger("animalDistress")}>
						<IonLabel>Animal distress</IonLabel>
						<IonToggle slot="end" defaultChecked={triggers.animalDistress} />
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButtons slot="end" className="ion-margin-horizontal">
						<IonButton fill="solid" size="large" expand="block" shape="round" color="primary" onClick={() => saveSettings()}>
							<IonIcon style={ { padding: "0 0 0 0.5rem", fontWeight: "bold" } } icon={saveOutline} />
							<IonLabel style={ { padding: "0 0.5rem", fontWeight: "bold" } }>Save</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Home;
