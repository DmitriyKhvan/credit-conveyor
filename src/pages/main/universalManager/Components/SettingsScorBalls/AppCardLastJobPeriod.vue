<template>
  <div>
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">Стаж на последнем месте работы</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(period, index) of app_card_last_job_period"
      :key="period.id"
    >
      <div class="col-4">
        <q-input
          ref="cardAgeMinAge"
          outlined
          v-model="period.minPeriod"
          dense
          label="от"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          ref="cardAgeMaxAge"
          outlined
          v-model="period.maxPeriod"
          dense
          label="до"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          class="scoreBall"
          ref="cardAgeScore"
          outlined
          v-model="period.score"
          dense
          :rules="[val => floatValid(val)]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import creditSettings from '../../mixins/creditSettings'
import sortData from '../../filters/sortData'

export default {
  mixins: [creditSettings],
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 100)
  }, 
	computed: {
    app_card_last_job_period() {
      return sortData(this.settings.app_card_last_job_period, 'minPeriod')
    }
	}
};
</script>

<style lang="scss"></style>
