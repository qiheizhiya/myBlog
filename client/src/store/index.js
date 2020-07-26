import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isToken: !!localStorage.getItem('token') // 有没有token
  },
  mutations: {
    setIsToken (state, data) {
      state.isToken = data
    }
  },
  actions: {
    clearToken ({commit}) {
      localStorage.removeItem('token')
      commit('setIsToken', false)
    }
  },
  modules: {}
});
