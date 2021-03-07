import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
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

/* Google webfontloader */
import WebfontLoader from '@dr-kobros/react-webfont-loader';

/* Theme variables */
import './theme/variables.css';

/* WebfontLoader config */
const WFLconfig = {
	google: {
		families: [
			'Noto Sans:400,400i,700,700i:latin,cyrillic,cyrillic-ext,greek,greek-ext,latin-ext',
			'Noto Serif:400,400i,700,700i:latin,cyrillic,cyrillic-ext,greek,greek-ext,latin-ext'
		],
	}
};

const App = () => {
	return (
		<WebfontLoader config={WFLconfig}>
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
							<Redirect exact={true} from="/" to="/home" />
						</IonRouterOutlet>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		</WebfontLoader>
	)
};

export default App;
