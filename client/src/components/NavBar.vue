<template>
  <div>
    <header class="bg-primary">
      <nav class="navbar navbar-light container-md">
        <a class="navbar-brand" href="#">
          <img
            src="../assets/logo-white.svg"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <div>
          <img
            class="rounded-circle mr-3"
            height="30"
            src="https://api.adorable.io/avatars/40/abott@adorable.pngCopy to Clipboard
					"
            alt=""
          />
          <a @click="logout" class="text-white" href="">Logout</a>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style></style>
