import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash/get'

import { common } from 'models/common'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    config: {},
    data: []
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
    add_data (state, {id, row}) {
      const data_to_add_to = state.data.find(d => d.id === id)
      data_to_add_to.rows.push(row)
    },
    push_data (state, data_to_push) {
      state.data.push(data_to_push)
    }
  },
  actions: {
    async get_data (context, id) {
      const data = await common.load_from_local(id)
      context.commit('push_data', data)
    }
  }
})
