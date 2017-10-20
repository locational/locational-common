import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import {config_schema} from './schemas/config_schema'
import {assemble} from "./config/assemble_config/index";

export const launch = async () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })

  // Simulate retrieving/inserting config from somewhere
  const config = await fetch('/static/configs/foci.json').then((res: Response) => res.json())

  if (!config_schema(config)) {
    console.log(config_schema.errors(config))
    return console.error('Invalid schema for config')
  }

  const relations = [
    {parent_key: 'view_things', child_key: 'data_things'},
    {parent_key: 'page_things', child_key: 'view_things'}
  ]

  const assembled_config = assemble(config, relations)

  // This commit executes successfully, but doesn't display
  // in vue-devtools timeline due to timing
  store.commit('set_config', assembled_config)
}
