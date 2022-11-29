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
    allUserShifs: [],
    structure: {
      users: [
        {
          id: 1,
          firstName: '',
          lastName: '',
          position: '',
          role: '',
          request: [],
          shifts: []
        },
      ],
      request: [
        // {
        //   reqStatus: 'Pending', // Pending or Completed
        //   state: 'Approved', // Pending, Declined or Approved,
        //   reqUserId: 1,
        //   currentShift: 'N',
        //   targetShift: "M",
        //   targetUserId: 2,
        //   targetDate: '',
        //   approvalAdminName: 'Prof Princewill'
        // },
      ],
    }
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
      state.dates = [...state.dates, ...data];
    },
    UPDATE_SHIFTS(state, data) {
      state.allUserShifs = data;
    },
    UPDATE_STRUCTURE(state, data){
      state.structure = data
    }
  },
  actions: {},
  modules: {},
});
