<template>
    <div>
      <h2>{{errorMessage}}</h2>
    </div>
</template>

<script>
import message from '../../../../../../shared/utils/messages'
export default {
  computed: {
    errorMessage() {
      return message[this.$store.getters.error] || 'Что-то пошло не так'
    }
  }

  // created() {
  //     console.log(this.$store.getters.error)
  // }
}
</script>