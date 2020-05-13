import ApiService from "@/services/api.service";

export const creditsAdmin = {
  namespaced: true,
  state: {
    filials: []
  },
  actions: {
    async getFilials({ commit }) {
      try {
        let { data } = await ApiService.get("/structure/branches");
        console.log("filials", data[0].children);
        if (data[0].children.length) {
          commit("setFilials", data[0].children);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setFilials(state, filials) {
      const filialsSort = [];
      function parseFilial(filials) {
        for (let filial of filials) {
          filialsSort.push(filial);
          if (filial.children) {
            parseFilial(filial.children);
          }
        }
        return filialsSort;
      }

      state.filials = parseFilial(filials).map(i => {
        return {
          label: i.DEPARTMENT_NAME1,
          value: i.FILIAL,
          class: i.lvl === 1 ? "parent" : "child"
        };
      });
    }

  },
  getters: {
    getFilials: state => state.filials
  }
};
