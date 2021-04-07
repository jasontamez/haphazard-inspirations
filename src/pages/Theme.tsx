import React from 'react';
import {
	IonPage,
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	useIonViewDidEnter
} from '@ionic/react';
import {
	checkmarkCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { currentPage, updateTheme } from '../components/ReduxDucks';
import './Home.css';

const Theme = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	useIonViewDidEnter(() => {
		dispatch(currentPage("home"));
	});
	const appTheme = state.theme || "Default";
	const changeAppTheme = (theme: string) => {
		dispatch(updateTheme(theme));
	};
	const themes = [
		"Default",
		"Light",
		"Solarized Dark",
		"Solarized Light",
		"DeepPurple",
		"RoseGlasses"
	];
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Choose a Theme</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="onlyList">
				<IonList lines="none" className="buttonFilled striped">
					{themes.map((theme) => (
						<IonItem key={theme} button={true} detail={false} onClick={() => changeAppTheme(theme)}>
							<IonLabel>{theme}</IonLabel>
							{appTheme === theme ? (<IonIcon icon={checkmarkCircleOutline} slot="end" />) : ""}
						</IonItem>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Theme;
