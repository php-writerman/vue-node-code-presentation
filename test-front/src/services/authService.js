import Vue from "vue";

export default {
  authorize(token) {
    this.setAxiosAuthToken(token)
    localStorage.setItem('authToken', token)
  },

  setAxiosAuthToken(token) {
    Vue.prototype.$api.defaults.headers.common.authorization = token
  },

  logout() {
    Vue.prototype.$api.defaults.headers.common.authorization = null
    localStorage.removeItem('authToken')
  }
}
