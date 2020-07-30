import axios from "axios";
export default {
  state: {
    aViewTasks: false,
    aList: true,
    aAllDocs: [],
    aMenu: 1,
    selectedDocs: [],
    aShablons: [],
    aSuperiors: []
  },
  mutations: {
    selVal(state, id){
      if(state.selectedDocs.find(docId => docId === id)){
        state.selectedDocs = state.selectedDocs.filter(docId => docId !== id)
      } else {
        state.selectedDocs.push(id)
      }
    },
    aChangeList(state, payload){
      state.aList = payload
    },
    getADocs(state, payload){
      state.aAllDocs = payload
    },
    setAMenu(state,num){
      state.aMenu = num
    },
    setShablonsSuperiors(state, payload){
      state.aShablons = payload.shablons
      state.aSuperiors = payload.superiors
    }
  },
  actions: {
    selVal({commit}, id){
      commit('selVal', id)
    },
    async getAUser({commit}, num){
      try {
        const user = await axios.get(`/emps/info/${num}`)
        console.log(user)
      } catch (e){
        throw e
      }
    },
    async getADocs({commit}, num){
      try {
        const all = await axios.get(`/tasks/pomoshnik/${num}`)
        const docs = all.data.data !== null ? all.data.data : []
        const shablons = []
        const superiors = []
        console.log('2', await axios.get(`/tasks/pomoshnik/2`))
        if(all.data.shablon){
          all.data.shablon.forEach(el => {
            shablons.push({
              label: el.name,
              value: el.id
            })
          });
          all.data.superiors.forEach(el => {
            superiors.push({
              label: el.name,
              value: el.emp_id,
              dep_code: el.dep_code
            })
          })

          commit('setShablonsSuperiors', {
            shablons,
            superiors
          })
        }

        commit('setAMenu', num)
        commit('getADocs', docs)
      } catch (e){
        throw e
      }
    },

    aChangeList({commit}, payload){
      commit('aChangeList', payload)
    }
  },
  getters: {

  }
}
