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
	IonInput,
	useIonViewDidEnter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	currentPage,
	setBoolean,
	setNumber
} from '../components/ReduxDucks';
import './Home.css';

const Settings = () => {
	const dispatch = useDispatch();
	const [settings, toggles] = useSelector((state: any) => [state.settings, state.toggles], shallowEqual);
	useIonViewDidEnter(() => {
		dispatch(currentPage("home"));
	});
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
					<IonItem>
						<IonLabel>Shake for new idea</IonLabel>
						<IonToggle onClick={() => dispatch(setBoolean(["shake", !toggles.shake]))} slot="end" checked={toggles.shake} />
					</IonItem>
					<IonItem>
						<IonLabel style={ { minWidth: "calc(100% - 5rem)" } }>Try not to show the same idea twice within this many days:</IonLabel>
						<IonInput style={ { maxWidth: "5rem" } } inputmode="numeric" step="1" type="number" max="7305" min="1" onIonChange={(e) => dispatch(setNumber(["flushDays", Number((e.target as HTMLInputElement).value)]))} value={settings.flushDays} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Settings;
