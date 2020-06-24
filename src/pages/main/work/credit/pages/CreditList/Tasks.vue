<template>
  <AppCreditList :loaderList="loaderList" />
</template>

<script>
import CreditList from "./CreditList"

export default {
  data() {
    return {
      loaderList: false
    }
  },
  async created() {
    this.loaderList = true
    this.$store.commit('credits/clearCreditTasks')
    try {
      const auth = await this.$store.dispatch("credits/authBpm")
      console.log("auth", auth);

      await this.$store.dispatch("credits/getUserTasks")
      this.loaderList = false
    } catch(error) {}
  },
  components: {
    AppCreditList: CreditList
  }
}
</script>

<style lang="scss">

</style>