import CreditSettingsService from "../../services/creditSettings.service";

export const creditSettings = {
  namespaced: true,
  state: {
    creditSettingsService: new CreditSettingsService(),
    allRefs: null,
    settings: {
      app_card_age: [],
      app_card_bills: [],
      app_card_children: [],
      app_card_last_job_period: [],
      app_card_loan_period: [],
      app_card_location: [],
      app_card_marital: [],
      app_card_model: null,
      app_card_positive_nbu_history: [],
      app_card_rating_company: [],
      app_card_reality: [],
      app_card_score_coefficient: [],
      app_card_vehicle: [],
      app_setting: null,
      app_setting_role: null,
      loan_product_char: [],
      loan_product_financial_source: [],
      loan_product_loan_code: []
    },
    loanProductId: null,
  },
  actions: {
    async getSettings({ state, commit }) {
      try {
        const settings = await state.creditSettingsService.getSettings();
        // console.log("settings", JSON.stringify(settings, null, 2));
        if (settings) {
          commit("setSettings", settings);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateSettings({state, dispatch, commit}, settings) {
      try {
        const response = await state.creditSettingsService.updateSettings(settings);

        if (response) {
          dispatch("getSettings")
        }
      } catch(error) {
        console.log(error)
      }
    }, 

    async removeItem({state, commit}, payload) {
      try {
        // const responce = await state.creditSettingsService.removeItem(payload)
        // if(response) {
          commit("removeItem", payload)
        // }
      } catch(error) {
        console.log(error)
      }
    }
  },
  mutations: {
    removeItem(state, payload) {
      const idx = state.settings[payload.tableName].findIndex(i => i.id == payload.idItem)
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
