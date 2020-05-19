export default {
  state: {
      menuId: 0
  },
  mutations: {
      setMenuId(state, payload){
          state.menuId = payload
      }
  },
  actions: {
      setMenuId ({commit}, id) {
        commit('setMenuId', id)
      }
  },
  getters: {
      getMenuId (state) {
          return state.menuId
      }
  }

}
