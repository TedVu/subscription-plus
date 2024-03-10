import { About, HomePage, Profile, Add } from '../pages';
import * as VueRouter from 'vue-router';

const routes = [
  { path: '/about', component: About },
  { path: '/', component: HomePage },
  { path: '/profile', component: Profile },
  { path: '/add', component: Add },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export { router };
