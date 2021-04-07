import React from 'react';
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonGrid,
	IonRow,
	IonCol,
	IonCardHeader,
	IonLabel,
	IonCardContent,
	useIonViewDidEnter
} from '@ionic/react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import './Home.css';
import { currentPage } from '../components/ReduxDucks';

const About = () => {
	const dispatch = useDispatch();
	const [totalPossibilities, version] = useSelector((state: any) => [state.status.total, state.currentVersion], shallowEqual);
	useIonViewDidEnter(() => {
		dispatch(currentPage("home"));
	});
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>About</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="onlyList">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonLabel>Haphazard Inspirations v{version}</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>There are currently over</p>
									<p className="oomph">{
										totalPossibilities ? totalPossibilities.toLocaleString() : "[unknown: this will be calculated on first use]"
									}</p>
									<p>inspirations possible.</p>
									<p className="newThought">Use the <strong>Content Filters</strong> to avoid topics you'd rather not explore.</p>
									<p className="newThought">Hit the star in the upper corner to save a particular inspiration to your <strong>Favorites</strong>.</p>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonCard>

				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default About;
