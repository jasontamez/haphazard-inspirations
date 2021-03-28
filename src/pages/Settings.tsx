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
	IonToggle
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { toogleBooleanOption } from '../components/ReduxDucks';
import './Home.css';

const Home = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
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
			<IonContent fullscreen>
				<IonList lines="none" className="buttonFilled">
					<IonItem button={true} onClick={() => dispatch(toogleBooleanOption("shake"))}>
						<IonLabel>Shake for new idea</IonLabel>
						<IonToggle slot="end" checked={state.shake}  />
					</IonItem>
					<IonItem>
						<IonLabel></IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel></IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel></IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel></IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel></IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel></IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
