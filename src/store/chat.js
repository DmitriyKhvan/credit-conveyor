export default {
    state: {
        chats: [],
        activeChat: null,
        to_uid: null
    },
    mutations: {
        setChat (state, payload){
            state.chats = payload
        },
        setActiveChat (state, payload){
            state.activeChat = payload
        },
        setToUid (state, payload){
          state.to_uid = payload
        },
        addMessage (state, payload){
          let chat = state.chats.find(el => el.chat_id === payload.chat_id)
          chat.messages.push(payload.messages[0])
        }
    },
    actions: {
        setChats({commit}, payload){
            commit('setChat', payload)
        },
        setActiveChat ({commit}, payload){
            commit('setActiveChat', payload)
        },
        setToUid({commit}, payload){
          commit('setToUid', payload)
        },
        addMessage({commit}, payload){
          commit('addMessage', payload)
        }
    },
    getters: {
        getChats(state){
            return state.chats
        },
        getActiveChat(state){
            return state.activeChat
        },
        getToUid(state){
          return state.to_uid
        }
    }
}
