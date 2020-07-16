import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Content from './views/Content'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL ? process.env.BASE_URL : '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:id',
      name: 'document',
      component: Content
    }
  ]
})