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
import './Home.css';

const Home: React.FC = () => {
//	const dispatch = useDispatch();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Inspire</IonTitle>
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
