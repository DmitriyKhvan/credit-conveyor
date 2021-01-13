<template>
  <div>
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">Период, на который оформляется кредит</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(loanPeriod, index) of app_card_loan_period"
      :key="loanPeriod.id"
    >
      <div class="col-4">
        <q-input
          ref="cardAgeMinAge"
          outlined
          v-model="loanPeriod.minPeriod"
          dense
          label="от"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          ref="cardAgeMaxAge"
          outlined
          v-model="loanPeriod.maxPeriod"
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
          v-model="loanPeriod.score"
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
    app_card_loan_period() {
      return sortData(this.settings.app_card_loan_period, 'minPeriod')
    }
	}
};
</script>

<style lang="scss"></style>
