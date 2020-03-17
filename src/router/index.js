import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "@/services/storage.service";
import MainService from "@/services/main.service"; //"/services/main.service";
import ApiService from '@/services/api.service';
import routes from "./routes";
import store from '@/store/index';
import CommonUtils from "@/shared/utils/CommonUtils";
import {
  AuthService
} from "@/services/auth.service";

Vue.use(VueRouter);

const router = new VueRouter({
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes,
  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

router.beforeEach(async (to, from, next) => {

  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);

  const isLoggedIn = !(await TokenService.isTokenExpired());

  if (!isPublic && !isLoggedIn) {
    //AuthService.logout();
    await MainService.clearStorage();
    return next({
      path: "/login",
      query: {
        redirect: to.fullPath
      } // Store the full path to redirect the user to after login
    });

  }

  //* Once Logged In
  if (isLoggedIn && from.path == '/login') {
    console.log('mount once log in')
    ApiService.mount401Interceptor();
  }

  //!!! Don't Change
  if (isLoggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  //* page refresh call
  if (isLoggedIn && !store.getters["dicts/isAllSet"]) {
    ApiService.mount401Interceptor(); //
    // reloads all Dicts
    await MainService.loadAllPageRefresh();
  }

  //!! LAST
  //* check router path by user role
  if (isLoggedIn) {
    if (await TokenService.isKeyExist('menus')) {
      let menus = JSON.parse(decodeURIComponent(escape(window.atob(await TokenService.getKey('menus')))));
      if (!CommonUtils.isValueExistInObject(menus, 'url', to.path)) {
        if (to.path !== '/404')
          return next('/404')
      }
    } else {
      AuthService.logout();
    }
  }
  next();
});

export default router;
