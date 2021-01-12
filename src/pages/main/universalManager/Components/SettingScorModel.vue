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
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
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
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
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
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
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
import { mapState, mapGetters} from 'vuex'

export default {
  props: ['title'],
  data() {
    return {
      expanded: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.$emit("set-refs", this.$refs);
    }, 100)
  }, 
  computed: {
    ...mapState({
      settings: state => state.creditSettings.settings
    })
  }
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
      width: 50%;
    }
  }
</style>
