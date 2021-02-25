import CreditSettingsService from "../../services/creditSettings.service";
import sortData from "@/pages/main/universalManager/filters/sortData"

export const creditSettings = {
  namespaced: true,
  state: {
    creditSettingsService: new CreditSettingsService(),
    allRefs: null,
    filialsAllowSalary: [],
    addEditFilials: [],
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
        let responce = null
        if (!payload.tableName) {
          responce = await state.creditSettingsService.removeFilialsAllowSalary(payload.mfo)
          console.log('res', responce)
          if ( responce.code == 1 ) {
            commit("removeFilialsAllowSalary", payload.mfo)
          } else {
            throw responce
          }
        } else {
          responce = await state.creditSettingsService.removeItem(payload)
          console.log('res', responce)
          if ( responce.code == 1 ) {
            commit("removeItem", payload)
          } else {
            throw responce
          }
        }
        
        return responce
      } catch(error) {
        console.log(error)
        throw error
      }
    },

    async getFilialsAllowSalary({state, commit}) {
      try {
        const responce = await state.creditSettingsService.getFilialsAllowSalary()
        if (responce.length) {
          commit("setFilialsAllowSalary", responce)
        }
      } catch(error) {
        console.log(error)
        throw error
      }
    },

    async updateFilialsAllowSalary({state, dispatch}, addEditFilials) {
      console.log('addEditFilials', addEditFilials)
      try {
        const responce = await state.creditSettingsService.updateFilialsAllowSalary(addEditFilials);

        if ( responce.code == 1 ) {
          state.addEditFilials = []
          dispatch("getFilialsAllowSalary")
        } else {
          throw responce
        }

        return responce
      } catch(error) {
        console.log(error)
        throw error
      }
    }, 

    async getINPSSalaryInput({state}, creditId) {
      try {
        const responce = await state.getINPSSalaryInput(creditId)
        return responce
      } catch(error) {
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

    removeFilialsAllowSalary(state, mfo) {
      const idx = state.filialsAllowSalary.findIndex(i => i.mfo === mfo)
      state.filialsAllowSalary.splice(idx, 1)
    },

    setSettings(state, settings) {
      state.settings = settings;
    }, 

    setRefs(state, refs) {
      state.allRefs = Object.assign({}, state.allRefs, refs);
      console.log("currentRefs", refs);
      console.log("AllRefs", state.allRefs);
    },

    setFilialsAllowSalary(state, filialsAllowSalary) {
      state.filialsAllowSalary = filialsAllowSalary
    }
  },
  getters: {
    maxSumScorCardBall: state => {
      // debugger
      // const settings = JSON.parse(JSON.stringify(state.settings))

      return Object.keys(state.settings)
                      .filter(key => !key.indexOf('APPCARD') && key.indexOf('APPCARD_SCOREKOEFFICIENT') && key.indexOf('APPCARD_MODEL'))
                      .map(key => {
                        if (state.settings[key]) {
                          // debugger
                          let sortBy = 'score'
                          // if (key == 'APPCARD_SCOREKOEFFICIENT') {
                          //   sortBy = 'coefficient'
                          // }
                          return (
                                  sortData(state.settings[key].slice(), sortBy)
                                  )
                                  .slice(-1)[0]
                        }
                      })
                      .reduce((sum, current) => {
                        if (current) {
                          // debugger
                          // return sum + +current.score || sum + +current.coefficient
                          return sum + +current.score
                        } 
                        return sum
                      }, 0)
    }
  }
};
