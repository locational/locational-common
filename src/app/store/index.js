import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash.get'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meta: {
      user: {},
    },
    pages: [],
    data_sources: []
  },
  mutations: {
    set_meta: (state, meta) => {
      state.meta = meta
    },
    set_pages: (state, pages) => {
      state.pages = pages
    },
    set_data_sources: (state, data_sources) => {
      state.data_sources = data_sources
    }
  }
})
