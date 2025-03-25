import "./extern/primeicons/primeicons.css";
import "./style.css";
import "./flags.css";

import { createApp } from "vue";
import router from './router'
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

import App from "./App.vue";
import AppState from './plugins/appState.js';
import Noir from './presets/Noir.js';

import ThemeSwitcher from './components/ThemeSwitcher.vue';
import CameraSetting from './components/CameraSetting.vue';
import CameraBaseSettings from './components/CameraBaseSettings.vue';
import CameraAdvancedSettings from './components/CameraAdvancedSettings.vue';
import HeaderMenuBar from './components/HeaderMenuBar.vue';
import WifiConnection from './components/WifiConnection.vue';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: false,
        }
    }
});
app.use(router)
app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component('ThemeSwitcher', ThemeSwitcher);
app.component('CameraSetting', CameraSetting);
app.component('CameraBaseSettings', CameraBaseSettings);
app.component('CameraAdvancedSettings', CameraAdvancedSettings);
app.component('HeaderMenuBar', HeaderMenuBar);
app.component('WifiConnection', WifiConnection);

app.mount("#app");
