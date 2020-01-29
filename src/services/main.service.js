import TokenService from "./../services/storage.service";
import ApiService from "./../services/api.service";
import DictService from './../services/dict.service';
import SocketService from './../services/socket.service'
import store from './../store/index';

const MainService = {

  loadAllPageRefresh() {
    return new Promise(async (resolve, reject) => {
      let accessToken = TokenService.getToken();
      ApiService.setHeader(accessToken);
      store.dispatch("auth/setUserDetails", accessToken);
      //store.dispatch("common/setLang", 'ru');

      await DictService.loadAll();
      //SocketService.runConnection(store.getters["auth/userId"]); // save user id to redis socket
      store.dispatch("auth/loginSuccess", accessToken);
      // ApiService.mount401Interceptor();
      resolve(true);
    })

  }

};

export default MainService;
