const TOKEN_KEY = "access_token";
const MENU_LIST = "menu_list";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/

import jwt_decode from 'jwt-decode';

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

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isTokenExpired() {
    let isTokenExist = !!this.getToken();
    if (isTokenExist) {
      let decodedToken = jwt_decode(this.getToken());
      if (Math.floor(Date.now() / 1000) > (decodedToken.iat + decodedToken.life_time)) {
        return true;
      } else return false;

    } else return true;
  },

  getMenuList: function () {
    return localStorage.getItem(MENU_LIST);
  },
  saveMenuList(menu) {
    localStorage.setItem(MENU_LIST, JSON.stringify(menu));
  },
  removeMenuList() {
    localStorage.removeItem(MENU_LIST);
  },


};

export default TokenService;
