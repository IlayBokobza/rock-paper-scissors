import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket:null,
  },
  mutations: {
    resetSocket:state => (state.socket = null),
    setSocket:(state,payload) => (state.socket = payload)
  },
  actions: {
  },
  modules: {
  }
})
