import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('./components/Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: ()=> import('./components/SearchResult.vue')
    },
    {
      path: '*',
      name: 'start',
      component: ()=> import('./components/Home.vue')
    }
  ]
});