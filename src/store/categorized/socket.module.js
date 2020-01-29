//import io from "socket.io-client";

const state = {
  socket: 0, //io("localhost:4000"),
  socketCount: 0,
  isOnline: false
};

const getters = {
  getSocket(state) {
    return state.socket;
  },
  getUsersCount(state) {
    return state.socketCount;
  },
  isOnline(state) {
    return state.isOnline;
  }
};

const mutations = {
  setSocket(state, socket) {
    state.socket = socket;
  },
  setUserCount(state, count) {
    state.socketCount = count;
  },
  setOnline(state, isOnline) {
    state.isOnline = isOnline;
  }
};

const actions = {
  setUserCount({
    commit
  }, count) {
    commit("setUserCount", count);
  },
  setOnline({
    commit
  }, isOnline) {
    commit("setOnline", isOnline);
  }
};

export const socket = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
