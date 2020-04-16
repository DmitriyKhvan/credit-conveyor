<template>
  <AppCreditList />
</template>

<script>
import CreditList from "./CreditList"

export default {
  data() {
    return {
      
    }
  },
  async created() {
    this.$store.commit('clearCreditTasks')
    try {
      const auth = await this.$store.dispatch("authBpm")
      console.log("auth", auth);

      await this.$store.dispatch("getUserTasks")
    } catch(error) {}
  },
  components: {
    AppCreditList: CreditList
  }
}
</script>

<style lang="scss">

</style>