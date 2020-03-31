export default {
    state: {
        topicName: '',
        countTrueAnswers: '',
        quesAmount: null,
        topicName: '',
        answerTest: '',
        res: []
    },
    actions: {

    },
    mutations: {
        sentAnswersTest(state, payload) {
            state.quesAmount = payload.quesAmount
            state.countTrueAnswers = payload.countTrueAnswers
        },
        setTopicName(state, payload) {
            state.topicName = payload
        },
        setAnswerTest (state, payload) {
            state.answerTest = payload
        },
        setResTest (state, payload) {
            state.res = payload
        }
    },
    getters: {
        getTopicState (state){
            return state
        }
    }
}