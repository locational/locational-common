import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import VueGoodTable from 'vue-good-table'
import { launch } from './launch'

Vue.use(VueMaterial)
Vue.use(VueGoodTable)

Vue.material.registerTheme('default', {
  primary: 'amber',
  accent: 'pink',
  warn: 'red'
})

Vue.config.productionTip = false

launch().catch(console.error)
