import Vue from 'vue'
import Router from 'vue-router'

import select_page_thing from 'components/select_page_thing.vue'
import page_thing from 'components/page_thing.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/pages'
    },
    {
      path: '/pages',
      component: select_page_thing
    },
    {
      path: '/pages/:page_thing_id',
      component: page_thing,
      props: true
    }
  ]
})
