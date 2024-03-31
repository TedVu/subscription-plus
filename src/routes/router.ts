import { About, HomePage, Profile, Add } from '../pages';
import * as VueRouter from 'vue-router';
import Login from '../pages/Login/Login.vue';
import { useAuthentication } from '../composables';
import { storeToRefs } from 'pinia';

const routes = [
  { name: 'about', path: '/about', component: About },
  { name: 'home', path: '/home', component: HomePage },
  { name: 'profile', path: '/profile', component: Profile },
  { name: 'login', path: '/login', component: Login, alias: '/' },
  { name: 'add', path: '/add', component: Add },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const { isAuthenticated } = storeToRefs(useAuthentication());
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.path !== '/login'
  ) {
    // redirect the user to the login page
    return '/login';
  }
});

export { router };
