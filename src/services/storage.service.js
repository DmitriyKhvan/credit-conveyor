const TOKEN_KEY = "access_token";
const MENU_LIST = "menu_list";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
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
      res(val)
    })
  },
  setKey(key, value) {
    localStorage.setItem(key, value);
  },
  removeKey(key) {
    localStorage.removeItem(key)
  },
  isKeyExist(key) {
    return new Promise((res, rej) => {
      let isExist = (Boolean)(localStorage.getItem(key) !== null);
      res(isExist);
    });
  },
  getKeyFromCookies(key) {
    return new Promise((res, rej) => {
      let value = Cookies.get(key)
      res(value)
    });
  },
  setKeyToCookies(key, value) {
    Cookies.set(key, value);
  },
  removeKeyFromCookies(key) {
    Cookies.remove(key)
  },
  isCookieExist(key) {
    return new Promise((res, rej) => {
      res((Boolean)(Cookies.has(key)));
    });
  },
  getToken() {
    return new Promise((res, rej) => {
      let token = Cookies.get(TOKEN_KEY)
      res(token);
    });
  },
  saveToken(accessToken) {
    Cookies.set(TOKEN_KEY, accessToken);
  },
  removeToken() {
    Cookies.remove(TOKEN_KEY);
  },
  isTokenExist() {
    return new Promise((res, rej) => {
      let isExist = (Boolean)(Cookies.has(TOKEN_KEY));
      console.log(isExist)
      res(isExist);
    })
  },
  isTokenExpired() {
    return new Promise(async (res, rej) => {

      if (await this.isTokenExist()) {
        let decodedToken = decode(await this.getToken());
        if (decodedToken) {
          if (Math.floor(Date.now() / 1000) > decodedToken.life_time) {
            console.log(true)
            res(true);
          }
          else {
            console.log(false)
            res(false);
          }
        }
      } else {
        console.log(false)
        res(true);
      }
    });
  }
};

export default TokenService;
