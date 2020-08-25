import axios from "axios";

export default {
  state: {
    isBoardView: false, // is view like Kanban cards
    isListView: true, // is tasks in list view or card
    tabMenuNo: 1, // # of tab
    isSearchOpen: false, // is search input open or close
    taskList: [],
    searchText: "",
    countNew: 0,
    // edit
    tViewTasks: false,
    tList: true,
    tMenu: 1,
    tSearch: false,
    tTasks: [
      {
        id: 0,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 2,
        messages: 4,
        users: 3,
        status: 1
      },
      {
        id: 1,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 7,
        messages: 12,
        users: 2,
        status: 1
      },
      {
        id: 3,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 4,
        messages: 18,
        users: 4,
        status: 1
      },
      {
        id: 4,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 9,
        messages: 7,
        users: 6,
        status: 2
      },
      {
        id: 5,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 1,
        messages: 2,
        users: 3,
        status: 3
      },
      {
        id: 6,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 6,
        messages: 13,
        users: 2,
        status: 4
      }
    ],
    tTab: 1
  },
  mutations: {
    changeListView(state) {
      state.isListView = !state.isListView;
    },
    changeBoardView(state) {
      state.isBoardView = !state.isBoardView;
    },
    setTabMenuNo(state, num) {
      state.tabMenuNo = num;
    },
    setSearchOpen(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setTasks(state, tasks) {
      state.taskList = tasks;
    },
    setSearchText(state, text) {
      state.searchText = text;
    },
    setCountNew(state, count) {
      state.countNew = count;
    },
    //edit
    tSearchChange(state) {
      state.tSearch = !state.tSearch;
    },
    tTabChange(state, n) {
      state.tTab = n;
    }
  },
  actions: {
    changeListView({ commit }) {
      commit("changeListView");
    },
    changeBoardView({ commit }) {
      commit("changeBoardView");
    },
    setSearchOpen({ commit }) {
      commit("setSearchOpen");
    },
    // setTabMenuNo({ commit }, num) {
    //   commit("setTabMenuNo", num);
    // },
    async onTabChange({ commit }, num) {
      commit("setTabMenuNo", num);
      try {
        let res = await axios.get(`tasks/user/${num}`);
        if (num == 1) {
          commit("setCountNew", res.data.length);
        }
        console.log({ res: res.data.length });
        commit("setTasks", res.data);
      } catch (err) {
        console.error({ err });
      }
    },
    async reload({ commit, state }) {
      try {
        let res = await axios.get(`tasks/user/${state.tabMenuNo}`);
        if (state.tabMenuNo == 1) {
          commit("setCountNew", res.data.length);
        }
        console.log({ res: res.data });
        commit("setTasks", res.data);
      } catch (err) {}
    },
    //EDIT
    tSearchChange({ commit }) {
      commit("tSearchChange");
    },
    tTabChange({ commit }, n) {
      commit("tTabChange", n);
    }
    /*
    searchTasks({ commit, state }, searchText) {
      console.log(searchText);

      let filtered = state.taskList.filter(el =>
        el.f_task_data.description.includes(searchText)
      );
      console.log(filtered);

      commit("setTasks", filtered);
    }*/
  },
  getters: {
    tabMenuNo(state) {
      return state.tabMenuNo;
    },
    isSearchOpen(state) {
      return state.isSearchOpen;
    },
    getTasks(state) {
      return state.taskList;
    },
    getListView(state) {
      return state.isListView;
    },
    getBoardView(state) {
      return state.isBoardView;
    },
    getSearchText(state) {
      return state.searchText;
    },
    getCountNew(state) {
      return state.countNew;
    }
  }
};
