const TOKEN_KEY = "access_token";
const MENU_LIST = "menu_list";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/

import jwt_decode from 'jwt-decode';
import {
  Cookies
} from 'quasar'

const TokenService = {

  getKey(key) {
    return localStorage.getItem(key)
  },
  setKey(key, value) {
    localStorage.setItem(key, value);
  },
  removeKey(key) {
    localStorage.removeItem(key)
  },
  isKeyExist(key) {
    return (Boolean)(localStorage.getItem(key) !== null);
  },
  getKeyFromCookies(key) {
    return Cookies.get(key)
  },
  setKeyToCookies(key, value) {
    Cookies.set(key, value);
  },
  removeKeyFromCookies(key) {
    Cookies.remove(key)
  },
  isCookieExist(key) {
    return (Boolean)(Cookies.has(key));
  },
  getToken() {
    return Cookies.get(TOKEN_KEY);
  },
  saveToken(accessToken) {
    Cookies.set(TOKEN_KEY, accessToken);
  },
  removeToken() {
    Cookies.remove(TOKEN_KEY);
  },
  isTokenExist() {
    return (Boolean)(Cookies.has(TOKEN_KEY));
  },

  isTokenExpired() {
    if (this.isTokenExist()) {
      let decodedToken = jwt_decode(this.getToken());
      if (Math.floor(Date.now() / 1000) > decodedToken.life_time) {
        return true;
      } else return false;

    } else return true;
  }

};

export default TokenService;
