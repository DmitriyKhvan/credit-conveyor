import TokenService from "./../services/storage.service";
import ApiService from "./../services/api.service";
import DictService from './../services/dict.service';
import SocketService from './../services/socket.service'
import store from './../store/index';

const MainService = {

  loadAllPageRefresh() {
    return new Promise(async (resolve, reject) => {
      let accessToken = await TokenService.getToken();
      ApiService.setHeader(accessToken);
      store.dispatch("auth/setUserDetails", accessToken);
      //store.dispatch("common/setLang", 'ru');

      await DictService.loadAll();
      //SocketService.runConnection(store.getters["auth/userId"]); // save user id to redis socket
      store.dispatch("auth/loginSuccess", accessToken);
      // ApiService.mount401Interceptor();
      resolve(true);
    })
  },
  clearStorage() {
    return new Promise(async (resolve, reject) => {

      if (await TokenService.isTokenExist()) {
        TokenService.removeToken();
        console.log("token cleared")
      }
      //if (await TokenService.isCookieExist("lang")) {
      TokenService.removeKeyFromCookies("lang");
      console.log("lang cleared")
      //}
      // if (await TokenService.isKeyExist("menus")) {
      TokenService.removeKey("menus");
      console.log("menus cleared")
      // }

      console.log(true)
      resolve(true);
    })
  }

};

export default MainService;
