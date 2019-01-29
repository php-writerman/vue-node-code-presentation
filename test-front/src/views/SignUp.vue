<template>
  <form role="form" class="needs-validation form-login body" v-on:submit.prevent="submit">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label class="label-l" for="inputFirstName">First Name *</label>
        <input v-validate="'required|alpha'" name="first-name" v-model="form.firstName"
               type="text" class="form-control" autocomplete="on" id="inputFirstName" placeholder="First Name">
        <div class="invalid-feedback">
          {{ errors.first('first-name') }}
        </div>
      </div>
      <div class="form-group col-md-6">
        <label class="label-l" for="inputLastName">Last Name *</label>
        <input v-validate="'required|alpha'" name="last-name" v-model="form.lastName"
               type="text" class="form-control" autocomplete="on" id="inputLastName" placeholder="Last Name">
        <div class="invalid-feedback">
          {{ errors.first('last-name') }}
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="label-l" for="inputUserEmail">User Email *</label>
      <input v-validate="'required|email'" name="email" type="text" v-model="form.email"
             class="form-control" autocomplete="on" id="inputUserEmail" placeholder="User Email">
      <div class="invalid-feedback">
        {{ errors.first('email') }}
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label class="label-l" for="inputPassword">Password *</label>
        <input v-validate="{ required: true, min: 8, regex: this.passRegex }" type="password" v-model="form.password" name="password"
               ref="password" class="form-control" autocomplete="off" id="inputPassword" placeholder="********">
        <div class="invalid-feedback">
          {{ errors.first('password') }}
        </div>
      </div>
      <div class="form-group col-md-6">
        <label class="label-l" for="inputPasswordAgain">Password Again *</label>
        <input v-validate="'required|confirmed:password'" type="password" v-model="form.passwordRepeat" name="password-again"
               class="form-control" autocomplete="off" id="inputPasswordAgain" placeholder="********">
        <div class="invalid-feedback">
          {{ errors.first('password-again') }}
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-blue mt-10 mb-20">Create</button>
    <div class="text-center fw-700 fs-12">
      <span class="dark-grey">Already have an account? </span>
      <router-link to="/" class="color-blue">Login here</router-link>
    </div>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'bank-information',
    data() {
      return {
        form: {},
      }
    },
    mounted() {
      this.$validator.pause()
    },
    computed: {
      passRegex() {
        return new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\(\\)\\[\\]\\{\\}\\<\\>\\-\\_\\=\\+])');
      }
    },
    methods: {
      ...mapActions([
        'createUser'
      ]),
      submit() {
        this.$validator.resume();
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.createUser(this.form).then(() => {
              this.$router.push('bank-information')
            })
          }
        })
      }
    }
  }
</script>
