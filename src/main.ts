import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n/index';
import router from './router';
import store from './store/index';
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.filter('uppercase', (value: string) => {
  return value.toUpperCase();
});

Vue.filter('uppercaseFirstLetter', (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
