<template>
  <AppCreditList 
    :loaderList="loaderList" 
    getTasks="getUserTasks"
  />
</template>

<script>
import creditListMixin from '../../mixins/creditList'

export default {
  mixins: [creditListMixin],
  async created() {
    this.getCreditsList("getUserTasks")
  }
}
</script>

<style lang="scss">

</style>

