//import i18n from './../assets/i18n/lang'
const state = {

  lang: "ru", // 1-ru, 2- uzkr, 3-ru, 4-uzkr   --> 3-uz, 4-en
  isLoading: false
};

const getters = {
  getLang(state) {
    return state.lang
  },
  isLoading(state) {
    return state.isLoading;
  }
};

const mutations = {

  setLang(state, lang) {
    state.lang = lang;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
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
  }
};

export const common = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
