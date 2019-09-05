import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/auth/Login.vue'
import Logout from './views/auth/Logout.vue'
import Register from './views/auth/Register.vue'
import MenuByProvider from './views/MenuByProvider'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: '/index.html'
    },
    {
      path: '/bitstop',
      name: 'provider-bitstop',
      component: MenuByProvider,
      props: {
        providerId: 1
      }
    },
    {
      path: '/daily-it-maja',
      name: 'provider-daily-it-building',
      component: MenuByProvider,
      props: {
        providerId: 2
      }
    },
    {
      path: '/daily-kuues-korpus',
      name: 'provider-daily-kuues-korpus',
      component: MenuByProvider,
      props: {
        providerId: 3
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
