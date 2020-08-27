import axios from "axios";
//import { valueOf } from "@/shared/utils/common";

import NotifyService from "@/services/notify.service";
const state = {
  filters: {
    seniors: [],
    regions: [],
    organs: [],
    departments: [],
    statuses: [],
    types: []
  },
  senior: null,
  region: null,
  organ: null,
  department: null,
  status: null,
  type: null,

  //aManagement: null,
  aChecked: [],

  // pagination states
  page: 1, // default
  rowsPerPage: 5, // default
  totalPages: 0, // default
  totalRows: 0, // totalRows
  // docs
  allDocs: []
};
const mutations = {
  setFilters(state, payload) {
    state.filters = payload;
  },
  setAllDocs(state, payload) {
    if (!!payload) state.allDocs = payload;
  },

  updateDocStatus(state, payload) {
    const arr = state.allDocs.find(doc => doc.doc_id === payload.doc_id[0]);
    arr.doc_status = payload.status;
  },
  updateDocDeadline(state, payload) {
    const arr = state.allDocs.find(doc => doc.doc_id === payload.doc_id[0]);
    arr.deadline = payload.deadline;
  },
  multiUpdateDocStatus(state, payload) {
    payload.doc_id.forEach(id => {
      const arr = state.allDocs.find(doc => doc.doc_id === id);
      arr.doc_status = payload.status;
    });
  },
  docsCheked(state, payload) {
    state.aChecked = payload;
  },
  // selected dict options
  setSenior(state, senior) {
    state.senior = senior;
  },
  setRegion(state, region) {
    state.region = region;
  },
  setOrgan(state, organ) {
    state.organ = organ;
  },
  setDepartment(state, department) {
    state.department = department;
  },
  setStatus(state, status) {
    state.status = status;
  },
  setType(state, type) {
    state.type = type;
  },
  //pagination
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
  }
};
const actions = {
  async aSearchDocs({ commit, state }, payload) {
    try {
      const all = await axios.get(
        `/tasks/aparat/search?description=${payload}`
      );
      console.log({ searchRes: all });
      commit("setAllDocs", all.data);
      commit("setPage", 1); // setback to page 1
      commit("setTotalRows", all.data.length);
      // allrec/rows
      let page_count = Math.ceil(all.data.length / state.rowsPerPage);
      console.log({ page_count });
      commit("setTotalPages", page_count);
    } catch (e) {
      throw e;
    }
  },
  async loadAllDocs({ commit, state }, payload) {
    let page = null;
    let rows = null;
    if (!!payload) {
      page = payload.page; // page number
      rows = payload.rows; // # of rows per page
      //let lang = rootState.common.langNum; //

      if (page) {
        commit("setPage", page);
      }
      if (rows) {
        commit("setRowsPerPage", rows);
        commit("setPage", 1); // setback to page 1
      }
    }

    try {
      const all = await axios.post(
        `files/docs/apparat?page=${state.page}&rowsPerPage=${state.rowsPerPage}`,
        {
          superiors: state.superior,
          region: state.region,
          organ: state.organ,
          department: state.department,
          status: state.status
        }
      );
      let docs = all.data.data;
      if (docs) commit("setAllDocs", docs);
      else commit("setAllDocs", []);

      commit("setTotalRows", all.data.docs_count);
      commit("setTotalPages", all.data.page_count);

      console.log({ all });
    } catch (err) {
      console.log({ err });
      throw err;
    }
  },

  async updateDocStatus({ commit }, payload) {
    try {
      const res = await axios.post("/tasks/aparat", payload);
      console.log({ payload: payload });
      //if (payload.status) {
      commit("updateDocStatus", payload);
      //} else {
      commit("updateDocDeadline", payload);
      //}

      if (res.data.status == 1) {
        //
        NotifyService.showSuccessMessage(res.data.message);
      } else {
        NotifyService.showErrorMessage(res.data.message);
      }
    } catch (e) {
      throw e;
    }
  },
  async multiUpdateDocStatus({ commit }, payload) {
    try {
      let res = await axios.post("/tasks/aparat", payload);

      if (res.data.status == 1) {
        NotifyService.showSuccessMessage(res.data.message);
      } else {
        NotifyService.showErrorMessage(res.data.message);
      }
      commit("multiUpdateDocStatus", payload);
    } catch (e) {
      throw e;
    }
  },
  docsCheked({ commit }, payload) {
    commit("docsCheked", payload);
  },
  async loadFilters({ commit }) {
    try {
      const all = await axios.get("/tasks/filters/pomoshnik");
      const seniors = [],
        regions = [],
        organs = [],
        departments = [],
        statuses = [];

      all.data[0].superiors.forEach(el => {
        const user = {
          label: `${el.LAST_NAME} ${el.FIRST_NAME} ${el.MIDDLE_NAME}`,
          value: el.EMP_ID
        };
        seniors.push(user);
      });

      all.data[0].region.forEach(el => {
        const region = {
          label: el.NAME,
          value: el.ID
        };
        regions.push(region);
      });

      all.data[0].organ.forEach(el => {
        const organ = {
          label: el.NAME,
          value: el.ID
        };
        organs.push(organ);
      });

      all.data[0].departments.forEach(el => {
        const department = {
          label: el.NAME,
          value: el.CODE
        };
        departments.push(department);
      });

      all.data[0].status.forEach(el => {
        const status = {
          label: el.TEXT,
          value: el.STATUS
        };
        statuses.push(status);
      });

      const filters = {
        seniors,
        regions,
        organs,
        departments,
        statuses
      };
      commit("setFilters", filters);
    } catch (e) {
      throw e;
    }
  }
};
const getters = {
  getNameStatus: state => num => {
    const arr = state.filters.statuses.find(st => st.value === num);
    if (arr) {
      return arr.label;
    } else {
      return null;
    }
  },
  getAllDocs: state => {
    return state.allDocs;
  },
  // pagination
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
  }
};

export const apparat = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
