import CreditSettingsService from "../../services/creditSettings.service";

export const creditSettings = {
  namespaced: true,
  state: {
    creditSettingsService: new CreditSettingsService(),
    allRefs: null,
    settings: {
      appCardAge: [],
      appCardBills: [],
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
    }
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
    }
  },
  mutations: {
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
