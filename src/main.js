import {createApp} from "vue";
import App from "./Music.vue";
import axios from "axios";

// Custom CSS
import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Plugins
import { registerPlugins } from "@/plugins";

const vuetify = createVuetify({
  components,
  directives,
});

// Register plugins
const app = createApp(App);
registerPlugins(app);
createApp(App).use(vuetify).mount("#app");
