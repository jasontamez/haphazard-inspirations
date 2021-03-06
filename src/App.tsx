import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Content from './pages/Content';
import Theme from './pages/Theme';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Credits from './pages/Credits';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { VERSION, overwriteState, checkIfState, blankAppState } from './components/ReduxDucks';
import compareVersions from 'compare-versions';
import store from './components/ReduxStore';
import { StateStorage } from './components/PersistentInfo';

// Haircut by Icon Island from the Noun Project
// Scattered Material by Stephen Plaster from the Noun Project
// Information Overload by Jenny Chisnell from the Noun Project

const App = () => {
	const maybeSetState = () => {
		return async (dispatch: any) => {
			return StateStorage.getItem("lastState").then((storedState: any) => {
				if(storedState !== null) {
					if(storedState && (typeof storedState) === "object") {
						const storedVersion = storedState.currentVersion || "0.0.1";
						if (compareVersions.compare(storedVersion, "2.0.0", "<")) {
							// 2.0.0 includes breaking change.
							storedState.triggers.humanDeathViolent = false;
							storedState.triggers.humanDeathNatural = false;
						}
						if (compareVersions.compare(storedVersion, VERSION.current, "<")) {
							// Do stuff to possibly bring storedState up to date

							// Save current (old) version as "new" so we can check for updates
							// This may need to be modified once we go into production, especially for non-idea updates
							storedState.status.new = storedVersion;
							// Update current version to (new) actual current version
							storedState.currentVersion = VERSION.current;
						}
						if(checkIfState(storedState)) {
							return dispatch(overwriteState(storedState));
						}
					}
				}
				return dispatch(overwriteState(blankAppState));
			});
		}
	};
	store.dispatch(maybeSetState());
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId="main" when="xl">
					<Menu />
					{/*
						Using the render method prop cuts down the number of renders your components
						will have due to route changes. Use the component prop when your component
						depends on the RouterComponentProps passed in automatically.
					*/}
					<IonRouterOutlet id="main">
						<Route exact path="/home" render={() => <Home />} />
						<Route exact path="/settings" render={() => <Settings />} />
						<Route exact path="/content" render={() => <Content />} />
						<Route exact path="/favorites" render={() => <Favorites />} />
						<Route exact path="/theme" render={() => <Theme />} />
						<Route exact path="/about" render={() => <About />} />
						<Route exact path="/credits" render={() => <Credits />} />
						<Redirect exact={true} from="/" to="/home" />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
};

export default App;
