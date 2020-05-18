import { decode } from "jsonwebtoken";

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
  empId: null,
  fullName: null,
  userRoles: [],
  moderatorsList: [],
  branchCode: null,
  filialCode: null,
  activeUsers: [
  ],
  isUserLogged: false,
  logoutTime: 600000 // 10min
};

/**
 *  Getters
 */

const getters = {
  logoutTime: state => {
    return state.logoutTime;
  },
  loggedIn: state => {
    return state.isUserLogged;
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
    return state.fullName;
  },
  empId: state => {
    return state.empId;
  },
  username: state => {
    return state.username;
  },
  userDetails: state => {
    return {
      username: state.username,
      userId: state.userId,
      fullName: state.fullName
    };
  },
  refreshTokenPromise: state => {
    return state.refreshTokenPromise;
  },
  token: state => {
    return state.accessToken;
  },
  userRoles: state => {
    return state.userRoles;
  },
  moderatorsList: state => {
    return state.moderatorsList;
  },
  branchCode: state => {
    return state.branchCode;
  },
  filialCode: state => {
    return state.filialCode;
  },
  activeUsers: state => {
    return state.activeUsers
  }
};

/**
 *   Actions
 */
const actions = {
  loginRequest({ commit }) {
    commit("loginRequest");
  },
  loginSuccess({ commit }, token) {
    commit("loginSuccess", token);
  },
  setCurrenUser({ commit }, token) {
    commit("setCurrenUser", token);
  },
  loginError({ commit }, error) {
    commit("loginError", {
      errorCode: error.errorCode,
      errorMessage: error.errorMessage
    });
  },
  refreshTokenPromise({ commit }, promise) {
    commit("refreshTokenPromise", promise);
  },
  logoutSuccess({ commit }) {
    commit("logoutSuccess");
  },
  setUserLogged({ commit }) {
    commit("setUserLogged");
  },
  setUserDetails({ commit }, token) {
    let decodedToken = decode(token);

    let details = {
      username: decodedToken.username,
      fullName: decodedToken.full_name,
      empId: decodedToken.emp_id
    };
    commit("setUsername", details.username);
    commit("setUserFullname", details.fullName);
    commit("setEmpId", details.empId);
  },
  setUserRoles({ commit }, roles) {
    commit("setUserRoles", roles);
  },
  setModeratorsList({ commit }, moderatorsList) {
    commit("setModeratorsList", moderatorsList);
  },
  setBranchCode({ commit }, branchCode) {
    commit("setBranchCode", branchCode);
  },
  setFilialCode({ commit }, filialCode) {
    commit("setFilialCode", filialCode);
  },
  setActiveUsers({ commit }, user) {
    commit("setActiveUsers", user);
  },
  disconnectActiveUser({ commit }, socketId) {
    commit("disconnectActiveUser", socketId);
  },
  removeActiveUser({ commit }, index) {
    commit("removeActiveUser", index)
  }
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
    state.isUserLogged = true;
  },
  loginError(state, { errorCode, errorMessage }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },
  logoutSuccess(state) {
    state.accessToken = "";
    state.isUserLogged = false;
  },
  setToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  refreshTokenPromise(state, promise) {
    state.refreshTokenPromise = promise;
  },
  setUserLogged(state) {
    state.isUserLogged = true;
  },
  // REVIEW  All UserDetails can be mutated at once
  setUsername(state, username) {
    state.username = username;
  },
  setEmpId(state, empId) {
    state.empId = empId;
  },
  setUserFullname(state, fullName) {
    state.fullName = fullName;
  },
  setUserRoles(state, userRoles) {
    state.userRoles = userRoles;
  },
  setModeratorsList(state, moderatorsList) {
    state.moderatorsList = moderatorsList;
  },
  setBranchCode(state, branchCode) {
    state.branchCode = branchCode;
  },
  setFilialCode(state, filialCode) {
    state.filialCode = filialCode;
  },
  setActiveUsers(state, user) {
    state.activeUsers.push(user);
  },
  disconnectActiveUser(state, socketId) {
    let usrs = state.activeUsers;
    for (let i = 0; i < usrs.length; i++) {
      if (usrs[i].socket_id == socketId) {
        usrs.splice(i, 1);
        break;
      }
    }
  },
  removeActiveUser(state, index) {
    let usrs = state.activeUsers;
    usrs.splice(index, 1);
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
