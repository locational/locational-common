import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import {config_schema} from './schemas/config_schema'
import {assemble_config} from './config/assemble_config'

export const launch = async () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })

  // Simulate retrieving/inserting config from somewhere
  const config = await fetch('/static/configs/foci.json').then((res) => res.json())

  if (!config_schema(config)) {
    console.log(config_schema.errors(config))
    return console.error('Invalid schema for config')
  }

  const assembled_config = assemble_config(config)

  // This commit works, but doesn't display in vue-devtools
  store.commit('set_config', assembled_config)
}
