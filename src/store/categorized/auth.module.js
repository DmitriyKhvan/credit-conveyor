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
  filialCode: null
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
    return state.fullName;
  },
  userId: state => {
    return state.userId;
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

  setUserDetails({ commit }, token) {
    let decodedToken = decode(token);

    let details = {
      username: decodedToken.username,
      userId: decodedToken.id,
      fullName: decodedToken.full_name,
      empId: decodedToken.emp_id
    };
    commit("setUsername", details.username);
    commit("setUserId", details.userId);
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
  },
  loginError(state, { errorCode, errorMessage }) {
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
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
