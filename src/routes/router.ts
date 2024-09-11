import { About, HomePage, Profile, Add, Reminder, NotFound } from "../pages";
import * as VueRouter from "vue-router";
import { Login } from "@pages";
import { useAuthentication } from "../composables";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

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
  const { isAuthenticated, signIn } = useAuthentication();

  const auth = getAuth();

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");

    signInWithEmailLink(auth, email ?? "", window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        // You can access the new user by importing getAdditionalUserInfo
        // and calling it with result:
        // getAdditionalUserInfo(result)
        // You can access the user's profile via:
        // getAdditionalUserInfo(result)?.profile
        // You can check if the user is new or existing:
        // getAdditionalUserInfo(result)?.isNewUser
        signIn(result.user);
      })
      .catch(() => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  } else {
    if (
      (to.path === RoutesEnum.LOGIN || to.path === RoutesEnum.DEFAULT) &&
      isAuthenticated
    ) {
      return RoutesEnum.HOME;
    }
    if (!isAuthenticated && to.path !== RoutesEnum.LOGIN) {
      return RoutesEnum.LOGIN;
    }
  }
});

export { router, RoutesEnum };
