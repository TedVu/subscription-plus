import { About, HomePage, Profile, Add } from '../pages';
import * as VueRouter from 'vue-router';
import Login from '../pages/Login/Login.vue';

const routes = [
  { path: '/about', component: About },
  { path: '/', component: HomePage },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login },
  { path: '/add', component: Add },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export { router };
