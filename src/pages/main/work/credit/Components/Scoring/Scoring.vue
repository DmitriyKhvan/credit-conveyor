<template>
  <div class="scoring">
    <h2 class="scoring__title">Название филиала: {{ data.BranchName }}</h2>
    <h2 class="scoring__title">Результаты скоринга:</h2>
    
    <div class="row scoringList q-col-gutter-xl">
      <div class="col-6">

        <div class="scoringList__block">
          <h3 class="scoringList__title">1. Минимальные требования:</h3>
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">1.1 Возраст</p>
            </div>

            <div class="col-5">
              <p class="scoringList__value">
                {{data.Customer.BirthDate ? "Соответствует" : "Не соответствует"}}
                
              </p>
            </div>  
          </div>
          
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">1.2 Гражданство</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                {{data.Customer.ResidentFlag ? "Соответствует" : "Не соответствует"}}
              </p>
            </div>
          </div>

          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">1.3 Опыт работы</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                {{
                  data.Customer.JobInfo.lastJobExperienceMonths 
                  ? "Соответствует"
                    : data.Customer.JobInfo.activeYears 
                      ? "Соответствует"
                      : "Не соответствует"}}
              </p>
            </div>
          </div>
        </div>

        <div class="scoringList__block">
          <div class="row">
            <div class="col-7">
              <h3 class="scoringList__title">2. ГСЗ:</h3>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                Соответствует
              </p>
            </div>
          </div>
          
        </div>

        <div class="scoringList__block">
          <div class="row">
            <div class="col-7">
              <h3 class="scoringList__title">3. Черные списки:</h3>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                Соответствует
              </p>
            </div>
          </div>
          
        </div>
      </div>

      <div class="col-6">
        <div class="scoringList__block">
          <div class="row">
            <div class="col-7">
              <h3 class="scoringList__title">4. ЛСБО:</h3>
            </div>
            <div class="col-5">
              <q-checkbox v-model="val" disable/>
            </div>
          </div>
          
        </div>

        <div class="scoringList__block">
          <h3 class="scoringList__title">5. Внутренняя кредитная история:</h3>
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">5.1 Количество кредитов в НБУ</p>
            </div>

            <div class="col-5">
              <p class="scoringList__value">
                2
              </p>
            </div>  
          </div>
          
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">5.2 Общая сумма кредитов (неоплаченный остаток)</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                20 000 000 сум
              </p>
            </div>
          </div>

          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">5.3 Общая сумма ежемесячных платежей по кредитам</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                20 000 000 сум
              </p>
            </div>
          </div>
        </div>

        <!-- <div class="scoringList__block">
          <h3 class="scoringList__title">6. Внешняя кредитная история:</h3>
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">6.1 Количество кредитов в других банках</p>
            </div>

            <div class="col-5">
              <p class="scoringList__value">
                2
              </p>
            </div>  
          </div>
          
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">6.2 Общая сумма кредитов (неоплаченный остаток)</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                20 000 000 сум
              </p>
            </div>
          </div>

          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">6.3 Общая сумма ежемесячных платежей по кредитам</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                20 000 000 сум
              </p>
            </div>
          </div>
        </div>

        <div class="scoringList__block">
          <h3 class="scoringList__title">7. Депозиты клиентов в НБУ:</h3>
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">7.1 Количество депозитов</p>
            </div>

            <div class="col-5">
              <p class="scoringList__value">
                2
              </p>
            </div>  
          </div>
          
          <div class="row subList">
            <div class="col-7">
              <p class="scoringList__field">7.2 Общее сумма депозитов</p>
            </div>
            <div class="col-5">
              <p class="scoringList__value">
                20 000 000 сум
              </p>
            </div>
          </div>

        </div> -->
      </div>
    </div>

    <div class="maxSum">
      <h3 class="scoringList__title">Расчетная сумма кредита</h3>
      <p class="scoringList__value">
        {{ data.LoanInfo.max_loan_sum_preapprove }} сум
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      val: false,
      // birthday: null,
    };
  },
  computed: {
    // BirthDate() {
    //   return (new Date() - new Date(data.Customer.BirthDate)).getYear()
    // }
  },
};
</script>

<style lang="scss">
.scoring {
  // padding: 40px;

  &__title {
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 27px;
    text-align: center;
  }

  .scoringList {
    .row {
      display: flex;
      align-items: center;
    }

    .subList {
      margin: 10px 0 0 20px;
    }

    &__title {
      font-size: 16px;
      margin: 0;
      line-height: 22px;
      font-weight: bold;
    }

    &__field {
      font-size: 14px;
    }

    &__value {
      background: #F8F8F8;
      border: 1px solid #DADADA;
      padding: 7px 11px;
    }

    &__block {
      margin-bottom: 30px;
    }
  }

  .maxSum {
    display: flex;
    justify-content: center;
    align-items: center;

    .scoringList__title {
      margin-right: 20px;
    }
  }
}
</style>