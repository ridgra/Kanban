import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive';

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  },
  GoogleSignInButton,
}).$mount('#app');
