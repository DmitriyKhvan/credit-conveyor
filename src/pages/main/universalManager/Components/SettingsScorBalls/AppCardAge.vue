<template>
  <div>
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">Возраст заемщика</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(age, index) of appCardAge"
      :key="'cardAge' + index"
    >
      <div class="col-4">
        <q-input
          ref="ageMinAge"
          outlined
          v-model="age.minAge"
          dense
          label="от"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          ref="ageMaxAge"
          outlined
          v-model="age.maxAge"
          dense
          label="до"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          class="scoreBall"
          ref="ageScore"
          outlined
          v-model="age.score"
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
    appCardAge() {
      return sortData(this.settings.appCardAge, 'minAge')
    }
	}
};
</script>

<style lang="scss"></style>
