<template>
  <div class="settingsCreditProduct" :id="title.id">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-9">
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <q-select
                    ref="loanProductСhar"
                    outlined
                    v-model="creditSettings.loanProductId"
                    :options="settings.LOAN_PRODUCT_CHAR"
                    option-value="id"
                    option-label="name"
                    emit-value
                    map-options
                    dense
                    label="Вид кредита"
                    :rules="[val => !!val || 'Выберите данные']"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-6"></div>
                <template v-if="creditSettings.loanProductId">
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharProductId"
                      outlined
                      v-model="settings.LOAN_PRODUCT_CHAR[index].productId"
                      dense
                      label="Код в ИАБС"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6"></div>
                  <div class="col-6">
                    <q-input
                      disable
                      ref=""
                      outlined
                      value="0"
                      dense
                      label="Минимальная сумма"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharMaxSum"
                      outlined
                      v-model="settings.LOAN_PRODUCT_CHAR[index].maxSum"
                      dense
                      label="Максимальная сумма"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharMinTerm"
                      outlined
                      v-model="settings.LOAN_PRODUCT_CHAR[index].minTerm"
                      dense
                      label="Срок от"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharMaxTerm"
                      outlined
                      v-model="settings.LOAN_PRODUCT_CHAR[index].maxTerm"
                      dense
                      label="Срок до"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharGracePeriodMin"
                      outlined
                      v-model="settings.LOAN_PRODUCT_CHAR[index].gracePeriodMin"
                      dense
                      label="Льготный период от"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharGracePeriodMax"
                      outlined
                      v-model="settings.LOAN_PRODUCT_CHAR[index].gracePeriodMax"
                      dense
                      label="Льготный период до"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharInterestRateMax"
                      outlined
                      v-model="
                        settings.LOAN_PRODUCT_CHAR[index].interestRateMax
                      "
                      @input="setSameData($event, index, 'interestRateMin')"
                      dense
                      label="Процентная ставка"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharExpiredInterestRateMax"
                      outlined
                      v-model="
                        settings.LOAN_PRODUCT_CHAR[index].expiredInterestRateMax
                      "
                      @input="setSameData($event, index, 'expiredInterestRateMin')"
                      dense
                      label="Процентная ставка за просрочку"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharFirstPayPercentMin"
                      outlined
                      v-model="
                        settings.LOAN_PRODUCT_CHAR[index].firstPayPercentMin
                      "
                      dense
                      label="Первоначальный платеж от"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="loanProductCharFirstPayPercentMax"
                      outlined
                      v-model="
                        settings.LOAN_PRODUCT_CHAR[index].firstPayPercentMax
                      "
                      dense
                      label="Первоначальный платеж до"
                      :rules="[val => integerPositiveValid(val)]"
                    />
                  </div>

                  <h4 class="collateralTitle">Вид поручительства</h4>
                
                  <div class="row col-12 items-center collateralBlock">
                    <div class="col-3">
                      <span>Поручитель</span>
                    </div>
                    <div class="col-9">
                      <q-option-group 
                        inline 
                        :options="options"
                        type="radio"
                        v-model="settings.LOAN_PRODUCT_CHAR[index].collateralGuarantor" 
                      />
                      
                    </div>
                  </div>

                  <div class="row col-12 items-center collateralBlock">
                    <div class="col-3">
                      <span>Страхование</span>
                    </div>
                    <div class="col-9">
                      <q-option-group 
                        inline 
                        :options="options"
                        type="radio"
                        v-model="settings.LOAN_PRODUCT_CHAR[index].collateralInsurance"
                      />
                      
                    </div>
                  </div>

                  <div class="row col-12 items-center collateralBlock">
                    <div class="col-3">
                      <span>Залог</span>
                    </div>
                    <div class="col-9">
                      <q-option-group
                        inline 
                        :options="options"
                        type="radio"
                        v-model="settings.LOAN_PRODUCT_CHAR[index].collateralPledge" 
                      />
                      
                    </div>
                  </div>
                  
                   <div class="btnBlockAdmin">
                    <q-btn unelevated label="Список целей" class="targetList" @click="getTargetList"/>
                  </div>

                </template>
              </div>
            </div>
            <div class="col-3"></div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from "../mixins/creditSettings";

import TargetList from "./TargetList";

export default {
  mixins: [creditSettings],
  data() {
    return {
      index: null,
      options: [
        { label: 'Да', value: 1 },
        { label: 'Нет', value: 0 }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 1000);
  },
  computed: {
    // startIdProduct() {
    //   return this.settings.loan_product_char[0].id
    // }
  },
  watch: {
    "creditSettings.loanProductId"() {
      console.log(this.creditSettings.loanProductId);
      this.index = this.settings.LOAN_PRODUCT_CHAR.findIndex(
        i => i.id == this.creditSettings.loanProductId
      );
      setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 3000);
    }
  },
  methods: {
    setSameData(event, index, item) {
      this.settings.LOAN_PRODUCT_CHAR[index][item] = event
    }, 

    getTargetList() {
      this.$q.dialog({
        component: TargetList,
        parent: this,
        data: {}
      })
    }
  }
};
</script>
<style lang="scss">
  .settingsCreditProduct {
    .collateralTitle {
      margin: 0;
      font-size: 16px;
    }

    .collateralBlock {
      padding-top: 0
    }
  }
</style>
