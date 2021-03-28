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
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
