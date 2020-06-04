import ApiService from "@/services/api.service"
import NotifyService from "@/services/notify.service";

export const themes = {
  namespaced: true,
  state: {
    headerColor: "",
    footerColor: "",
    buttonColor: ""
  },
  actions: {
    async editThemes({commit}, settings) {
      try {
        const { data } = await ApiService.post('settings/user', settings)
        console.log('themes', data)
        if (data.status == 1) {
          commit("editThemes", settings)
          NotifyService.showSuccessMessage('Изменения применены');
        }
        //return data
      } catch(error) {
        console.log(error)
        NotifyService.showErrorMessage(error.toString());
      }
    }, 
    async getThemes({commit, rootGetters}) {
      try {
        const { data } = await ApiService.get(`settings/user?id=${rootGetters["auth/empId"]}`)
        console.log('themes', data)
        if (data.id) {
          commit("editThemes", data)
          //NotifyService.showSuccessMessage('Изменения применены');
        }
      } catch(error) {
        console.log(error)
        NotifyService.showErrorMessage(error.toString());
      }
    }
  },
  mutations: {
    editThemes(state, settings) {
      state.headerColor = settings.header
      state.footerColor = settings.footer
      state.buttonColor = settings.button
    }
  },
  getters: {
    themes: state => state
  }
}