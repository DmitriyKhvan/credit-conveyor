<template>
<div class="q-pa-lg">
  <div class="row justify-center konc">
    <div class="title">
      <strong>Канцелярия</strong>
    </div>
    <div class="col">
      <q-btn class="bg-white" size="lg" @click="regLink">
        <div class="btnIcon"><img src="@/assets/icons/PlusGreen.svg" /></div>
        <div>Новый документ</div>
      </q-btn>
    </div>
  </div>

  <div class="row q-my-lg">
    <div class="col bg-white shadow-1">
      <a-filter></a-filter>
    </div>
  </div>

  <div class="row q-my-lg">
    <div class="col q-mt-lg bg-white">
      <a-table></a-table>
    </div>
  </div>
</div>
</template>

<script>

import Filter from './components/Filter'
import Table from './components/Table'
export default {
  components: {
    AFilter: Filter,
    ATable: Table,
  },
  methods: {
    regLink(){
      this.$router.push('sub/registration-document')
    }
  }
};
</script>

<style scoped>
  .konc {color: #20253A;}
  .btnIcon {
    padding-right: 10px;
  }
  .btnIcon img {
    margin-top: 9px;
  }
  .title {
    padding-right: 50px;
    font-size: 32px;
  }
</style>


