//import i18n from './../assets/i18n/lang'
const state = {
  /*

  lang: 1 // 1-ru, 2- uzkr, 3-ru, 4-uzkr   --> 3-uz, 4-en
*/
};

const getters = {
  /*

  getLang() {
    return state.lang
  }
*/
};

const mutations = {
  /*

  setLang(lang) {
    state.lang = lang;
  }
*/
};

const actions = {
  /*
  setLang({
    commit
  }, lang) {
    i18n.locale = lang;
    switch (lang) {
      case 'ru':
        commit("setLang", 1);
        break;
      case 'uzkr':
        commit("setLang", 2);
        break;
      case 'uz':
        commit("setLang", 3);
        break;
      case 'en':
        commit("setLang", 4);
        break;

      default:
        commit("setLang", 1);
        break;
    }
  }
  */
};

export const common = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
