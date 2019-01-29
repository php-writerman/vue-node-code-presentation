import Vue from 'vue'
import authService from "../authService";

export default {
    userLogin(loginData) {
        return Vue.prototype.$api.post('/user/login', loginData).then(res => {
            authService.authorize(res.data.token)

            return res;
        })
    },

    fetchUserInfo() {
        return Vue.prototype.$api.get('/me').then(res => res.data)
    }
}
