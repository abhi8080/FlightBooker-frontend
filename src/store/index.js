import { createStore } from "vuex";

export default createStore({
  state: {
    numOfPassengers: 0,
    flightInfo: {},
  },

  mutations: {
    setNumOfPassengers(state, number) {
      state.numOfPassengers = number;
    },

    setFlightInfo(state, flightInfo) {
      state.flightInfo = flightInfo;
    },
  },
  actions: {},
  modules: {},
});
