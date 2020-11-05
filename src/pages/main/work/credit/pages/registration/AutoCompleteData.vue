<template>
  
    <q-btn
      :loading="submitting"
      label="Получить данные автоматически"
      @click="autoCompleate"
      class="full-width getInfoBtn"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
  
</template>
<script>
export default {
  data() {
    return {
      submitting: false
    }
  },
  methods: {
    async autoCompleate() {
      this.submitting = true
      try {
        await this.$store.dispatch('credits/getUserDataFromService')
        this.submitting = false
      } catch (error) {
        console.log(error)
        this.submitting = false
      }
    }
  }
};
</script>
<style lang="scss">
</style>
