import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://twolargepizzas.com";
}

Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
