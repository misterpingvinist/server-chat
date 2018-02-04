import Vue from "vue";
import Vuetify from "vuetify";

import App from "./components/App/App.vue";

import "../../node_modules/vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

Vue.config.devtools = true;
const appl = new Vue({
  el: "#app",
  render: (h) => h(App),
});

export default { appl };
