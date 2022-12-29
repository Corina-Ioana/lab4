/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { VueElement } from "vue";
import vuetify from "./vuetify";


export function registerPlugins(app) {
  app.use(vuetify);
}
