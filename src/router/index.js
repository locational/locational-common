import Vue from 'vue'
import Router from 'vue-router'
import RThinfg from 'components/thing.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: RThinfg
    }
  ]
})
