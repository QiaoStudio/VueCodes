// router.js
import Vue from 'vue'
import Router from 'vue-router'
import Elements from './pages/elements.vue'
import Utilities from './pages/utilities.vue'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Elements
      },
      {
        path: '/elements',
        component: Elements
      },
      {
        path: '/utilities',
        component: Utilities
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
}
