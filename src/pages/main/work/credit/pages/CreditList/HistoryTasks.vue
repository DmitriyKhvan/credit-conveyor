<template>
  <AppCreditList 
    :loaderList="loaderList" 
    getTasks="getHistoryTasks"
  />
</template>

<script>
import creditListMixin from '../../mixins/creditList'

export default {
  mixins: [creditListMixin],
  async created() {
    this.getCreditsList("getHistoryTasks")
  }
}
</script>

<style lang="scss">

</style>

