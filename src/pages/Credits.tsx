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

const Credits = () => {
	const dispatch = useDispatch();
	const version = useSelector((state: any) => state.currentVersion, shallowEqual);
	useIonViewDidEnter(() => {
		dispatch(currentPage("home"));
	});
	return (
		<IonPage>
			<IonHeader className="blank">
				<IonToolbar>
					<IonTitle>Credits</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="blanky">
				<IonGrid className="blank">
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonLabel>Haphazard Inspirations v{version}</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>App icon based on <a href="https://thenounproject.com/term/information-overload/579861/">Information Overload</a> by Jenny Chisnell, via the Noun Project.</p>
									<p className="newThought">Background image on Inspirations page based on <a href="https://thenounproject.com/Stephen_Plaster/collection/flow-states/?i=366701">Scattered Material</a> by Stephen Plaster, GB, and <a href="https://thenounproject.com/iconisland/collection/hair-styles/?i=484400">Haircut</a> by Icon Island, both via the Noun Project.</p>
									<p className="newThought">Send bug reports to <a href="mailto:jasontankapps@gmail.com">jasontankapps@gmail.com</a>.</p>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>&nbsp;</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>&nbsp;</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<div className="ion-text-center"><a href="https://www.buymeacoffee.com/jasontank"><img src="default-blue.webp" alt="Buy Me A Coffee" style={ { height: "40px", width: "144px" } } /></a></div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Credits;
