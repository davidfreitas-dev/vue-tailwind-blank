import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './assets/css/global.css';
import './services/firebase-firestore';

const pinia = createPinia();
const app = createApp(App);

app.use(Toast);
app.use(pinia);
app.use(router);
app.mount('#app');