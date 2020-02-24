import ApiService from "./../services/api.service";
import TokenService from "./../services/storage.service";
import store from './../store/index';
import router from './../router/index';
import DictService from "./dict.service";
import SocketService from "./socket.service";

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}
const AuthService = {
  login: async function (credentials, callback) {
    store.dispatch("auth/loginRequest");
    try {
      const token = await this.authenticate(
        credentials.username,
        credentials.password
      );
      if (token) {
        store.dispatch("auth/setUserDetails", token);
        store.dispatch("common/setLang", credentials.lang.value); // set lang
        TokenService.setKeyToCookies("lang", credentials.lang.value); // store lang in cookie so once page updated it doesnt loose lang selected in login page
        await DictService.loadAll();
        store.dispatch("auth/loginSuccess", token);

        //SocketService.runConnection(store.getters["auth/userId"]); // save user id to redis socket

        ApiService.mount401Interceptor();
        router.push(router.history.current.query.redirect || "/");
        callback(true);
      } else {
        store.dispatch("auth/loginError", {
          errorCode: 500,
          errorMessage: "Can't get token"
        });
        callback(false);
      }
    } catch (e) {
      if (e instanceof AuthenticationError) {
        store.dispatch("auth/loginError", {
          errorCode: e.errorCode,
          errorMessage: e.message
        });
      }
      callback(false);
    }
  },

  authenticate: function (username, password) {
    return new Promise(async (resolve, reject) => {
      const requestData = {
        method: "post",
        url: "auth/login",
        data: {
          username,
          password
        }
      };
      try {
        const response = await ApiService.customRequest(requestData);
        TokenService.saveToken(response.data.access_token);
        ApiService.setHeader(response.data.access_token);
        resolve(response.data.access_token);
      } catch (error) {
        reject(error);
        if (error.response) {
          throw new AuthenticationError(
            error.response.status,
            error.response.data.detail
          );
        } else {
          throw new AuthenticationError(
            401,
            error.message
          );
        }
      }
    });
  },

  logout: function () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.clearTokenFromCache(store.getters['auth/token']);
        TokenService.removeToken();
        ApiService.removeHeader();
        TokenService.removeKeyFromCookies("lang")
        ApiService.unmount401Interceptor();

        store.dispatch("auth/logoutSuccess");
        //store.dispatch("dicts/setIsAllSet", false);
        //SocketService.stopConnection();
        await router.push("/login");
        resolve(true);
      } catch (err) {
        reject(null)
      }
    });
  },

  refreshToken() {

    //const token = UserService.refreshToken();
    if (!store.getters["auth/refreshTokenPromise"]) {
      const p = this.refreshAccessToken();
      store.dispatch("auth/refreshTokenPromise", p);

      // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
      // Clear the promise on error as well.
      p.then(
        response => {
          store.dispatch("auth/refreshTokenPromise", null);
          store.dispatch("auth/loginSuccess", response);
        },
        error => {
          store.dispatch("auth/refreshTokenPromise", null);
          throw new AuthenticationError(
            error.response.status,
            error.response.data.detail
          );
        }
      );
    }

    return store.getters["auth/refreshTokenPromise"];
    //commit('setToken', token);
  },

  refreshAccessToken: function () {
    return new Promise(async (resolve, reject) => {

      const accessToken = TokenService.getToken(); //  get accesToken from cookie

      const requestData = {
        method: "post",
        url: "auth/token",
        data: {
          accessToken: accessToken
        }
      };

      try {
        const response = await ApiService.customRequest(requestData);
        TokenService.saveToken(response.data.access_token);
        //TokenService.saveRefreshToken(response.data.refresh_token)
        // Update the header in ApiService
        ApiService.setHeader(response.data.access_token);
        resolve(response.data.access_token);
      } catch (error) {
        reject(null);
        throw new AuthenticationError(
          error.response.status,
          error.response.data.detail
        );
      }
    });
  },
  clearTokenFromCache(token) {
    return new Promise(async (resolve, reject) => {
      const requestData = {
        method: "delete",
        url: "auth/token",
        data: {
          token: token
        }
      };
      try {
        const response = await ApiService.customRequest(requestData);
        resolve(response.status);
      } catch (error) {
        reject(null);
        throw new AuthenticationError(
          error.response.status,
          error.response.data.detail
        );
      }
    });
  }
};

export {
  AuthService,
  AuthenticationError
};
