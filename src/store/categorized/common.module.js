//import i18n from './../assets/i18n/lang'
const state = {
  lang: "ru", // 1-ru, 2- uzkr, 3-ru, 4-uzkr   --> 3-uz, 4-en
  isLoading: false,
  isLeftDrawerClosed: false
};

const getters = {
  getLang(state) {
    return state.lang
  },
  isLoading(state) {
    return state.isLoading;
  },
  isLeftDrawerClosed(state) {
    return state.isLeftDrawerClosed;
  }
};

const mutations = {

  setLang(state, lang) {
    state.lang = lang;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setLeftDrawerClosed(state, isClosed) {
    state.isLeftDrawerClosed = isClosed;
  }

};

const actions = {
  setLoading({
    commit
  }, isLoading) {
    commit("setLoading", isLoading);
  },
  setLang({
    commit
  }, lang) {
    commit("setLang", lang);
  },
  setLeftDrawerClosed({
    commit
  }, isClosed) {
    commit("setLeftDrawerClosed", isClosed)
  }
};

export const common = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
