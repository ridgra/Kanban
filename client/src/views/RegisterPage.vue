<template>
  <div class="row vh-100 align-items-center" id="welcome-page">
    <div class="col-md-1 d-none d-lg-block d-lg-none"></div>
    <div class="col-md-5 col-sm-6 col-lg-4 p-5">
      <div class=" text-center">
        <img src="../assets/logo.svg" class="w-75" alt="" />
      </div>
      <div>
        <h5 class="font-weight-light text-center py-3 text-primary">
          Sign up for your account
        </h5>
      </div>
      <!-- <FormCmp :page="page"></FormCmp> -->
      <div>
        <b-form class="" @submit.prevent="submit">
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
            >Sign up</b-button
          >
        </b-form>
      </div>
      <div class="text-center">
        <hr />
        <a href="" @click.prevent="loginPage" class="font-weight-light"
          >Already have an account? Log In</a
        >
      </div>
    </div>
  </div>
</template>

<script>
// import FormCmp from '../components/FormCmp';

export default {
  components: {
    // FormCmp,
  },
  data() {
    return {
      // page: 'Sign up',
      email: '',
      password: '',
    };
  },
  methods: {
    loginPage() {
      this.$emit('loginPage');
    },
    submit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit('register', payload);
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style scoped></style>
