import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isAdmin: false,
    viewedTour: false,
    userData: [],
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
  getters: {
    loginState(state) { return state.isAuthenticated },
    getUserShifts(state) {
      return state.userData.shifts
    },
    getUserName(state) {
      return {firstName : state.userData.firstName, lastName :state.userData.lastName }
    }
  },
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
    },
    UPDATE_AUTH_USER(state, data){
      state.userData = data
    }
  },
  actions: {
    setAuth(context, value) {
      context.commit('UPDATE_AUTH', value)
    },
    setAuthUser(context, value){
      context.commit('UPDATE_AUTH_USER', value)
    }
  },
  modules: {},
});
