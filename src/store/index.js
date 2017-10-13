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
    },
    add_data (state, row) {
      // TODO: @refac Rewrite this beautiful line of code
      state.config.page_things[0].view_things[0].data_things[0].rows.push(row)
    }
  },
  actions: {
    async get_data (context, id) {
      const res = await fetch(`/static/data/${id}.json`)
      const json = await res.json()
      return json
    }
  }
})
