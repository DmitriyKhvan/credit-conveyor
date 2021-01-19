import CreditSettingsService from "../../services/creditSettings.service";

export const creditSettings = {
  namespaced: true,
  state: {
    creditSettingsService: new CreditSettingsService(),
    allRefs: null,
    settings: {
      APPCARD_AGE: [],
      APPCARD_BILLS: [],
      APPCARD_CHILDREN: [],
      APPCARD_LASTJOBPERIOD: [],
      APPCARD_LOANPERIOD: [],
      APPCARD_LOCATION: [],
      APPCARD_MARITAL: [],
      APPCARD_MODEL: null,
      APPCARD_POSITIVENBUHISTORY: [],
      APPCARD_RATINGCOMPANY: [],
      APPCARD_REALTY: [],
      APPCARD_SCOREKOEFFICIENT: [],
      APPCARD_VEHICLE: [],
      APP_SETTING: null,
      APP_SETTINGROLE: null,
      LOAN_PRODUCT_CHAR: [],
      LOANPRODUCT_FINSOURCE: [],
      LOANPRODUCT_LOANCODE: []
    },
    loanProductId: null,
  },
  actions: {
    async getSettings({ state, commit }) {
      try {
        const settings = await state.creditSettingsService.getSettings();
        // console.log("settings", JSON.stringify(settings, null, 2));
        if ( settings ) {
          commit("setSettings", settings);
        } else {
          throw "Не удалось получить данные!"
        }
      } catch (error) {
        console.log(error);
        throw error
      }
    },

    async updateSettings({state, dispatch, commit}, settings) {
      try {
        const responce = await state.creditSettingsService.updateSettings(settings);

        if ( responce.code == 1 ) {
          dispatch("getSettings")
        } else {
          throw responce
        }

        return responce
      } catch(error) {
        console.log(error)
        throw error
      }
    }, 

    async removeItem({state, commit}, payload) {
      console.log('payload', payload)
      try {
        const responce = await state.creditSettingsService.removeItem(payload)
        console.log('res', responce)
        if ( responce.code == 1 ) {
          commit("removeItem", payload)
        } else {
          throw responce
        }
        return responce
      } catch(error) {
        console.log(error)
        throw error
      }
    }
  },
  mutations: {
    removeItem(state, payload) {
      console.log('payload', payload)
      const idx = state.settings[payload.tableName].findIndex(i => i.id == payload.rowId)
      state.settings[payload.tableName].splice(idx, 1)
    },

    setSettings(state, settings) {
      state.settings = settings;
    }, 

    setRefs(state, refs) {
      state.allRefs = Object.assign({}, state.allRefs, refs);
      console.log("currentRefs", refs);
      console.log("AllRefs", state.allRefs);
    }
  },
  getters: {}
};
