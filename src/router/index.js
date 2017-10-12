import Vue from 'vue'
import Router from 'vue-router'
import page_thing_selector from 'components/select_page_thing.vue'
import page_thing from 'components/page_thing.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: page_thing_selector
    },
    {
      path: '/pages/:page_thing_id',
      component: page_thing,
      props: true
    }
  ]
})
