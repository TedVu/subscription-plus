import { About, HomePage, Profile, Add } from '../pages';
import * as VueRouter from 'vue-router';

const routes = [
  { path: '/about', component: About },
  { path: '/home', component: HomePage },
  { path: '/profile', component: Profile },
  { path: '/add-subscription', component: Add },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

export { router };
