import axios from "axios";
export default {
  state: {
    aFilters: {
      seniors: [],
      regions: [],
      organs: [],
      departments: [],
      statuses: [],
      types: []
    },
    aDocks: [],
    aSenior: null,
    aRegion: null,
    aOrgan: null,
    aManagement: null,
    aStatus: null,
    aType: null,
    aChecked: [],
    aPerPage: 10,
    aPage: 1,
    aDocs: 0,
    aAllPages: 0
  },
  mutations: {
    aSetPage(state, payload) {
      state.aDocs = payload.docs_count;
      state.aPage = payload.current_page;
      state.aAllPages = payload.page_count;
      state.aPerPage = payload.rows_page;
    },
    aChangePage(state, payload) {
      state.aSenior = payload;
      state.aRegion = payload;
      state.aOrgan = payload;
      state.aManagement = payload;
      state.aStatus = payload;
    },
    aAllFilters(state, payload) {
      state.aFilters = payload;
    },
    aAllDocs(state, payload) {
      state.aDocks = payload;
    },
    updateDocStatus(state, payload) {
      const arr = state.aDocks.find(doc => doc.doc_id === payload.doc_id[0]);
      arr.doc_status = payload.status;
    },
    updateDocDeadline(state, payload) {
      const arr = state.aDocks.find(doc => doc.doc_id === payload.doc_id[0]);
      arr.deadline = payload.deadline;
    },
    multiUpdateDocStatus(state, payload) {
      payload.doc_id.forEach(id => {
        const arr = state.aDocks.find(doc => doc.doc_id === id);
        console.log(arr);
        arr.doc_status = payload.status;
      });
    },
    docsCheked(state, payload) {
      state.aChecked = payload;
    }
  },
  actions: {
    async aSearchDocs({ commit }, payload) {
      try {
        const all = await axios.get(
          `/tasks/aparat/search?description=${payload}`
        );
        console.log(all);
        commit("aAllDocs", all.data);
      } catch (e) {
        throw e;
      }
    },
    async aPageSelect({ commit }, payload) {
      console.log(payload);
      try {
        const all = await axios.post(
          `files/docs/apparat?page=${payload.page}&rowsPerPage=${payload.perPage}`,
          payload.filters
        );
        const arrPage = {
          docs_count: all.data.docs_count,
          current_page: all.data.current_page,
          page_count: all.data.page_count,
          rows_page: all.data.rowsPerPage
        };
        commit("aSetPage", arrPage);
        commit("aAllDocs", all.data.data);
      } catch (e) {
        throw e;
      }
    },
    async aAllDocs({ commit }) {
      try {
        const all = await axios.post(
          "files/docs/apparat?page=1&rowsPerPage=5",
          {
            superiors: null,
            region: null,
            organ: null,
            departments: null,
            status: null
          }
        );
        const arrPage = {
          docs_count: all.data.docs_count,
          current_page: all.data.current_page,
          page_count: all.data.page_count,
          rows_page: all.data.rowsPerPage
        };
        commit("aSetPage", arrPage);
        commit("aAllDocs", all.data.data);
        //console.log(all.data);
      } catch (e) {
        console.log("files/docs/apparat");
        throw e;
      }
    },
    async updateDocStatus({ commit }, payload) {
      try {
        const doc = await axios.post("/tasks/aparat", payload);
        if (payload.status) {
          commit("updateDocStatus", payload);
        } else {
          commit("updateDocDeadline", payload);
        }
      } catch (e) {
        throw e;
      }
    },
    async multiUpdateDocStatus({ commit }, payload) {
      try {
        const doc = await axios.post("/tasks/aparat", payload);
        commit("multiUpdateDocStatus", payload);
      } catch (e) {
        throw e;
      }
    },
    docsCheked({ commit }, payload) {
      commit("docsCheked", payload);
    },
    async aAllFilters({ commit }) {
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
        commit("aAllFilters", filters);
      } catch (e) {
        throw e;
      }
    }
  },
  getters: {
    getNameStatus: state => num => {
      const arr = state.aFilters.statuses.find(st => st.value === num);
      return arr.label;
    }
  }
};
