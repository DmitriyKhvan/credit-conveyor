import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "./../services/storage.service";
import MainService from "./../services/main.service"; //"/services/main.service";
import routes from "./routes";
import store from './../store/index';

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

  //const loggedIn = !!TokenService.getToken();
  const isLoggedIn = !TokenService.isTokenExpired();

  // console.log({
  //   isLogged: isLoggedIn
  // });
  // console.log(isPublic, onlyWhenLoggedOut, isLoggedIn);

  if (!isPublic && !isLoggedIn) {
    return next({
      path: "/login",
      query: {
        redirect: to.fullPath
      } // Store the full path to redirect the user to after login
    });
  }
  if (isLoggedIn && onlyWhenLoggedOut) {
    //TODO call load functions

    return next("/");
  }
  // page refresh call
  if (!store.getters["dicts/isAllSet"]) {
    if (!TokenService.isTokenExpired()) {
      await MainService.loadAllPageRefresh();
    }
  }

  next();

});

export default router;
