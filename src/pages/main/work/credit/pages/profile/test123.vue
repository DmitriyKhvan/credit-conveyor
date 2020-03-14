<template>
  <div>
    <!-- SOURCE -->
    <div id="printMe">
      <div class="row">
        <div class="col-6">1</div>
        <div class="col-6">2</div>
      </div>
      <h1>Print me!</h1>
        <div class="row">
            <q-btn flat label="OK" color="primary" />
        </div>

    </div>
    <!-- OUTPUT -->
    <button @click="print">skjdnfkjnsdkjfnk</button>
  </div>
</template>

<script>

export default {
    data(){
        return{
            alert: true
        }
    },
    methods:{
        print () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
    }
}
</script>

<style scoped>

</style>