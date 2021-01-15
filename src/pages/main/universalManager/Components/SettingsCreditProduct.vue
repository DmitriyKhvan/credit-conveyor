<template>
  <div class="settingsCreditProduct">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title"
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
                    v-model="loanProductId"
                    :options="settings.loan_product_char"
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
                <template v-if="loanProductId">
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="settings.loan_product_char[index].productId"
                      dense
                      label="Код в ИАБС"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6"></div>
                  <div class="col-6">
                    <q-input
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
                      ref=""
                      outlined
                      v-model="settings.loan_product_char[index].maxSum"
                      dense
                      label="Максимальная сумма"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="settings.loan_product_char[index].minTerm"
                      dense
                      label="Срок от"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="settings.loan_product_char[index].maxTerm"
                      dense
                      label="Срок до"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="settings.loan_product_char[index].gracePeriodMin"
                      dense
                      label="Льготный период от"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="settings.loan_product_char[index].gracePeriodMax"
                      dense
                      label="Льготный период до"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="
                        settings.loan_product_char[index].interestRateMax
                      "
                      dense
                      label="Процентная ставка"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="
                        settings.loan_product_char[index].expiredInterestRateMax
                      "
                      dense
                      label="Процентная ставка за просрочку"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="
                        settings.loan_product_char[index].firstPayPercentMin
                      "
                      dense
                      label="Первоначальный платеж от"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      v-model="
                        settings.loan_product_char[index].firstPayPercentMax
                      "
                      dense
                      label="Первоначальный платеж до"
                      :rules="[val => !!val || 'Введите данные']"
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
                        v-model="settings.loan_product_char[index].collateralGuarantor" 
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
                        v-model="settings.loan_product_char[index].collateralInsurance"
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
                        v-model="settings.loan_product_char[index].collateralPledge" 
                      />
                      
                    </div>
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

export default {
  mixins: [creditSettings],
  data() {
    return {
      loanProductId: null,
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
    }, 100);
  },
  computed: {},
  watch: {
    loanProductId(loanProductId) {
      console.log(loanProductId);
      this.index = this.settings.loan_product_char.findIndex(
        i => i.id == loanProductId
      );
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
