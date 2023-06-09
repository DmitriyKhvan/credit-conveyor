const TOKEN_KEY = "access_token";
const MENU_LIST = "menu_list";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/

import {
  decode
} from 'jsonwebtoken';
import {
  Cookies
} from 'quasar'

const TokenService = {

  getKey(key) {
    return new Promise((res, rej) => {
      let val = localStorage.getItem(key);
      res(val);
    })
  },
  setKey(key, value) {
    localStorage.setItem(key, value);
  },
  replaceKey(key, value) {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
  },
  removeKey(key) {
    localStorage.removeItem(key)
  },
  isKeyExist(key) {
    return new Promise((res, rej) => {
      // let isExist = (Boolean)(localStorage.getItem(key) !== null);
      res((Boolean)(localStorage.getItem(key) !== null));
    });
  },
  getKeyFromCookies(key) {
    return new Promise((res, rej) => {
      //let value = Cookies.get(key)
      let value = localStorage.getItem(key);
      res(value)
    });
  },
  setKeyToCookies(key, value) {
    //Cookies.set(key, value);
    localStorage.setItem(key, value);

  },
  removeKeyFromCookies(key) {
    //Cookies.remove(key)
    localStorage.removeItem(key)
  },
  isCookieExist(key) {
    return new Promise((res, rej) => {
      //let isCookieExist = (Boolean)(Cookies.has(key));
      let isCookieExist = (Boolean)(localStorage.getItem(key) !== null);
      res(isCookieExist);
    });
  },
  getToken() {
    return new Promise((res, rej) => {
      //let token = Cookies.get(TOKEN_KEY)
      let token = localStorage.getItem(TOKEN_KEY);
      res(token);
    });
  },
  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    //Cookies.set(TOKEN_KEY, accessToken);
  },
  removeToken() {
    //Cookies.remove(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY)
  },
  replaceToken(token) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.setItem(TOKEN_KEY, token);
  },
  isTokenExist() {
    return new Promise((res, rej) => {
      //let isExist = (Boolean)(Cookies.has(TOKEN_KEY));
      let isExist = (Boolean)(localStorage.getItem(TOKEN_KEY) !== null);
      res(isExist);
    })
  },
  isTokenExpired() {
    return new Promise(async (res, rej) => {

      if (await this.isTokenExist()) {
        let decodedToken = decode(await this.getToken());
        if (decodedToken) {
          if (Math.floor(Date.now() / 1000) > decodedToken.life_time) {
            res(true);
          } else {
            res(false);
          }
        }
      } else {
        res(true);
      }
    });
  }
};

export default TokenService;
