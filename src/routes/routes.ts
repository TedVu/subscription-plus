import About from '../pages/About.vue';
import * as VueRouter from 'vue-router';

const routes = [{ path: '/about', component: About }];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

export { router };
