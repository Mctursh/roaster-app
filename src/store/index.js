import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isAdmin: false,
    viewedTour: false,
    authUserEmail: "elizabeth@ubth.edu.ng",
    authUserPassword: "password123@",
    authAdminEmail: "awoniyi@ubth.edu.ng",
    authAdminPassword: "password001@",
    dates: [],
  },
  getters: {},
  mutations: {
    UPDATE_AUTH(state, data) {
      state.isAuthenticated = data;
    },
    UPDATE_TOUR(state, data) {
      state.viewedTour = data;
    },
    UPDATE_ADMIN(state, data) {
      state.isAdmin = data;
    },
    UPDATE_DATES(state, data) {
      state.dates = [...state.dates, data];
    },
  },
  actions: {},
  modules: {},
});
