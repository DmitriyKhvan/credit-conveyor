// import axios from 'axios'

const state = {
  tabsIndex: 1

}
const mutations = {
  setTabsIndex (state, payload) {
    state.tabsIndex = payload
  }

}
const actions = {
  async alterTabsIndex ({ commit }, payload) {
    try {
      commit('setTabsIndex', payload)
    } catch (e) {
      throw e
    }
  }

}
const getters = {

  getTabsIndex: state => {
    return state.tabsIndex
  }

}

export const instruction = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
