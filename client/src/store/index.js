import Vue from "vue";
import Vuex from "vuex";
import { list } from "@/api/article"
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
    // 清除token
    clearToken ({ commit }) {
      localStorage.removeItem('token')
      commit('setIsToken', false)
    },
    // 获取文章列表
    async getArtList (state, page) {
      return await list(page)
    },
    /**
     * 把日期变成 月份 哪一天 年份
     */
    async dataHandle(state, result) {
      const arr = ['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      let [y, m, other] = result.createdAt.split("-")
      const d = other.split(" ")[0]
      m = arr[parseInt(m)]
      const resultDate = [y, m, d]
      const keys = ['year', 'month', 'day']
      resultDate.forEach((item, index) => result[keys[index]] = resultDate[index])
      return result
    }
  },
  modules: {}
});
