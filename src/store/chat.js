export default {
    state: {
        chats: [],
        activeChat: null
    },
    mutations: {
        setChat (state, payload){
            state.chats = payload
        },
        setActiveChat (state, payload){
            state.activeChat = payload
        }
    },
    actions: {
        setChats({commit}, payload){
            commit('setChat', payload)
        },
        setActiveChat ({commit}, payload){
            commit('setActiveChat', payload)
        }
    },
    getters: {
        getChats(state){
            return state.chats
        },
        getActiveChat(state){
            return state.activeChat
        }
    }
}