import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import API from './services/api';
import store from './store/index'
import errorHandle from './services/errorHandle'

import axios from 'axios'
import moment from 'vue-moment';
import VeeValidate from 'vee-validate'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import Multiselect from 'vue-multiselect'
import Notifications from 'vue-notification'
import vueDropzone from 'vue2-dropzone'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'
Vue.config.productionTip = false;
Vue.prototype.$API = API;

Vue.use(moment);
Vue.use(VeeValidate);
Vue.use(Notifications);
Vue.use(Vuex);
Vue.use({
  install(Vue) {
    const newAxios = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    });
    newAxios.interceptors.response.use(resp => resp, error => {
      const responseError = error.response.data.error
      if (error.response.status === 401) {
        localStorage.clear();
        router.push({ path: '/' })
      }

      Vue.prototype.$notify({
        title: ' ',
        type: 'error',
        text: errorHandle.buildNotifyMsg(responseError),
        speed: 100
      });

      return Promise.reject(error.response);
    });
    // Rename to transport
    Vue.prototype.$api = newAxios
  }
})

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('multiselect', Multiselect);
Vue.component('vueDropzone', vueDropzone);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
