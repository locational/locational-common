import Vue from 'vue'
import Router from 'vue-router'

import page_list from 'app/components/navigation.vue'
import page from 'app/components/page.vue'

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
      component: page_list,
      // props: true
    },
    {
      path: '/pages/:page_thing_id',
      component: page,
      props: true
    }
  ]
})
