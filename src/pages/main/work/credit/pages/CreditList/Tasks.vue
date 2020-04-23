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
    this.$store.commit('credits/clearCreditTasks')
    try {
      const auth = await this.$store.dispatch("credits/authBpm")
      console.log("auth", auth);

      await this.$store.dispatch("credits/getUserTasks")
    } catch(error) {}
  },
  components: {
    AppCreditList: CreditList
  }
}
</script>

<style lang="scss">

</style>