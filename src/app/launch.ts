import Vue from 'vue'

import App from './components/shell.vue'
import router from './router/index'
import store from './store/index'

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

  store.commit('set_config', assembled_config)

  const props = {
    app_config: {title: "Brilliant title"}
  }

  new Vue({
    el: '#app',
    router,
    store,
    props,
    render: h => h(App)
  })

}
