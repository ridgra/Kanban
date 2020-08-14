<template>
  <div>
    <b-form class="" @submit.prevent="onSubmit">
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

      <b-button class="btn btn-block" type="submit" variant="primary">{{
        page
      }}</b-button>
    </b-form>
    <div v-if="page == 'Log in'">
      <div class="text-center py-1">
        <span class="font-weight-light text-primary">OR</span>
      </div>
      <div>
        <b-button
          @click.prevent=""
          class="btn btn-block"
          type="button"
          variant="primary"
          >Google</b-button
        >
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['page'],
  data() {
    return {
        email: '',
        password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$App.$emit('yoo')
      // console.log(this.email, this.password)
    },
  },
};
</script>

<style></style>
