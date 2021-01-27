import MessagePopup from '@/components/MessagePopup'

export default {
  data() {
    return {}
  },
  methods: {
    messagePopup(message, code = 99) {
      this.$q.dialog({
        component: MessagePopup,
        parent: this,
        data: {
          message,
          code
        }
        // persistent: true
      })
    }
  }
}