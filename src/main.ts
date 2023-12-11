import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';

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

createApp(App).use(vuetify).use(router).mount('#app');
