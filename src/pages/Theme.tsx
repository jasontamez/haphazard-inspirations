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
	IonTitle
} from '@ionic/react';
import {
	checkmarkCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { updateTheme } from '../components/ReduxDucks';
import './Home.css';

const MaybeLoadPresetModal = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const appTheme = state.theme || "Default";
	const changeAppTheme = (theme: string) => {
		dispatch(updateTheme(theme));
	};
	const themes = [
		"Default",
		"Light",
		"DeepPurple",
		"RoseGlasses",
		"Solarized Light",
		"Solarized Dark"
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
			<IonContent fullscreen>
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

export default MaybeLoadPresetModal;
