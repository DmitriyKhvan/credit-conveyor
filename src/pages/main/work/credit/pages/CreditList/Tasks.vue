<template>
  <AppCreditList 
    :loaderList="loaderList" 
    :key="componentKey" 
    @renderComponent="($event) => componentKey += $event"
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

