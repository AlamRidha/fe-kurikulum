// import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";

// router
import router from "./router";

// pinia
import { createPinia } from "pinia";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

// import vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// import pinia
const pinia = createPinia();

app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");
// createApp(App).mount("#app");
