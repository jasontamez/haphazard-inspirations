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
	IonIcon,
	IonButton,
	IonPopover,
	IonReorderGroup,
	IonReorder,
	useIonViewDidEnter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import fireSwal from '../components/Swal';
import {
	removeFave,
	setBoolean,
	openPopover,
	closePopover,
	reorderFaves,
	currentPage
} from '../components/ReduxDucks';
import './Home.css';
import { ellipsisVertical, reorderTwo, trashOutline } from 'ionicons/icons';
//import { $i } from '../components/DollarSignImports';

const Favorites = () => {
	const dispatch = useDispatch();
	const [showMin, popstate, faves] = useSelector((state: any) => [state.toggles.showMinimumFave, state.popover, state.favorites], shallowEqual);
	useIonViewDidEnter(() => {
		dispatch(currentPage("faves"));
	});
	const maybeDelete = (id: string, idea: string) => {
		const thenFunc = () => {
			dispatch(removeFave(id));
			fireSwal({
				title: "Deleted",
				toast: true,
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false
			});
		};
		fireSwal({
			title: idea + "...",
			text: "Are you sure you want to delete this favorite? It cannot be undone.",
			customClass: {popup: 'deleteConfirm'},
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: "Yes, delete it."
		}).then((result: any) => result.isConfirmed && thenFunc());
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: string[][], from: number, to: number) => {
			let moved = what[from];
			let remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat([moved], remains.slice(to)).map((a: string[]) => [...a]);
		};
		const ed = event.detail;
		const reorganized = reorganize(faves, ed.from, ed.to);
		dispatch(reorderFaves(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<IonHeader>
				<IonPopover
					id="poppy"
					event={popstate && popstate[0]}
					isOpen={popstate && popstate[1] === "favorites"}
					onDidDismiss={() => dispatch(closePopover())}
				>
					<IonList className="longLabels">
						<IonItem button={true} onClick={() => {
							//$i("poppy").dismiss();
							dispatch(setBoolean(["showMinimumFave", !showMin]));
						}}>
							<IonLabel>{showMin ? "Show entire inspirations" : "Show only basic elements"}</IonLabel>
						</IonItem>
					</IonList>
				</IonPopover>
				<IonToolbar>
					<IonTitle>Favorites</IonTitle>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={(e: any) => {
							e.persist();
							dispatch(openPopover([e, "favorites"]));
						}}>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="onlyList">
				<IonList lines="none" className="longLabels striped dragArea">
					<IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
						{faves.map((fave: string[]) => {
							let [id, idea1, idea2, ...info] = fave;
							let flag = true;
							if(showMin) {
								info = ["", idea1, ", ", idea2];
							}
							return (
								<IonItem key={id}>
									<IonReorder className="dragHandle"><IonIcon icon={reorderTwo} slot="start" color="tertiary" /></IonReorder>
									<IonButton color="danger" slot="end" onClick={() => maybeDelete(id, idea1)}>
										<IonIcon icon={trashOutline} slot="icon-only" />
									</IonButton>
									<IonLabel className="selectable">{info.map((s: string) => {
										if(flag) {
											flag = false;
											return s;
										}
										flag = true;
										return (<span className="idea" key={id + s}>{s}</span>);
									})}</IonLabel>
								</IonItem>
							);
						})}
					</IonReorderGroup>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Favorites;
