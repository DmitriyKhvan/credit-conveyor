<template>
  <div>
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">{{subTitleScor}}</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(item, index) of sortItems"
      :key="item.id"
    >
      <div class="col-4">
        <q-input
          ref="itemMinPeriod"
          outlined
          v-model="item[periodFrom]"
          dense
          label="от"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          ref="itemMaxPeriod"
          outlined
          v-model="item[periodTo]"
          dense
          label="до"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          class="scoreBall"
          ref="itemScore"
          outlined
          v-model="item.score"
          dense
          :rules="[val => floatValid(val)]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import creditSettings from '../mixins/creditSettings'
import sortData from '../filters/sortData'

export default {
  props: ['subTitleScor', 'items', 'periodFrom', 'periodTo'], 
  mixins: [creditSettings],
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 100)
  }, 
	computed: {
    sortItems() {
      return sortData(this.items, this.periodFrom)
    }
	}
};
</script>

<style lang="scss"></style>
