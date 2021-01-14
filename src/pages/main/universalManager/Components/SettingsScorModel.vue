<template>
  <div class="settingsScorModel">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
          <h4 class="titleSetting">Коэффициент корректировки</h4>
          <div class="row q-col-gutter-md">
            <div class="col-9">
              <div class="row q-col-gutter-md titleScor">
                <div class="col-3">Класс кредитоспособности</div>
                <div class="col-6">Диапазон баллов</div>
                <div class="col-3 text-right">Коэффицент корректировки</div>
              </div>

              <div
                class="row q-col-gutter-md" 
                v-for="(scoreСoefficient, index) of settings.app_card_score_coefficient"
                :key="'score_coefficient' + index"
              >
                <div class="col-3">
                  <q-input
                    disable
                    ref="scoreСoefficientСlass"
                    outlined
                    v-model="scoreСoefficient.class"
                    dense
                  />
                </div>
                <div class="col-3">
                  <q-input
                    ref="scoreСoefficientMinScore"
                    outlined
                    v-model="scoreСoefficient.minScore"
                    dense
                    :rules="[
                      val => floatValid(val)
                    ]"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    ref="scoreСoefficientMaxScore"
                    outlined
                    v-model="scoreСoefficient.maxScore"
                    dense
                    :rules="[
                      val => floatValid(val)
                    ]"
                  />
                </div>
                <div class="col-3 text-right">
                  <q-input
                    class="scoreСoefficient"
                    ref="scoreСoefficientCoefficient"
                    outlined
                    v-model="scoreСoefficient.coefficient"
                    dense
                    :rules="[
                      val => floatValid(val)
                    ]"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from '../mixins/creditSettings'

export default {
  mixins: [creditSettings],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 100)
  }, 
  computed: {},
};
</script>
<style lang="scss">
  .settingsScorModel{
    .titleScor {
      font-size: 14px;
    }

    .scoreСoefficientСlass > div {
      background: #F5F6FA;
    }

    .scoreСoefficient {
      float: right;
      width: 70%;
    }
  }
</style>
