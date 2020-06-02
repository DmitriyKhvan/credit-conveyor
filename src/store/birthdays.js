import axios from 'axios'
export default {
    state: {
        today: [],
        tomorrow: [],
        afterTomorrow: []
    },
    mutations: {
        setToday(state, payload){
            state.today = payload
        },
        setTomorrow(state, payload){
            state.tomorrow = payload
        },
        setAfterTomorrow(state, payload){
            state.afterTomorrow = payload
        }
    },
    actions: {
        async setBirthdays ({commit}) {
            try {
                const days = await axios.get('/emps/bdays')
                days.data.forEach((element, i) => {
                    if(i === 0) {
                        commit('setToday', element)                        
                    } else if (i === 1) {
                        commit('setTomorrow', element)
                    } else {
                        commit('setAfterTomorrow', element)
                    }                      
                }) 
            } catch(e) {
                throw e
            }
        }
    },
    getters: {
        getTodays (state) {
            return state.today
        },
        getTomorrow (state) {
            return state.tomorrow
        },
        getAfterTomorrow (state) {
            return state.afterTomorrow
        }
    }

}