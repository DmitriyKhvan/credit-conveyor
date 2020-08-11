import axios from "axios";
export default {
  state: {
    aViewTasks: false,
    isListView: true,
    aAllDocs: [],
    menuNo: 1,
    selectedDocs: [],
    aSuperiors: []
  },
  mutations: {
    selDoc(state, id) {
      // selVal
      if (state.selectedDocs.find(docId => docId === id)) {
        state.selectedDocs = state.selectedDocs.filter(docId => docId !== id);
      } else {
        state.selectedDocs.push(id);
      }
    },
    setIsListView(state, val) {
      state.isListView = val;
    },
    getADocs(state, payload) {
      state.aAllDocs = payload;
    },
    setMenuNo(state, num) {
      state.menuNo = num;
    },
    setSuperiors(state, payload) {
      state.aSuperiors = payload;
    }
  },
  actions: {
    selDoc({ commit }, id) {
      commit("selDoc", id);
    },
    async getAUser({ commit }, num) {
      try {
        const user = await axios.get(`/emps/info/${num}`);
        console.log(user);
      } catch (e) {
        throw e;
      }
    },
    async getADocs({ commit }, num) {
      try {
        const allData = await axios.get(`/tasks/pomoshnik/${num}`);
        console.log(allData.data);
        const docs = allData.data.data !== null ? allData.data.data : [];
        let superiors = [];
        if (allData.data.superiors) {
          allData.data.superiors.forEach(el => {
            superiors.push({
              label: el.name,
              value: el.emp_id,
              dep_code: el.dep_code
            });
          });
          commit("setSuperiors", superiors);
        }
        commit("setMenuNo", num);
        commit("getADocs", docs);
      } catch (e) {
        throw e;
      }
    },
    setIsListView({ commit }, payload) {
      commit("setIsListView", payload);
    }
  },
  getters: {}
};
