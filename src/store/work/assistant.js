import axios from "axios";
const state = {
  aViewTasks: false,
  isListView: true,
  aAllDocs: [],
  menuNo: 1,
  selectedDocs: [],
  aSuperiors: [],
  isSearchOpen: false, // is search input open or close
  // pagination states
  page: 1, // default
  rowsPerPage: 5, // default
  totalPages: 0, // default
  totalRows: 0, // totalRows
  docSearchText: "",
  countNew: 0,
  countReady: 0,
  countSent: 0
};
const mutations = {
  selDoc(state, doc) {
    console.log({ doc });
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
  setADocs(state, payload) {
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
    state.totalRows = totalRows;
  },
  resetSelectedDocs(state) {
    state.selectedDocs = [];
  },
  setDocSearchText(state, text) {
    state.docSearchText = text;
  },
  setCountNew(state, count) {
    state.countNew = count;
  },
  setCountSent(state, count) {
    state.countSent = count;
  },
  setCountReady(state, count) {
    state.countReady = count;
  },
  setSearchOpen(state) {
    state.isSearchOpen = !state.isSearchOpen;
  }
};
const actions = {
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
    let lang = rootState.common.langNum; //

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
      commit("setCountNew", allData.data.count_new);
      commit("setCountReady", allData.data.count_ready);
      commit("setCountSent", allData.data.count_sent);

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
      //console.log({ all: allData.data });
      commit("setADocs", docs);
      commit("setTotalRows", allData.data.docs_count);
      commit("setTotalPages", allData.data.page_count);
    } catch (e) {
      throw e;
    }
  },
  resetSelectedDocs({ commit }) {
    commit("resetSelectedDocs");
  },
  setIsListView({ commit }, payload) {
    commit("setIsListView", payload); //
  },
  onSelectSortBy({ commit }) {}
};

const getters = {
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
  },
  menuNo: state => {
    return state.menuNo;
  },
  getDocSearchText(state) {
    return state.docSearchText;
  },
  getAllDocs(state) {
    return state.aAllDocs;
  },
  isListView(state) {
    return state.isListView;
  },
  getCountNew(state) {
    return state.countNew;
  },
  getCountReady(state) {
    return state.countReady;
  },
  getCountSent(state) {
    return state.countSent;
  },
  isSearchOpen(state) {
    return state.isSearchOpen;
  }
};

export const assistant = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
