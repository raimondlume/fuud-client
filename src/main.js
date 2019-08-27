import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VTooltip from 'v-tooltip'
import moment from 'moment'
import RotateLoader from 'vue-spinner/src/RotateLoader'

// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

// tooltips
Vue.use(VTooltip)

// import main stylesheet
require('./assets/style.scss')

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('rotate-loader', RotateLoader)

// configure base url for api consumption
const base = axios.create({
  baseURL: 'https://fuud.raimondlu.me/api/v1/'
})

// add token to requests
base.interceptors.request.use(
  (config) => {
    let token = store.getters.getToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Vue.prototype.$http = base
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
