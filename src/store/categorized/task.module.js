import { decode } from "jsonwebtoken";

import ApiService from "@/services/api.service"
import storegeService from "@/services/storage.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const task = {
  namespaced: true,
  state: {
    userTasks: [],
    props: [],
    currentTask: null
  },
  actions: {
    async userTasks({commit }) {
      try {
        let { data } = await ApiService.get(`tasks/user/1`)
        console.log('userTasks', data)
        commit('setUserTasks', data)
      } catch(error) {
        console.log(error)
      }
    },

    async getUserInfo({commit}, empId) {
      try {
        return (await ApiService.get(`/emps/info?id=${empId}`)).data
      } catch(error) {
        console.log(error)
      }
    },

    async addComment({commit}, comment) {
      try {
        let { data } = await ApiService.post('tasks/comment', comment)
        if (data.status == 1) {
          commit('addComment', comment)
        }
      } catch(error) {
        console.log(error)
      }
    },

    async deleteComment({commit}, id) {
      try {
        let { data } = await ApiService.delete(`tasks/comment?id=${id}`)
        if (data.status == 1) {
          commit('deleteComment', id)
        }
      } catch(error) {
        console.log(error)
      }
    }

  },
  mutations: {
    setUserTasks(state, payload) {
      state.userTasks = payload
    },
    setUserHierarchy(state, payload) {
      state.props = payload
    },
    setCurrentTask(state, payload) {
      state.currentTask = payload
    },
    addComment(state, comment) {
      state.currentTask.comments.unshift(comment)
    },
    deleteComment(state, id) {
      const idx = state.currentTask.comments.findIndex(i => i.id = id)
      state.currentTask.comments.splice(idx, 1)
    }
  },
  getters: {
    getUserTasks(state) {
      return state.userTasks
    },
    getUserHierarchy(state) {
      return state.props
    },
    getCurrentTask(state) {
      return state.currentTask
    }
  }
}