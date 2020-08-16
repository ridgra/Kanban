<template>
  <div id="app">
    <div class="vh-100">
      <nav></nav>
      <LoginPage
        v-if="activePage == 'loginPage'"
        @signupPage="setPage('signupPage')"
        @login="login"
        @googleSignIn="googleSignIn"
      ></LoginPage>
      <RegisterPage
        v-if="activePage == 'signupPage'"
        @loginPage="setPage('loginPage')"
        @register="register"
      ></RegisterPage>
      <HomePage
        v-if="activePage == 'homePage'"
        :user="user"
        @createTask="createTask"
        @logout="logout"
        :categories="categories"
        @updateCat="updateCat"
        @deleteCat="deleteCat"
        :tasks="tasks"
        @fetchTasks="fetchTasks"
        @deleteTask="deleteTask"
        @updateTask="updateTask"
        @updateTaskCategory="updateTaskCategory"
        @createCat="createCat"
        @homePage="homePage"
      ></HomePage>
      <div></div>
    </div>
  </div>
</template>

<script>
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import HomePage from './views/HomePage';
import axios from './config/axios';

export default {
  name: 'App',
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
  },
  data() {
    return {
      activePage: 'homePage',
      categories: [],
      tasks: [],
      user: '',
    };
  },
  methods: {
    setPage(page) {
      this.activePage = page;
    },

    homePage() {
      if (!localStorage.access_token) {
        this.setPage('loginPage');
      } else {
        this.setPage('homePage');
        this.fetchUser();
        this.fetchCategories();
        this.fetchTasks();
      }
    },
    async login(payload) {
      try {
        const { data } = await axios({
          url: '/login',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password,
          },
        });
        localStorage.access_token = data.access_token;
        this.homePage();
      } catch (err) {
        console.log(err);
      }
    },
    async googleSignIn() {
      try {
        const { data } = await axios({
          url: '/googleSignIn',
          method: 'post',
          data: {
            idToken: localStorage.idToken,
          },
        });
        localStorage.access_token = data.access_token;
        this.homePage();
      } catch (err) {
        console.log(err);
      }
    },
    async register(payload) {
      try {
        const { data } = await axios({
          url: '/register',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password,
          },
        });
        this.setPage('loginPage');
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUser() {
      try {
        const { data } = await axios({
          url: '/user',
          headers: {
            access_token: localStorage.access_token,
          },
        });
        // console.log(data, '<<< user.email');
        this.user = data.user;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchCategories() {
      try {
        const { data } = await axios({
          url: '/categories',
          headers: {
            access_token: localStorage.access_token,
          },
        });
        // console.log(data, '<<< fetchCat');
        this.categories = data.categories;
      } catch (err) {
        console.log(err);
      }
    },
    async createCat(name) {
      try {
        const { data } = await axios({
          url: '/categories',
          method: 'post',
          data: {
            name,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchCategories();
        // console.log(data, '<<< createCat');
      } catch (err) {
        console.log(err);
      }
    },
    async updateCat(payload) {
      try {
        const { id, name } = payload;
        const { data } = await axios({
          url: `/categories/${id}`,
          method: 'put',
          data: {
            name,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchCategories();
        // console.log(data, '<<< updated');
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCat(id) {
      try {
        const { data } = await axios({
          url: `/categories/${id}`,
          method: 'delete',
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchCategories();
        // console.log(data, '<<< createCat');
      } catch (err) {
        console.log(err);
      }
    },
    async createTask(task) {
      try {
        const { data } = await axios({
          url: '/tasks',
          method: 'post',
          data: {
            title: task.title,
            CategoryId: task.CategoryId,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchTasks();

        // console.log(data, '<<< createTask');
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTasks() {
      try {
        const { data } = await axios({
          url: '/tasks',
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.tasks = data.tasks;
        // console.log(data, '<<< fetchTasks');
      } catch (err) {
        console.log(err);
      }
    },
    async updateTask(payload) {
      try {
        // console.log({ payload });
        const { id, title } = payload;
        const { data } = await axios({
          url: `/tasks/${id}`,
          method: 'put',
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            title,
          },
        });
        this.fetchTasks();
        // console.log(data, '<<< updated');
      } catch (err) {
        console.log(err.response.data.errors.msg[0].msg);
      }
    },
    async updateTaskCategory(payload) {
      try {
        const { id, CategoryId } = payload;
        const { data } = await axios({
          url: `/tasks/${id}/cat`,
          method: 'put',
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            CategoryId,
          },
        });
        this.fetchTasks();
        // console.log(data, '<<< updated cat');
      } catch (err) {
        console.log(err.response.data.errors.msg[0].msg);
      }
    },
    async deleteTask(id) {
      try {
        const { data } = await axios({
          url: `/tasks/${id}`,
          method: 'delete',
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchTasks();
        // console.log(data, '<<< deleteTasks');
      } catch (err) {
        console.log(err.response.data.errors.msg[0].msg);
      }
    },
    logout() {
        // const auth2 = gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function() {
        //   console.log('User signed out.');
        // });
        localStorage.clear();
        this.setPage('loginPage');
    },
  },
  created() {
    this.homePage();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

#app {
  font-family: 'Roboto', sans-serif !important;
}

div {
  margin: 0 !important;
  padding: 0 !important;
}

.btn-primary {
  background-color: #ff5722 !important;
  border-color: #dd2c00 !important;
}

.btn-primary-outline {
  border-color: #ff5722 !important;
  border: 2px;
}

.text-primary {
  color: #ff5722 !important;
}

.bg-primary {
  background-color: #ff5722 !important;
}

input {
  border-color: #ffc7c7 !important;
  color: #ff5722 !important;
}

input::placeholder {
  font-weight: 200;
}

#welcome-page {
  background-image: url('./assets/img-login.svg');
  background-size: 120vh;
  background-repeat: no-repeat;
  background-position: top right;
  background-color: #fafafa;
}
</style>
