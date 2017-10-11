import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueGoodTable from 'vue-good-table'
import App from './App'
import store from './store'

Vue.use(VueMaterial)
Vue.use(VueGoodTable)

Vue.config.productionTip = false

const launch = async () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })

  // Simulate retrieving/inserting config from somewhere
  const config = await fetch('/static/configs/foci.json').then(res => res.json())
  // This commit works, but doesn't display in vue-devtools
  store.commit('set_config', config)
}

launch()
