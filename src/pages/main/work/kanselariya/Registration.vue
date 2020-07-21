<template>
  <div class="q-pa-lg">
    <div class="row q-ma-sm">
      <div class="col-7 shadow-1 bg-white q-mr-lg rounded-borders">
        <a-form></a-form>
      </div>
      <div class="col shadow-1 bg-white rounded-borders">
        <a-preview></a-preview>
      </div>
    </div>
  </div>
</template>
<script>
import Form from './components/NewForm'
import Preview from './components/Preview'
export default {
  components: {
    AForm: Form,
    APreview: Preview
  }
}
</script>
<style scoped>

</style>
