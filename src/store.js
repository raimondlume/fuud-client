import Vue from 'vue'
import Vuex from 'vuex'

let jwtDecode = require('jwt-decode')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userID: null,
    firstName: null,
    lastName: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    destroyToken (state) {
      state.token = null
      localStorage.removeItem('token')
    },
    setUserID (state, userID) {
      state.userID = userID
    },
    setNames (state, { firstName, lastName }) {
      state.firstName = firstName
      state.lastName = lastName
    }
  },
  actions: {
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http.post('account/login', {
          email: credentials.email,
          password: credentials.password
        }).then(response => {
          const token = response.data.token
          decodeTokenAndSetData(token, context)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    retrieveTokenFromLocalStorage (context) {
      const token = localStorage.getItem('token')
      if (token === null) return

      decodeTokenAndSetData(token, context)
    },
    destroyToken (context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve) => {
          context.commit('destroyToken')
          resolve()
        })
      }
    },
    createToken (context, credentials) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http.post('account/register', {
          email: credentials.email,
          password: credentials.password,
          firstName: credentials.firstName,
          lastName: credentials.lastName
        }).then(response => {
          const token = response.data.token

          decodeTokenAndSetData(token, context)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    },
    loggedIn (state) {
      return state.token !== null
    },
    getName (state) {
      return state.firstName == null || state.lastName == null
        ? null
        : `${state.firstName} ${state.lastName}`
    },
    getUserID (state) {
      return state.userID
    }
  }
})

function decodeTokenAndSetData (token, context) {
  context.commit('setToken', token)

  let decodedToken = jwtDecode(token)
  context.commit('setNames', { firstName: decodedToken.FirstName, lastName: decodedToken.LastName })
  context.commit('setUserID', decodedToken.UserID)
}
