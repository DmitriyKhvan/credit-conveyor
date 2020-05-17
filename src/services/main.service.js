import TokenService from "@/services/storage.service";
import ApiService from "@/services/api.service";
import DictService from '@/services/dict.service';
import SocketService from '@/services/socket.service'
import store from '@/store/index';
import LoadingService from "./loading.service";

const MainService = {

  loadAllPageRefresh() {
    return new Promise(async (resolve, reject) => {
      LoadingService.showLoadingHourGlass();

      // getting token from store
      let accessToken = await TokenService.getToken();

      //setting axios header
      ApiService.setHeader(accessToken);

      // setting token to store
      store.dispatch("auth/setUserDetails", accessToken);

      // getting lang val from localStorage
      let lang = await TokenService.getKey("lang");

      // if lang exist set it in store otherwise give default values
      if (lang) {
        store.dispatch("common/setLang", lang);
      }
      else {
        TokenService.replaceKey("lang", "ru");
        store.dispatch("common/setLang", lang);
      }

      // loading all dict vals from db and store in store
      await DictService.loadAll();

      // if menus deleted or not exist
      let menus = await TokenService.getKey("menus");
      if (menus == null) {
        let b64EncodedMenus = btoa(
          unescape(
            encodeURIComponent(
              JSON.stringify(store.getters["dicts/getMenuList"])
            )
          )
        );
        TokenService.replaceKey("menus", b64EncodedMenus);
      }

      // run socket connection
      SocketService.runConnection(); // save emp id to redis socket
      store.dispatch("auth/loginSuccess", accessToken);
      // ApiService.mount401Interceptor();
      LoadingService.hideLoading();
      resolve(true);
    })
  },
  clearStorage() {
    return new Promise(async (resolve, reject) => {
      if ((await TokenService.isTokenExist())) {
        console.log("removing token")
        TokenService.removeToken();
      }
      if ((await TokenService.isCookieExist("lang"))) {
        TokenService.removeKeyFromCookies("lang");
      }
      if (await TokenService.isKeyExist("menus")) {
        TokenService.removeKey("menus");
      }
      resolve(true);
    })
  }

};

export default MainService;
