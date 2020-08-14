<template>
  <section class="d-flex flex-column vh-100 justify-content-between">
    <div>
      <NavBar @logout="logout"></NavBar>
      <main class="row m-0 p-3">
        <Categories
          v-for="(category, id) in categories"
          :key="id"
          :category="category"
          @createTask="createTask"
          :tasks="tasks"
          @fetchTasks="fetchTasks"
        ></Categories>
      </main>
    </div>

    <footer>
      <h6 class="text-muted text-right font-weight-lighter container-md py-3">
        A Kanban Project by @ridgra
      </h6>
    </footer>
  </section>
</template>

<script>
import NavBar from '../components/NavBar';
import Categories from '../components/Categories';
export default {
  name: 'HomePage',
  props: ['categories', 'tasks'],
  components: {
    NavBar,
    Categories,
  },
  methods: {
    createTask(data) {
      this.$emit('createTask', data);
    },
    logout() {
      this.$emit('logout');
    },
    fetchTasks() {
      this.$emit('fetchTasks');
    },
  },
};
</script>
