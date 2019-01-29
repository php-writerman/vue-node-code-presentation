import Vue from 'vue'
import authService from "../services/authService";

export default {
  createUser({commit}, data) {
    return Vue.prototype.$api.post('/user/register', data).then(res => {
      const { user, token } = res.data;
      commit('setUser', { user });
      authService.authorize(token);

      return true
    })
  },
  logout({ commit }) {
    return Vue.prototype.$api.post('/user/logout').then(() => {
      localStorage.clear();
      commit('setUser', {});

      return true
    })
  }
}
