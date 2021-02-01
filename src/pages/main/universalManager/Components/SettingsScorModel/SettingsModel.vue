<template>
  <div>
    <div class="row">
      <div class="col-9">
        <div class="row q-col-gutter-md">
          <div class="col-10">
            <p>Минимальное кол-во месяцев для ЗП поступлений</p>
          </div>
          <div class="col-2">
            <q-input
              ref="MIN_MONTH_SALARYY"
              outlined
              v-model="MIN_MONTH_SALARYY.paramValue"
              dense
              :rules="[val => integerValid(val)]"
            />
          </div>

          <div class="col-10">
            <p>Коэффициент корректировки после преаппрува</p>
          </div>
          <div class="col-2">
            <q-input
              ref="CORR_KOEF"
              outlined
              v-model="CORR_KOEF.paramValue"
              dense
              :rules="[val => integerValid(val)]"
            />
          </div>

          <div class="col-10">
            <p>Проходной балл по скор. карте</p>
          </div>
          <div class="col-2">
            <q-input
              ref="SCORE_CARD_MIN"
              outlined
              v-model="SCORE_CARD_MIN.paramValue"
              dense
              :rules="[val => integerValid(val)]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import creditSettings from '../../mixins/creditSettings'
// import AlertMessage from '../Components/AlertMessage'

export default {
  mixins: [creditSettings],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 3000)
  }, 
  computed: {
    MIN_MONTH_SALARYY() {
      return this.settings.APPCARD_MODEL.find(i => i.paramName == 'MIN_MONTH_SALARYY')
    },
    CORR_KOEF() {
      return this.settings.APPCARD_MODEL.find(i => i.paramName == 'CORR_KOEF')
    },
    SCORE_CARD_MIN() {
      return this.settings.APPCARD_MODEL.find(i => i.paramName == 'SCORE_CARD_MIN')
    },
  },
  methods: {}
};
</script>
<style lang="scss">
  
</style>
