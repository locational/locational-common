import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash.get'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    data: [],
    config: {},
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
    set_data: (state, data) => {
      state.data.push(data)
    }
  },
  actions: {
    get_data: async (context, id) => {
      const res = await fetch(`/static/data/${id}.json`)
      const data = await res.json()
      context.commit('set_data', data)
    }
  }
})
