import React from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonButtons
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useDispatch } from "react-redux";
import { updateTheme } from '../components/ReduxDucks';
import './Home.css';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Inspire</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(updateTheme("Default"))}>D</IonButton>
						<IonButton onClick={() => dispatch(updateTheme("Light"))}>L</IonButton>
						<IonButton onClick={() => dispatch(updateTheme("SolarizedDark"))}>SD</IonButton>
						<IonButton onClick={() => dispatch(updateTheme("SolarizedLight"))}>SL</IonButton>
						<IonButton onClick={() => dispatch(updateTheme("DeepPurple"))}>P</IonButton>
						<IonButton onClick={() => dispatch(updateTheme("RoseGlasses"))}>R</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Blank</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
