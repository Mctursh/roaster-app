import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    UPDATE_AUTH(state, data) {
      state.isAuthenticated = data;
    },
  },
  actions: {},
  modules: {},
});
