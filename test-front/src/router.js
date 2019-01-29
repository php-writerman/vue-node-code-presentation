import Vue from 'vue'
import Router from 'vue-router'
import authService from "./services/authService";
import userApi from "./services/api/users";
import store from "./store";

Vue.use(Router);

const userAlreadyLogin = async (to, from, next) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    next({ path: '/bank-information' })
  } else {
    next()
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: userAlreadyLogin
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue'),
      beforeEnter: userAlreadyLogin
    },
    {
      path: '/bank-information',
      name: 'bank-information',
      component: () => import('./views/BankInformation.vue'),
      meta: {
        title: 'Bank information'
      },
      beforeEnter: async (to, from, next) => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          authService.setAxiosAuthToken(authToken);
          const userData = await userApi.fetchUserInfo();
          store.commit('setUser', {user: userData});
          next()
        } else {
          next({ path: '/' })
        }
      }
    },

  ]
})
