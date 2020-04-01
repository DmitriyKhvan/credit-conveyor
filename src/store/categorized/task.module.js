import { decode } from "jsonwebtoken";

import ApiService from "@/services/api.service"
import storegeService from "@/services/storage.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const task = {
  namespaced: true,
  state: {
    userTasks: [],
    props: [],
    currentTask: null,
    currentMenu: null,
    statuses: [
      {
        label: 'Новые',
        value: 1,
        icon: 'new_releases',
        countTask: null
      },
      {
        label: 'Принял(а)',
        value: 2,
        icon: 'drafts',
        countTask: null
      },
      {
        label: 'Работаю',
        value: 3,
        icon: 'settings_applications',
        countTask: null
      },
      {
        label: 'Завершено',
        value: 4,
        icon: 'check_circle',
        countTask: null
      }
    ]
  },
  actions: {
    async userTasks({commit}, id="") {
      try {
        let { data } = await ApiService.get(`tasks/user/${id}`)
        console.log('userTasks', data)
        commit('setUserTasks', data)
        commit('setCurMenu', id)

        if(id == 1) {
          commit('setUserTasksCount', data.length)
        }
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
        let { data } = await ApiService.post('tasks/comment/add', comment)
        //console.log(data)
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
        //console.log(data)
        if (data.status == 1) {
          commit('deleteComment', id)
        }
      } catch(error) {
        console.log(error)
      }
    },

    async editComment({commit}, comment) {
      try {
        let { data } = await ApiService.post('tasks/comment/edit', comment)
        console.log(data)
        if (data.status == 1) {
          commit('editComment', comment)
        }
      } catch(error) {
        console.log(error)
      }
    },

    async changeTaskStatus({dispatch, getters}, status) {
      try {
        let { data } = await ApiService.post('tasks/user/status', status)
        //console.log(data)
        if (data.status == 1) {
          dispatch("userTasks", getters.getCurrentMenu)
        }
      } catch(error) {
        console.log(error)
      }
    },

    async deleteUser({commit}, task_id) {
      try {
        let { data } = await ApiService.delete(`http://10.8.8.70:4000/tasks?id=${task_id}`)
        //console.log(data)
        if (data.status == 1) {
          commit("deleteUser", task_id)
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
    setUserTasksCount(state, payload) {
      state.statuses[0].countTask = payload
    },
    setUserHierarchy(state, payload) {
      state.props = payload
    },
    setCurrentTask(state, payload) {
      state.currentTask = payload
    },
    addComment(state, comment) {
      //console.log(state.currentTask.comments)
      if (!state.currentTask.comments) {
        state.currentTask.comments = []
      }
      state.currentTask.comments.unshift(comment)
    },
    editComment(state, comment) {
      const editComment = state.currentTask.comments.find(i => i.id == comment.id)
      editComment.text = comment.text
    },
    deleteComment(state, id) {
      const idx = state.currentTask.comments.findIndex(i => i.id = id)
      state.currentTask.comments.splice(idx, 1)
    },
    setCurMenu(state, id) {
      state.currentMenu = id
    },
    deleteUser(state, task_id) {
      const idx = state.currentTask.forward_tasks.findIndex(i => i.task_id == task_id)
      state.currentTask.forward_tasks.splice(idx, 1)
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
    },
    getStatuses(state) {
      return state.statuses
    }, 
    getCurrentMenu(state) {
      return state.currentMenu
    }
  }
}