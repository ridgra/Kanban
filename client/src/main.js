import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive';
import VueNotification from '@kugatsu/vuenotification';

Vue.config.productionTip = false;

Vue.use(VueNotification, {
  position: 'bottomRight'
});

new Vue({
  render: function(h) {
    return h(App);
  },
  GoogleSignInButton,
}).$mount('#app');
