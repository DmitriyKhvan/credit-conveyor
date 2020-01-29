import jwt_decode from "jwt-decode";
// import SocketService from "../services/socket.service";
// import AuthService from "./../services/auth.service";

/**
 *  States
 */

const state = {
  authenticating: false,
  accessToken: null,
  authenticationErrorCode: 0,
  authenticationError: null,
  refreshTokenPromise: null,
  username: null,
  userId: null,
  fullName: null,
};

/**
 *  Getters
 */

const getters = {
  loggedIn: state => {
    return state.accessToken ? true : false;
  },
  authenticationErrorCode: state => {
    return state.authenticationErrorCode;
  },
  authenticationError: state => {
    return state.authenticationError;
  },
  authenticating: state => {
    return state.authenticating;
  },
  fullName: state => {
    return state.fullName
  },
  userId: state => {
    return state.userId
  },
  username: state => {
    return state.username
  },
  userDetails: state => {
    return {
      username: state.username,
      userId: state.userId,
      fullName: state.fullName
    }
  },
  refreshTokenPromise: state => {
    return state.refreshTokenPromise;
  }
};

/**
 *   Actions
 */
const actions = {

  loginRequest({
    commit
  }) {
    commit("loginRequest");
  },
  loginSuccess({
    commit
  }, token) {
    commit("loginSuccess", token);
  },
  setCurrenUser({
    commit
  }, token) {
    commit("setCurrenUser", token);
  },
  loginError({
    commit
  }, error) {
    commit("loginError", {
      errorCode: error.errorCode,
      errorMessage: error.errorMessage
    })
  },
  refreshTokenPromise({
    commit
  }, promise) {
    commit("refreshTokenPromise", promise)
  },
  logoutSuccess({
    commit
  }) {
    commit("logoutSuccess");
  },

  setUserDetails({
    commit
  }, token) {
    let details = {
      username: jwt_decode(token).username,
      userId: jwt_decode(token).id,
      fullName: jwt_decode(token).full_name,
    }
    commit("setUsername", details.username);
    commit("setUserId", details.userId);
    commit("setUserFullname", details.fullName);
  },

  //   logout({
  //     commit
  //   }) {
  //     UserService.logout();
  //     TokenService.removeMenuList();

  //     commit("logoutSuccess");
  //     SocketService.stopConnection();
  //     router.push("/login");
  //   },

  //   refreshToken({
  //     commit,
  //     state
  //   }) {
  //     //   const token = UserService.refreshToken();
  //     if (!state.refreshTokenPromise) {
  //       const p = UserService.refreshToken();
  //       commit("refreshTokenPromise", p);

  //       // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
  //       // Clear the promise on error as well.
  //       p.then(
  //         response => {
  //           commit("refreshTokenPromise", null);
  //           commit("loginSuccess", response);
  //           SocketService.runConnection(jwtDecode(state.accessToken).user_id); // connects to socket
  //         },
  //         error => {
  //           commit("refreshTokenPromise", null);
  //           SocketService.stopConnection();
  //         }
  //       );
  //     }

  //     return state.refreshTokenPromise;
  //     //commit('setToken', token);
  //   }

};

/**
 *  Mutations 
 */
const mutations = {

  loginRequest(state) {
    state.authenticating = true;
    state.authenticationError = "";
    state.authenticationErrorCode = 0;
  },
  loginSuccess(state, accessToken) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },
  loginError(state, {
    errorCode,
    errorMessage
  }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },
  logoutSuccess(state) {
    state.accessToken = "";
  },
  setToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  refreshTokenPromise(state, promise) {
    state.refreshTokenPromise = promise;
  },
  // REVIEW  All UserDetails can be mutated at once
  setUsername(state, username) {
    state.username = username;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setUserFullname(state, fullName) {
    state.fullName = fullName;
  }

};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
