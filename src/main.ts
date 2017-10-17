import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import VueGoodTable from 'vue-good-table'

import App from './App'
import router from './router'
import store from './store'
import {assemble_config} from './config/assemble_config'
import {main_schema} from './schemas/config_schema'
import {thing} from './simplest'

thing({msg: '1.0'})

Vue.use(VueMaterial)
Vue.use(VueGoodTable)

Vue.material.registerTheme('default', {
  primary: 'amber',
  accent: 'pink',
  warn: 'red'
})

Vue.config.productionTip = false

const launch = async () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })

  // Simulate retrieving/inserting config from somewhere
  const config = await fetch('/static/configs/foci.json').then((res: any) => res.json())
  // This commit works, but doesn't display in vue-devtools

  if (!main_schema(config)) {
    console.log(main_schema.errors(config))
    return console.error('Invalid schema')
  }

  const assembled_config = assemble_config(config)

  store.commit('set_config', assembled_config)
}

launch().catch(console.error)
