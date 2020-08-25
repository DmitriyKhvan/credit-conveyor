export default {
  state: {
    tViewTasks: false,
    tList: true,
    tMenu: 1,
    tSearch: false,
    tTasks: [
      {
        id: 0,
        title: 'Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем',
        pages: 2,
        messages: 4,
        users: 3,
        status: 1
      },
      {
        id: 1,
        title: 'Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем',
        pages: 7,
        messages: 12,
        users: 2,
        status: 1
      },
      {
        id: 3,
        title: 'Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем',
        pages: 4,
        messages: 18,
        users: 4,
        status: 1
      },
      {
        id: 4,
        title: 'Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем',
        pages: 9,
        messages: 7,
        users: 6,
        status: 2
      },
      {
        id: 5,
        title: 'Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем',
        pages: 1,
        messages: 2,
        users: 3,
        status: 3
      },
      {
        id: 6,
        title: 'Министерство информационно-коммуникационные технологии направляет вам указание по оптимизацию внутренных банковских систем',
        pages: 6,
        messages: 13,
        users: 2,
        status: 4
      },
    ],
    tTab: 1
  },
  mutations: {
    tChangeView(state){
      state.tList = !state.tList
    },
    tChangeManegment(state){
      state.tViewTasks = !state.tViewTasks
    },
    tMenuChange(state, num){
      state.tMenu = num
    },
    tSearchChange(state){
      state.tSearch = !state.tSearch
    },
    tTabChange(state, n){
      state.tTab = n
    }
  },
  actions: {
    tChangeView({commit}){
      commit('tChangeView')
    },
    tChangeManegment({commit}){
      commit('tChangeManegment')
    },
    tMenuChange({commit}, num){
      commit('tMenuChange', num)
    },
    tSearchChange({commit}){
      commit('tSearchChange')
    },
    tTabChange({commit}, n){
      commit('tTabChange', n)
    }
  },
  getters: {
    tList1(state){
      return state.tTasks.find(task => task.status === 1)
    },
    tList2(state){
      return state.tTasks.find(task => task.status === 2)
    },
    tList3(state){
      return state.tTasks.find(task => task.status === 3)
    },
    tList4(state){
      return state.tTasks.find(task => task.status === 4)
    },
  }
}
