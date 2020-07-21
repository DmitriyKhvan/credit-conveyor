export default {
  state: {
    aViewTasks: false,
    aList: true,
    aMenu: 1,
  },
  mutations: {
    aChangeList(state, payload){
      state.aList = payload
    }
  },
  actions: {
    aChangeList({commit}, payload){
      commit('aChangeList', payload)
    }
  },
  getters: {

  }
}
