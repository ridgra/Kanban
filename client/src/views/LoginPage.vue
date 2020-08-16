<template>
  <div class="row vh-100 align-items-center" id="welcome-page">
    <div class="col-md-1 d-none d-lg-block d-lg-none"></div>
    <div class="col-md-5 col-sm-6 col-lg-4 p-5">
      <div class="text-center">
        <img src="../assets/logo.svg" class="w-75" alt />
      </div>
      <div>
        <h5 class="font-weight-light text-center py-3 text-primary">
          Log in to Tralala!
        </h5>
      </div>
      <div>
        <b-form class @submit.prevent="submit">
          <b-form-group>
            <b-form-input
              v-model="email"
              type="text"
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input
              v-model="password"
              type="password"
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>

          <b-button class="btn btn-block" type="submit" variant="primary"
            >Log in</b-button
          >
        </b-form>
        <div>
          <div class="text-center py-1">
            <span class="font-weight-light text-primary">OR</span>
          </div>
          <div>
            <button
              v-google-signin-button="clientId"
              class="btn btn-primary btn-block google-signin-button"
              type="button"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
      <div class="text-center">
        <hr />
        <a href @click.prevent="signupPage" class="font-weight-light"
          >Sign up for an account</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
      clientId: '781316995666-u8la701llcj94cbbajmr9fao59pm2rbt.apps.googleusercontent.com'
    };
  },
  methods: {
    signupPage() {
      this.$emit('signupPage');
    },
    submit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit('login', payload);
      this.email = '';
      this.password = '';
    },
    OnGoogleAuthSuccess (idToken) {
      localStorage.idToken = idToken
      this.$emit('googleSignIn')
    },
    OnGoogleAuthFail (error) {
      // console.log(error)
    }
  },
};
</script>
