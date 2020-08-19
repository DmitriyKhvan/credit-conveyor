import axios from "axios";

export default {
  state: {
    isBoardView: false, // is view like Kanban cards
    isListView: true, // is tasks in list view or card
    tabMenuNo: 1, // # of tab
    isSearchOpen: false, // is search input open or close
    tTasks: [
      {
        id: 0,
        title:
          "Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем",
        pages: 2,
        messages: 4,
        users: 3,
        status: 1
      }
    ],
    taskList: []
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
        console.log({ res: res.data });
        commit("setTasks", res.data);
      } catch (err) {
        console.error({ err });
      }
    }
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
    }
  }
};
