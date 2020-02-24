export default {
    state: {
        topicName: '',
        countTrueAnswers: '',
        quesAmount: null,
        topicName: ''
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
        }
    }
}