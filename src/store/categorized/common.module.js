//import i18n from './../assets/i18n/lang'
const state = {
  lang: "ru", // 1-ru, 2- uz, 3-ru, 4-uzkr
  langNum: 2,
  isLoading: false,
  isLeftDrawerClosed: false,
  drawerHidden: false
};

const getters = {
  getLang(state) {
    return state.lang
  },
  getLangNum(state) {
    return state.langNum
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
  setLangNum(state, lang) {
    if (lang == "uz") {
      state.langNum = 0;
    } else if (lang == "ru") {
      state.langNum = 1;
    } else if (lang == "en") {
      state.langNum = 2;
    } else if (lang == "uzkr") {
      state.langNum = 3;
    } else {
      state.langNum = 1;
    }
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
    commit("setLangNum", lang);
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
