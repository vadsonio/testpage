import Vue from 'vue'
import App from './App.vue'
//router
import router from './router';
//store
import store from './store';
//normalize
import 'normalize.css'
//bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//flags
import CountryFlag from 'vue-country-flag';
//fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
//slick css
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
//localization
import { i18n } from './localization/i18n';


Vue.component('country-flag', CountryFlag);



Vue.config.productionTip = false;

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
