import { About, HomePage, Profile, Add, Reminder, NotFound } from "../pages";
import * as VueRouter from "vue-router";
import { Login } from "@pages";
import { useAuthentication } from "../composables";

enum RoutesEnum {
  ABOUT = "/about",
  HOME = "/home",
  PROFILE = "/profile",
  LOGIN = "/login",
  DEFAULT = "/",
  ADD = "/add",
  REMINDER = "/reminder",
  NOTFOUND = "/not-found",
}

const routes = [
  { name: "about", path: RoutesEnum.ABOUT, component: About },
  { name: "home", path: RoutesEnum.HOME, component: HomePage },
  { name: "profile", path: RoutesEnum.PROFILE, component: Profile },
  { name: "login", path: RoutesEnum.LOGIN, component: Login, alias: "/" },
  { name: "add", path: RoutesEnum.ADD, component: Add },
  { name: "reminder", path: RoutesEnum.REMINDER, component: Reminder },
  { name: "not-found", path: "/:pathMatch(.*)*", component: NotFound },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { isAuthenticated } = useAuthentication();

  if (
    (to.path === RoutesEnum.LOGIN || to.path === RoutesEnum.DEFAULT) &&
    isAuthenticated
  ) {
    return RoutesEnum.HOME;
  }
  if (!isAuthenticated && to.path !== RoutesEnum.LOGIN) {
    return RoutesEnum.LOGIN;
  }
});

export { router, RoutesEnum };
