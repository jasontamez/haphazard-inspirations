import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	"appId": "net.jasontank.haphazardinspirations",
	"appName": "Haphazard Inspirations",
	"bundledWebRuntime": false,
	"webDir": "build",
	"plugins": {
		"SplashScreen": {
			"launchAutoHide": false
		}
	},
	"backgroundColor": "#000000",
	"cordova": {}
};

export default config;
