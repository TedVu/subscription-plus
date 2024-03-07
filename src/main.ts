import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';
import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
});

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount('#app');
