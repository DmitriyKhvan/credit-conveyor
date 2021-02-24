<template>
  <div class="settingsProcess" :id="title.id">
    
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input
                ref="MORATORIUM_PERIODD"
                outlined
                v-model="MORATORIUM_PERIODD.baseValue"
                dense
                label="Срок моратория по отказанным клиентам"
                :rules="[val => integerPositiveValid(val)]"
              />
            </div>

						<div class="col-4">
              <q-input
                ref="APPLIFE_PERIOD"
                outlined
                v-model="APPLIFE_PERIOD.baseValue"
                dense
                label="Срок жизни заявки"
                :rules="[val => integerPositiveValid(val)]"
              />
            </div>
          </div>


          <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Банк ИНПС по умолчанию</p>

                <q-toggle
                  class="customeToggle"
                  :false-value=0
                  :label="options[INPS_BANK.applied]"
                  :true-value=1
                  v-model="INPS_BANK.applied"
                />
              </div>
              <div class="col-4">
                <q-input
                  :disable="INPS_BANK.applied == 1 ? true : false"
                  class="customInput"
                  ref=""
                  outlined
                  v-model="INPS_BANK.baseValue"
                  dense
                  label="ИНПС"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div>
              
            </div>

            <div class="borderRow"></div>

            <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Разрешить повторный запрос в Халк Банк</p>

                <q-toggle
                  class="customeToggle"
                  :false-value=0
                  :label="options[REPEAT_INPS.applied]"
                  :true-value=1
                  v-model="REPEAT_INPS.applied"
                />
              </div>
              <div class="col-4">
                
              </div>
              
            </div>

            <div class="borderRow"></div>

            <div class="row q-col-gutter-x-md">
              <div class="col-4"></div>
              <div class="col-4">
                <p class="interval">Диапазон для удобного числа погашения кредита </p>
              </div>
              <div class="col-4"></div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="REQ_RELATIVES_COUNT"
                  outlined
                  v-model="REQ_RELATIVES_COUNT.baseValue"
                  dense
                  label="Количество обязательных родственников"
                  :rules="[val => integerPositiveValid(val)]"
                />
              </div>
              <div class="col-4">
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      ref="CONVENIENT_REPAYMENT_MIN"
                      outlined
                      v-model="CONVENIENT_REPAYMENT.minValue"
                      dense
                      label="От"
                      :rules="[val => integerPositiveValid(val)]"
                    />                  
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="CONVENIENT_REPAYMENT_MAX"
                      outlined
                      v-model="CONVENIENT_REPAYMENT.maxValue"
                      dense
                      label="До"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4"></div>
              
            </div>

            <div class="borderRow"></div>

            <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Разрешить повторный запрос в АСОКИ</p>

                <q-toggle
                  class="customeToggle"
                  :false-value=0
                  :label="options[REPEAT_ASOKI.applied]"
                  :true-value=1
                  v-model="REPEAT_ASOKI.applied"
                />
              </div>
              <div class="col-4"></div>
            </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from "../mixins/creditSettings";

export default {
  mixins: [creditSettings],
  data() {
    return {
      model: null,
      modelMultiple: [],
     
      options: {
        1: 'Вкл',
        0: 'Выкл'
      },
      Filials: this.$store.getters["creditsAdmin/getFilials"]
    };
  },
  async created() {
    try {
      await this.$store.dispatch("creditsAdmin/getFilials")
    } catch(error) {}
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
      // console.log('this.$refs.filials', this.$refs.filials[0])
      // this.$refs.filials[0].focus()
    }, 3000);

	}, 
	computed: {
    MORATORIUM_PERIODD() {
      return this.settings.APPSETTING.find(i => i.paramName == 'MORATORIUM_PERIOD')
    },
    APPLIFE_PERIOD() {
      return this.settings.APPSETTING.find(i => i.paramName == 'APPLIFE_PERIOD')
    },
    INPS_BANK() {
      return this.settings.APPSETTING.find(i => i.paramName == 'INPS_BANK')
    },
    REPEAT_INPS() {
      return this.settings.APPSETTING.find(i => i.paramName == 'REPEAT_INPS')
    },
    MANUAL_SALARY_INPUT() {
      return this.settings.APPSETTING.find(i => i.paramName == 'MANUAL_SALARY_INPUT')
    },
    REQ_RELATIVES_COUNT() {
      return this.settings.APPSETTING.find(i => i.paramName == 'REQ_RELATIVES_COUNT')
    },
    CONVENIENT_REPAYMENT() {
      return this.settings.APPSETTING.find(i => i.paramName == 'CONVENIENT_REPAYMENT')
    },
    REPEAT_ASOKI() {
      return this.settings.APPSETTING.find(i => i.paramName == 'REPEAT_ASOKI')
    },
    filials() {
      // console.log(JSON.stringify(this.$store.getters["creditsAdmin/getFilials"], null, 2))
      return this.$store.getters["creditsAdmin/getFilials"]
    },
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
  .settingsProcess {
    .borderRow {
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #E7E7E7;
      margin: 12px 0;
    }

    .toogleBtn {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .interval {
      font-size: 13px;
      line-height: 19px;
    }

    .customInput {
      padding-bottom: 0;
    }

    .add {
      margin-top: 12px;
    }

    .add2 {
      margin-top: 0px;
    }
    
    .removeItem {
      display: flex;
      align-items: center;
    }

  }

  .parent {
    font-weight: 600;
  }

  .child {
    padding-left: 20px;
  }

  .q-item{
    min-height: 15px;
    padding: 6px 16px;
  }
</style>
