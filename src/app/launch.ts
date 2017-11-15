import Vue from 'vue'

import App from './components/shell.vue'
import router from './router/index'

import {config_schema} from './schemas/config_schema'

export const launch = async () => {


  // Simulate retrieving/inserting config from somewhere
  const config = await fetch('/static/configs/foci_2.json').then((res: Response) => res.json())

  if (!config_schema(config)) {
    console.log(config_schema.errors(config))
    return console.error('Invalid schema for config')
  }

  const relations = [
    {parent_key: 'view_things', child_key: 'data_things'},
    {parent_key: 'page_things', child_key: 'view_things'}
  ]

  const assembled_config = {} // Load config from store - don't pre-assemble

  // create own store (fruitplate?)
  // commit into our own store (not Vuex) the whole config, load all data, etc.

  const props = {
    app_config: {title: "Brilliant title"}
  }

  new Vue({
    el: '#app',
    router,
    props,
    render: h => h(App)
  })

}
