import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Content from './pages/Content';
import Theme from './pages/Theme';
import Menu from './components/Menu';
import { setFetchStatus } from "./components/ReduxDucks";
import { initializeIdeas } from './components/GatherInspiration';

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
		return (dispatch: any) => {
			const afterInit = (flag: boolean) => {
				console.log("INIT: " + String(flag))
				dispatch(setFetchStatus(true));
			};
			return StateStorage.getItem("lastState").then((storedState: any) => {
				if(storedState !== null) {
					if(storedState && (typeof storedState) === "object") {
						if (compareVersions.compare(storedState.currentVersion || "0.0.1", "0.1.1", "<")) {
							// Do stuff to possibly bring storedState up to date
							// MAYBE set storedState.newIdeas to true
							storedState.fetchOk = false;
							storedState.idea1 = null;
							storedState.idea2 = null;
							initializeIdeas(afterInit);
						}
						if (compareVersions.compare(storedState.currentVersion || "0.0.1", VERSION.current, "<")) {
							// Do stuff to possibly bring storedState up to date
							storedState.currentVersion = VERSION.current;
						}
						if(checkIfState(storedState)) {
							return dispatch(overwriteState(storedState));
						}
					}
				}
				// We need to initialize
				initializeIdeas(afterInit);
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
					{/* <Main />
						Using the render method prop cuts down the number of renders your components
						will have due to route changes. Use the component prop when your component
						depends on the RouterComponentProps passed in automatically.
					*/}
					<IonRouterOutlet id="main">
						<Route exact path="/home" render={() => <Home />} />
						<Route exact path="/settings" render={() => <Settings />} />
						<Route exact path="/content" render={() => <Content />} />
						<Route exact path="/theme" render={() => <Theme />} />
						<Redirect exact={true} from="/" to="/home" />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
};

export default App;
