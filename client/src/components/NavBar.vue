<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand invisible">Navbar</a>
    </nav>
    <header class="navbar fixed-top bg-primary container-fluid">
      <nav class="container">
        <div>
          <b-form inline @submit.prevent="createCat">
            <div class=" input-group-sm">
              <b-input
                v-model="name"
                id="input-cat"
                @focus="flag = true"
                @blur="flag = false"
                class="mr-1"
                placeholder="Add another category"
              ></b-input>
            </div>
            <b-button
              type="submit"
              id="btn-cat"
              class="btn-sm btn btn-light h-100"
              :style="
                flag
                  ? { 'background-color': 'white' }
                  : { 'background-color': '#ffc7c7' }
              "
            >
              <b-icon-calendar-plus class="text-primary">
              </b-icon-calendar-plus>
            </b-button>
          </b-form>
        </div>
        <a class="navbar-brand">
          <img
            src="../assets/logo-white.svg"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <div>
          <img
            class="rounded-circle mr-2"
            height="30"
            :src="`https://api.adorable.io/avatars/285/${user.email}.png`"
            alt=""
          />
          <a class="text-white mr-4">{{ user.email }}</a>
          <a @click.prevent="logout" class="text-white" href="">Logout</a>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  props: ['user'],
  name: 'navbar',
  data() {
    return {
      name: '',
      flag: false,
    };
  },
  methods: {
    createCat() {
      this.$emit('createCat', this.name);
      this.name = '';
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style>
#input-cat {
  background-color: #ffc7c7 !important;
}
#input-cat::placeholder {
  color: #ff5f40;
}
#input-cat:focus {
  background-color: white !important;
}
</style>
