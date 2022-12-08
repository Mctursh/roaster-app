import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "./auth/axios";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;


Axios.get('/checklogin')
  .then(() => store.dispatch('setAuth', true))
  .catch(() => store.dispatch('setAuth', false))
  .finally(() => {
    // Vue.use(VueAxios, axios);
    // new Vue({
    //   router,
    //   store,
    //   render: h => h(App)
    // }).$mount("#app");
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);
    // Vue.use(moment)
    // Vue.config.globalProperties.$moment=moment;
  });

