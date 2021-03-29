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
	IonNote
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { toggleSetting, toggleLocale, toggleGenre, toggleContent, togglePerson, toggleEvent, toggleTrigger } from '../components/ReduxDucks';
import './Home.css';

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
					<IonItem button={true} onClick={() => dispatch(toggleSetting("shake"))}>
						<IonLabel>Shake for new idea</IonLabel>
						<IonToggle slot="end" checked={settings.shake} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Locales</IonLabel>
						<IonNote>Do not suggest locations of the following types</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => dispatch(toggleLocale("specific"))}>
						<IonLabel>Specific places (Notre Dame, the UN, Texas, etc)</IonLabel>
						<IonToggle slot="end" checked={locales.specific} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleLocale("political"))}>
						<IonLabel>Countries, states and cities (Japan, California, Paris, etc)</IonLabel>
						<IonToggle slot="end" checked={locales.political} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleLocale("large"))}>
						<IonLabel>Large locations (India, the Amazon basic, etc)</IonLabel>
						<IonToggle slot="end" checked={locales.large} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleLocale("medium"))}>
						<IonLabel>Medium-sized locations (Jamaica, Siberia, etc)</IonLabel>
						<IonToggle slot="end" checked={locales.medium} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleLocale("small"))}>
						<IonLabel>Small locations (Mt. Everest, the Vatican, etc)</IonLabel>
						<IonToggle slot="end" checked={locales.small} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleLocale("tiny"))}>
						<IonLabel>Tiny locations (a bedroom, a wedding, etc)</IonLabel>
						<IonToggle slot="end" checked={locales.tiny} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Genres</IonLabel>
						<IonNote>Do not suggest ideas closely associated with any of the following</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("fantasy"))}>
						<IonLabel>Fantasy</IonLabel>
						<IonToggle slot="end" checked={genres.fantasy} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("medievalFantasy"))}>
						<IonLabel className="subTopic">Western Medieval Fantasy</IonLabel>
						<IonToggle slot="end" disabled={genres.fantasy} checked={genres.fantasy || genres.medievalFantasy} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("historicalFiction"))}>
						<IonLabel>Historical Fiction</IonLabel>
						<IonToggle slot="end" checked={genres.historicalFiction} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("western"))}>
						<IonLabel className="subTopic">Westerns</IonLabel>
						<IonToggle slot="end" disabled={genres.historicalFiction} checked={genres.historicalFiction || genres.western} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("samurai"))}>
						<IonLabel className="subTopic">Medieval Japan</IonLabel>
						<IonToggle slot="end" disabled={genres.historicalFiction} checked={genres.historicalFiction || genres.samurai} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("horror"))}>
						<IonLabel>Horror</IonLabel>
						<IonToggle slot="end" checked={genres.horror} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("scifi"))}>
						<IonLabel>Science Fiction</IonLabel>
						<IonToggle slot="end" checked={genres.scifi} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleGenre("spacefaring"))}>
						<IonLabel className="subTopic">Spacefaring Sagas</IonLabel>
						<IonToggle slot="end" disabled={genres.scifi} checked={genres.scifi || genres.spacefaring} />
					</IonItem>
					<IonListHeader>
						<IonLabel>General Content</IonLabel>
						<IonNote>Do not suggest ideas containing the following</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => dispatch(toggleContent("properName"))}>
						<IonLabel>Anything with a proper name (George Washington, Twinkies, Japan, etc)</IonLabel>
						<IonToggle slot="end" checked={content.properName} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("modern"))}>
						<IonLabel>Modern ideas (things that occured only in the last 50-70 years)</IonLabel>
						<IonToggle slot="end" checked={content.modern} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("religionAndMyths"))}>
						<IonLabel>Religion, Myths and similar topics</IonLabel>
						<IonToggle slot="end" checked={content.religionAndMyths} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("christianity"))}>
						<IonLabel className="subTopic">Christianity</IonLabel>
						<IonToggle slot="end" disabled={content.religionAndMyths} checked={content.religionAndMyths || content.christianity} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("greekRomanMyth"))}>
						<IonLabel className="subTopic">Greek/Roman Mythology</IonLabel>
						<IonToggle slot="end" disabled={content.religionAndMyths} checked={content.religionAndMyths || content.greekRomanMyth} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("sexual"))}>
						<IonLabel>Sexually suggestive material</IonLabel>
						<IonToggle slot="end" checked={content.sexual} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("illicitSubstances"))}>
						<IonLabel>Illicit Substances (marijuana, cocaine, etc)</IonLabel>
						<IonToggle slot="end" checked={content.illicitSubstances} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("alcohol"))}>
						<IonLabel>Alcohol use</IonLabel>
						<IonToggle slot="end" checked={content.alcohol} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleContent("tobacco"))}>
						<IonLabel>Tobacco Use</IonLabel>
						<IonToggle slot="end" checked={content.tobacco} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(togglePerson("realPerson"))}>
						<IonLabel>Real people</IonLabel>
						<IonToggle slot="end" checked={person.realPerson} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleEvent("nonPunctualEvent"))}>
						<IonLabel>Events that generally last longer than an hour</IonLabel>
						<IonToggle slot="end" checked={event.nonPunctualEvent} />
					</IonItem>
					<IonListHeader>
						<IonLabel>Trigger Warnings</IonLabel>
						<IonNote>Do not show ideas even somewhat related to the following</IonNote>
					</IonListHeader>
					<IonItem button={true} onClick={() => dispatch(toggleTrigger("humanDeath"))}>
						<IonLabel>Human death</IonLabel>
						<IonToggle slot="end" checked={triggers.humanDeath} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleTrigger("humanDistress"))}>
						<IonLabel>Human distress</IonLabel>
						<IonToggle slot="end" checked={triggers.humanDistress} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleTrigger("animalDeath"))}>
						<IonLabel>Animal death</IonLabel>
						<IonToggle slot="end" checked={triggers.animalDeath} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(toggleTrigger("animalDistress"))}>
						<IonLabel>Animal distress</IonLabel>
						<IonToggle slot="end" checked={triggers.animalDistress} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
