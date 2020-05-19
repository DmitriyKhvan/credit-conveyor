import ApiService from "@/services/api.service";

export const education = {
  namespaced: true,
  state: {
    topicName: "",
    targetDate: null,
    res: []
  },
  actions: {
    async getTopics() {
      try {
        return (await ApiService.get("/test/cat")).data;
      } catch(error) {
        console.log(error)
      }
    },

    async getTests({commit}, id) {
      try {
        const { data } = await ApiService.get(`/test/get?id=${id}`);

        if (data.data.duration) {
          //Timer
          const targetDate = new Date().getTime() + 1000 * data.data.duration;
          commit("setTargetDate", targetDate);
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async sentTestAnswers({commit}, answers) {
      try {
        const { data } = await ApiService.post("/test/answer", answers);

        if (data.message.length) {
          commit("setResTest", data.message);
          this.$router.push({ path: "/completeTest" });
        }

        //return data;
      } catch(error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setTopicName(state, payload) {
      state.topicName = payload;
    },
    setResTest(state, payload) {
      state.res = payload;
    },
    setTargetDate(state, payload) {
      state.targetDate = payload;
    }
  },
  getters: {
    getTopicState(state) {
      return state;
    }
  }
};
