import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "@routes";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
