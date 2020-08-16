<template>
  <section class="d-flex flex-column vh-100 justify-content-between">
    <div>
      <NavBar class="" :user="user" @createCat="createCat" @logout="logout"></NavBar>

      <main class="d-flex m-0 px-3 py-4">
        <Categories
          v-for="(category, id) in categories"
          :key="id"
          :category="category"
          @deleteCat="deleteCat"
          @updateCat="updateCat"
          @createTask="createTask"
          :tasks="tasks"
          @fetchTasks="fetchTasks"
          @deleteTask="deleteTask"
          @updateTask="updateTask"
          @updateTaskCategory="updateTaskCategory"
          @homePage="homePage"
          :user="user"
        ></Categories>
      </main>
    </div>
  </section>
</template>

<script>
import NavBar from '../components/NavBar';
import Categories from '../components/Categories';
export default {
  name: 'HomePage',
  props: ['user', 'categories', 'tasks'],
  components: {
    NavBar,
    Categories,
  },
  methods: {
    createCat(payload) {
      this.$emit('createCat', payload);
    },
    updateCat(payload) {
      this.$emit('updateCat', payload);
    },
    deleteCat(payload) {
      this.$emit('deleteCat', payload);
    },
    createTask(payload) {
      this.$emit('createTask', payload);
    },
    logout() {
      this.$emit('logout');
    },
    fetchTasks() {
      this.$emit('fetchTasks');
    },
    deleteTask(id) {
      this.$emit('deleteTask', id);
    },
    updateTask(payload) {
      this.$emit('updateTask', payload);
    },
    updateTaskCategory(payload) {
      this.$emit('updateTaskCategory', payload);
    },
    homePage() {
      this.$emit('homePage');
    },
  },
};
</script>

<style></style>
