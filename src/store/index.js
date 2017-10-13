import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash/get'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    config: {}
  },
  getters: {
    current_page_thing: (state, getters) => (page_thing_id) => {
      const page_things = get(state.config, 'page_things', [])
      return page_things.find(p => p.id === page_thing_id)
    }
  },
  mutations: {
    set_config: (state, config) => {
      state.config = config
    },
    add_data (state, row) {
      // TODO: @refac Rewrite this beautiful line of code
      state.config.page_things[0].view_things[0].data_things[0].rows.push(row)
    }
  },
  actions: {}
})
