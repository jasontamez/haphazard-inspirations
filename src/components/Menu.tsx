import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonNote,
	IonMenuToggle
} from '@ionic/react';
import React from 'react';
import {
	settingsSharp,
	chatboxEllipsesSharp,
	colorPaletteSharp,
	homeSharp,
	filterSharp
} from 'ionicons/icons';
import './Menu.css';

const Menu = () => {
	return (
		<IonMenu contentId="main" type="overlay" id="mainMenu">
			<IonContent>
				<IonList lines="none">
					<IonListHeader>Haphazard Inspirations</IonListHeader>
					<IonNote></IonNote>
					<IonMenuToggle autoHide={false}>
						<IonItem routerLink="/home" routerDirection="forward" detail={false}>
							<IonIcon slot="start" icon={homeSharp} />
							<IonLabel>Home</IonLabel>
						</IonItem>
					</IonMenuToggle>
				</IonList>
				<IonList lines="none">
				<IonMenuToggle autoHide={false}>
						<IonItem routerLink="/settings" routerDirection="forward" detail={false}>
							<IonIcon slot="start" icon={settingsSharp} />
							<IonLabel>App Settings</IonLabel>
						</IonItem>
					</IonMenuToggle>
					<IonMenuToggle autoHide={false}>
						<IonItem routerLink="/content" routerDirection="forward" detail={false}>
							<IonIcon slot="start" icon={filterSharp} />
							<IonLabel>Content Filters</IonLabel>
						</IonItem>
					</IonMenuToggle>
					<IonMenuToggle autoHide={false}>
						<IonItem routerLink="/about" routerDirection="forward" detail={false}>
							<IonIcon slot="start" icon={chatboxEllipsesSharp} />
							<IonLabel>About</IonLabel>
					</IonItem>
					</IonMenuToggle>
					<IonMenuToggle autoHide={false}>
						<IonItem routerLink="/theme" routerDirection="forward" detail={false}>
							<IonIcon slot="start" icon={colorPaletteSharp} />
							<IonLabel>Theme</IonLabel>
						</IonItem>
					</IonMenuToggle>
					<IonMenuToggle autoHide={false}>
						<IonItem className="subItem" routerLink="/credits" routerDirection="forward" detail={false}>
							<IonLabel>Credits</IonLabel>
						</IonItem>
					</IonMenuToggle>
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
