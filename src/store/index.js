import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    config: {}
  },
  getters: {},
  mutations: {
    set_config: (state, config) => {
      state.config = config
    }
  },
  actions: {}
})
