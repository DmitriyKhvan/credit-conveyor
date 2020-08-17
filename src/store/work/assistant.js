import axios from "axios";
export default {
  state: {
    aViewTasks: false,
    isListView: true,
    aAllDocs: [],
    menuNo: 1,
    selectedDocs: [],
    aSuperiors: [],
    // pagination states
    page: 1, // default
    rowsPerPage: 5, // default
    totalPages: 0, // default
    totalRows: 0 // totalRows
  },
  mutations: {
    selDoc(state, doc) {
      // selVal
      if (state.selectedDocs.find(el => el.doc_id === doc.doc_id)) {
        state.selectedDocs = state.selectedDocs.filter(
          el => el.doc_id !== doc.doc_id
        );
      } else {
        state.selectedDocs.push(doc);
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
    },
    setPage(state, page) {
      state.page = page;
    },
    setRowsPerPage(state, rowsPerPage) {
      state.rowsPerPage = rowsPerPage;
    },
    setTotalPages(state, total) {
      state.totalPages = total;
    },
    setTotalRows(state, totalRows) {
      state.totalPages = totalRows;
    }
  },
  actions: {
    selDoc({ commit }, doc) {
      commit("selDoc", doc);
    },
    //? redundant
    async getAUser({ commit }, num) {
      try {
        const user = await axios.get(`/emps/info/${num}`);
        console.log(user);
      } catch (e) {
        throw e;
      }
    },

    async getADocs({ commit, state, rootState }, payload) {
      let num = payload.num; // status
      let page = payload.page; // page number
      let rows = payload.rows; // # of rows per page
      let lang = rootState.common.langNum;

      if (num) {
        commit("setMenuNo", num); // set tab numbers
      }
      if (page) {
        commit("setPage", page);
      }
      if (rows) {
        commit("setRowsPerPage", rows);
        commit("setPage", 1); // setback to page 1
      }
      try {
        const allData = await axios.get(
          `/tasks/pomoshnik/${state.menuNo}?page=${state.page}&rows=${state.rowsPerPage}&lang=${lang}`
        );
        //console.log(allData.data);
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
        commit("getADocs", docs);
        commit("setTotalRows", allData.data.docs_count);
        commit("setTotalPages", allData.data.page_count);
      } catch (e) {
        throw e;
      }
    },
    setIsListView({ commit }, payload) {
      commit("setIsListView", payload); //
    }
  },
  getters: {
    totalPages: state => {
      return state.totalPages;
    },
    page: state => {
      return state.page;
    },
    rowsPerPage: state => {
      return state.rowsPerPage;
    },
    totalRows: state => {
      return state.totalRows;
    },
    selectedDocs: state => {
      return state.selectedDocs;
    }
  }
};
