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
	setNumber,
	setFlushNowStatus
} from '../components/ReduxDucks';
import './Home.css';

const Settings = () => {
	const dispatch = useDispatch();
	const [settings,  status] = useSelector((state: any) => [state.settings, state.toggles, state.status], shallowEqual);
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
			<IonContent fullscreen className="onlyList settingsPage">
				<IonList lines="none" className="buttonFilled longLabels">
					<IonItem>
						<IonLabel>Try not to show the same idea twice within this many days:</IonLabel>
						<IonInput inputmode="numeric" step="1" type="number" max="7305" min="1" onIonChange={(e) => dispatch(setNumber(["flushDays", Number((e.target as HTMLInputElement).value)]))} value={settings.flushDays} />
					</IonItem>
					<IonItem>
						<IonLabel>Clear and reset the internal list of recently-shown ideas the next time you generate an inspiration</IonLabel>
						<IonToggle onClick={() => dispatch(setFlushNowStatus(!status.flushNow))} slot="end" checked={status.flushNow} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Settings;
