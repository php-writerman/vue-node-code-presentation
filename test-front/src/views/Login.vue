<template>
  <div class="login-content">
    <div class="login-section">
      <div class="container">
        <div class="wrapper-login-block">
          <div class="title-block">Login</div>
          <div class="login-block clearfix shadow-lg">
            <div class="wrapper-form-login clearfix">
              <form role="form" class="needs-validation form-login" v-on:submit.prevent="submit">
                <div class="form-group">
                  <label class="label-l" for="exInputEmail1">Email</label>
                  <input v-validate="'required|email'" name="email" type="text" class="form-control"
                         id="exInputEmail1" placeholder="Email" v-model="login.email">
                  <div class="invalid-feedback">
                    {{ errors.first('email') }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="label-l" for="exInputPassword1">Your Password</label>
                  <input v-validate="'required'" name="password" type="password" class="form-control"
                         autocomplete="off" id="exInputPassword1" placeholder="Your Password" v-model="login.password">
                  <div class="invalid-feedback">
                    {{ errors.first('password') }}
                  </div>
                </div>

                <button type="submit" class="btn btn-blue mb-20">Login</button>
                <div class="text-center fw-700 fs-12">
                  <span class="dark-grey">Don't have an account yet? </span>
                  <router-link to="sign-up" class="color-blue">Sign up here!</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import userApi from '../services/api/users'

  export default {
    name: 'login',
    data() {
      return {
        login: {},
      }
    },
    mounted() {
      this.$validator.pause()
    },
    methods: {
      submit() {
        this.$validator.resume();
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            userApi.userLogin(this.login).then(() => {
              this.$router.push('bank-information')
            });
          }
        })
      }
    }
  }
</script>
