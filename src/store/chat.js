export default {
    state: {
        users: [],
        chats: [],
        activeChat: null,
        to_uid: null
    },
    mutations: {
        setChat (state, payload){
          state.chats = payload
        },
        addChat (state, payload){
          state.chats.push(payload)
        },
        setActiveChat (state, payload){
            state.activeChat = payload
        },
        setToUid (state, payload){
          state.to_uid = payload
        },
        addMessage (state, payload){
          let chat = state.chats.find(el => el.chat_id === payload.chat_id)
          const message = {
            id: payload.messages[0].id,
            emp_id: payload.messages[0].from_uid,
            message: payload.messages[0].message,
            sent_at: payload.messages[0].sent_at,
            name: payload.messages[0].user_fio
          }
          if(chat) {
            chat.messages.push(message)
          } else {
            const newChat = {
              chat_id: payload.chat_id,
              from_uid: payload.messages[0].from_uid,
              to_uid: '',
              to_name: '',
              messages: [message]
            }
            state.chats.push(newChat)
          }

        },
        deleteChat(state, id){
          state.chats = state.chats.filter(el => el.chat_id !== id)
          state.activeChat = null
        }

    },
    actions: {
        setChat({commit}, payload){
          commit('setChat', payload)
        },
        addChat({commit}, payload){
          commit('addChat', payload)
        },
        setActiveChat ({commit}, payload){
          commit('setActiveChat', payload)
        },
        setToUid({commit}, payload){
          commit('setToUid', payload)
        },
        addMessage({commit}, payload){
          commit('addMessage', payload)
        },
        deleteChat({commit}, id){
          commit('deleteChat', id)
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
        },
        getChatById: state => id => {
          return state.chats.find(chat => chat.chat_id === id);
        }
    }
}
