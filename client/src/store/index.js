import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let isDayTime = localStorage.getItem('isDayTime')
isDayTime && isDayTime !== 'false' ? isDayTime = true : isDayTime = false

export default new Vuex.Store({
  state: {
    isDayTime
  },
  mutations: {
    SetIsDayTime (state, data) {
      localStorage.setItem('isDayTime',data)
      state.isDayTime = data
    }
  },
  actions: {},
  modules: {}
});
