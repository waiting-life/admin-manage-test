import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: true,
    userInfo: {
      nickname: '',
      user_id: ''
    }
  },
  mutations: {
    changeCollapse(state, payload) {
      state.isCollapse = payload
    },
    getUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
