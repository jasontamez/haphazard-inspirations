import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonNote,
} from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
	shuffleSharp,
	bookSharp,
	settingsSharp,
	chatboxEllipsesSharp,
	caretForwardSharp,
	ellipseSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
	url: string
	title: string
	icon?: string
	id: string
	parent?: string
	parentOf? : string
}
interface MenuSection {
	header?: string
	note?: string
	pages: AppPage[]
	id: string
}

const appMenuPages: MenuSection[] = [
	{
		header: "Conlang Toolbox",
		note: "tools for conlangers",
		pages: [
			{
				title: 'WordEvolve',
				url: '/we',
				icon: shuffleSharp,
				id: 'menuitemWE',
				parentOf: 'we'
			},
			{
				title: 'Input',
				url: '/we/input',
				id: 'menuitemWEinp',
				parent: 'we'
			},
			{
				title: 'Categories',
				url: '/we/categories',
				id: 'menuitemWEcat',
				parent: 'we'
			},
			{
				title: 'Transformations',
				url: '/we/transformations',
				id: 'menuitemWEtns',
				parent: 'we'
			},
			{
				title: 'Sound Changes',
				url: '/we/soundchanges',
				id: 'menuitemWEscs',
				parent: 'we'
			},
			{
				title: 'Output',
				url: '/we/output',
				id: 'menuitemWEout',
				parent: 'we'
			},
			{
				title: 'Lexicon',
				url: '/lex',
				icon: bookSharp,
				id: 'menuitemLX'
			}
		],
		id: 'menuMain'
	},
	{
		pages: [
			{
				title: 'Settings',
				url: '/settings',
				icon: settingsSharp,
				id: 'menuitemSettings'
			},
			{
				title: 'About',
				url: '/about',
				icon: chatboxEllipsesSharp,
				id: 'menuitemAbout'
			}
		],
		id: 'menuOthers'
	}
];

const Menu = () => {
	const location = useLocation();

	return (
		<IonMenu contentId="main" type="overlay" id="mainMenu">
			<IonContent>
				{appMenuPages.map((menuSection) => {
					const pages = menuSection.pages.map((appPage) => {
						if(appPage.parentOf) {
							return (
								<IonItem
									key={appPage.id}
									className={
										'mainHeading'
										+ (location.pathname.startsWith(appPage.url) ? ' selected' : '')
									}
									lines="none"
									detail={false}
								>
									<IonIcon slot="start" icon={appPage.icon} />
									<IonLabel>{appPage.title}</IonLabel>
									<IonIcon className="caret" slot="end" icon={caretForwardSharp} />
								</IonItem>
							);
						} else if(appPage.parent) {
							return (
								<IonItem key={appPage.id} className={'subHeading' + (location.pathname.startsWith(appPage.url) ? ' selected' : '')} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false}>
									<IonLabel>{appPage.title}</IonLabel>
									<IonIcon slot="end" size="small" icon={ellipseSharp} />
								</IonItem>
							);
						}
						return (
							<IonItem key={appPage.id} className={'mainHeading' + (location.pathname.startsWith(appPage.url) ? ' selected' : '')} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false}>
								<IonIcon slot="start" icon={appPage.icon} />
								<IonLabel>{appPage.title}</IonLabel>
							</IonItem>
						);
				});
					let head: any = (menuSection.header) ? (<IonListHeader>{menuSection.header}</IonListHeader>) : '',
						note: any = (menuSection.note) ? (<IonNote>{menuSection.note}</IonNote>) : '';
					return (
						<IonList key={menuSection.id}>
							{head}{note}
							{pages}
						</IonList>
					);
				})}
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
