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

Axios.get("/checklogin")
  .then((r) => {
    console.log(r);
    store.commit("UPDATE_USER_ID", r.data.data._id);
    store.dispatch("setAuth", true);
    if (r.data.data.role == "Admin") {
      store.commit("UPDATE_ADMIN", true);
    } else {
      store.commit("UPDATE_ADMIN", false);
    }
  })
  .catch(() => store.dispatch("setAuth", false))
  .finally(() => {
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
