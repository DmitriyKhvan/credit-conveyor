<template>
  <div class="q-pa-md row justify-center">
    <form @submit.prevent.stop="onSubmit">
    <div class="row q-gutter-md" style="width: 1110px">
      
        <div class="col-7">
        
          <!-- Private data person -->
          <div class="privat-data tab">
            <h4 class="tab-title" ref="privatData">Персональные данные</h4>
            
            <div class="tab-content row" ref="tabContent">
              <div class="col-7"> 
                <q-input
                  ref="surname"
                  square
                  outlined
                  v-model="personalData.surname"
                  dense
                  :hint="loadMessage"
                  :disable="disableInput"
                  label="Фамилия"
                  lazy-rules
                  :rules="[val => (val && val.length > 3) || 'Введите фамилию']"
                />
                <q-input
                  ref="name"
                  square
                  outlined
                  v-model="personalData.name"
                  dense
                  :hint="loadMessage"
                  :disable="disableInput"
                  label="Имя"
                  lazy-rules
                  :rules="[val => (val && val.length > 3) || 'Введите имя']"
                />
                <q-input
                  ref="mname"
                  square
                  outlined
                  v-model="personalData.mname"
                  dense
                  label="Отчество"
                  lazy-rules
                  :rules="['Введите отчество']"
                />
                <q-input
                  ref="inn"
                  square
                  outlined
                  v-model="personalData.inn"
                  dense
                  :hint="loadMessage"
                  label="ИНН"
                  mask="#########"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length >= 9) ||
                      'Количество символов должно быт болше или ровно 9'
                  ]"
                />
                <q-input
                  ref="phone"
                  square
                  outlined
                  v-model="personalData.phone"
                  dense
                  label="Тел. номер"
                  mask="+### (##) ### ## ##"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 19) || 'Введите номер телефона'
                  ]"
                />
                <q-input
                  ref="pinpp"
                  square
                  outlined
                  v-model="personalData.pinpp"
                  dense
                  :hint="loadMessage"
                  :disable="disableInput"
                  label="ПИНФЛ"
                  mask="##############"
                  lazy-rules
                  :rules="[val => (val && val.length === 14) || 'Введите ПНФЛ']"
                />
                <q-input
                  ref="pasport"
                  square
                  outlined
                  v-model="personalData.passport"
                  dense
                  :hint="loadMessage"
                  :disable="disableInput"
                  label="Серия номер паспорта"
                  mask="AA#######"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length === 9) ||
                      'Введите Серию и номер паспорта'
                  ]"
                />
              </div>

              <div class="col-5 row content-between justify-end">
                <div v-if="personalData.personPhoto" class="personPhoto_block">
                  <img 
                    :src="'data:image/png;base64,' + personalData.personPhoto" 
                    alt=""
                    class="personPhoto" />
                </div>
                <div v-else class="default_personPhoto_block">
                  <img 
                    src="../../assets/default-avatar.png" 
                    alt="" 
                    class="default_personPhoto">
                </div>
              </div>
            </div>

            <!-- Preloader auto compleate -->
            <div class="row justify-center loader" v-if="loader">
              <q-spinner-ios
                color="primary"
                size="2em"
              />
              <q-tooltip :offset="[0, 8]">Пожалуйста подождите</q-tooltip>
            </div>
            
            <!-- Button auto complete person data -->
            <div v-else>
               <app-auto-complete-data></app-auto-complete-data>
            </div>
           
            <div class="row justify-between">
              <div class="creditContent" ref="creditContent">
                <q-select
                  square
                  outlined
                  v-model="personalData.typeCredit"
                  :options="options.typeCredit"
                  dense
                  label="Кредитный продукт"
                  class="q-pb-sm"
                />
              </div>

              <div class=" creditContent" ref="creditContent">
                <q-select
                  square
                  outlined
                  v-model="personalData.typeStepCredit"
                  :options="options.typeStepCredit"
                  dense
                  label="Тип пошагового кредита"
                  class="q-pb-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <!-- Family status -->
          <div class="family-status tab">
            <h4 class="tab-title" ref="familyStatus">Семейное положение</h4>
            <div class="tab-content" ref="tabContent">
              <q-select
                square
                outlined
                v-model="personalData.familyStatus"
                :options="options.family"
                dense
                label="Семейное положения"
                class="q-pb-sm"
              />
              <q-select
                square
                outlined
                v-model="personalData.children"
                :options="options.children"
                dense
                label="Есть ли дети"
                class="q-pb-sm"
              />
              <q-input
                v-if="personalData.children == 'Да'"
                square
                outlined
                v-model="personalData.childrenCount"
                mask="##"
                dense
                label="Количество детей до 18 лет"
                class="q-pb-sm"
              />
            </div>
          </div>

          <!-- Expense/income -->
          <div class="expense-income tab">
            <h4 class="tab-title" ref="expenseIncome">Ежемесячные расходы/доходы</h4>
            <div class="tab-content" ref="tabContent">
              <q-input
                ref="income"
                square
                outlined
                v-model.number="personalData.income"
                type="number"
                dense
                label="Подтвержденный ежемесячный доход"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length !== null) || 'Поля должно быт заполнено'
                ]"
              />
              <q-input
                ref="expense"
                square
                outlined
                v-model.number="personalData.expense"
                type="number"
                dense
                label="Периодические расходы "
                lazy-rules
                :rules="['Поля должно быть заполнено']"
              />
              <q-input
                ref="otherExpenses"
                square
                outlined
                v-model.number="personalData.otherExpenses"
                type="number"
                dense
                label="Плата за облуживание других обязательств"
                lazy-rules
                :rules="['Поля должно быт заполнено']"
              />
              <q-select
                square
                outlined
                v-model="personalData.externalIncome"
                :options="options.extIncOption"
                dense
                label="Наличие дополнительного дохода"
                class="q-pb-sm"
              />
              <q-input
                v-if="personalData.externalIncome == 'Да'"
                square
                outlined
                v-model.number="personalData.externalIncomeSize"
                type="number"
                dense
                label="Размер дополнительного дохода"
                class="q-pb-sm"
              />
              <q-select
                v-if="personalData.externalIncome == 'Да'"
                square
                outlined
                v-model="personalData.additionalIncomeSource"
                :options="options.additIncSourOption"
                dense
                label="Источник дополнительного дохода"
                class="q-pb-sm"
              />
            </div>

            <!-- Credit result -->
            <div class="row">
              <q-btn
                type="submit"
                color="green"
                label="РАССЧИТАТЬ КРЕДИТ"
                class="q-ml-sm full-width"
              />
            </div>

          </div>
        </div>
    </div>
</form>
    <!-- DigID Network error! -->
    <app-dig-id-network-error></app-dig-id-network-error>

    <!-- Pre-Approval -->
    <app-pre-approval></app-pre-approval>
  </div>
</template>
<script>
import PreApproval from "./PreApproval";
import AutoCompleteData from "./AutoCompleteData";
import DigIdNetworkError from "./DigIdNetworkError.vue";

export default {
  data() {
    return {
      loader: true,
      //icon: false,
      options: {
        family: [
          "Женат",
          "Замужем",
          "Холост",
          "Не замужем",
          "Вдова",
          "Вдовец",
          "Разведен",
          "Разведена",
          "Вдовец",
          "Гражданский брак"
        ],
        children: ["Да", "Нет"],
        // MONEY //
        extIncOption: ["Да", "Нет"], //наличие дополнительного дохода
        additIncSourOption: [
          "Работа по найму",
          "Аренда движимого имущетсва",
          "Аренда недвижимого имущества",
          "Предпринимательская деятельность",
          "Дивиденды",
          "Другое"
        ], //источник дополнительного дохода

        typeCredit: [
          "Кредит 1",
          "Кредит 2",
          "Кредит 3",
          "Кредит 4"
        ],

        typeStepCredit: [
          "Шаг 1",
          "Шаг 2",
          "Шаг 3",
          "Шаг 4"
        ]
      }
    };
  },
  created() {
    const data = {
      "refresh-groups": true,
      "requested-lifetime": 7200
    };

    this.$store
      .dispatch("authProcess", data)
      .then(res => {
        sessionStorage.setItem("token", res);
      })
      .catch(err => {
        console.log(err);
      });

    const token = sessionStorage.getItem("token");

    this.$store
      .dispatch("startProcess", token)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch("getDigIdNumber")
      .then(res => {
        const scannerSerial = res.ServiceInfo.ScannerSerial;
        this.$store.commit("sentScannerSerialNumber", scannerSerial);
        this.loader = false;
      })
      .catch(err => {
        console.log(err);
        this.loader = false;
      });

  },
  computed: {
    loadMessage() {
      return this.$store.state.credits.loadMessage;
    },
    disableInput() {
      return this.$store.state.credits.disableInput;
    },
    disableBtn() {
      return this.$store.state.credits.disableBtn;
    },
    personalData() {
      return this.$store.state.credits.personalData;
    }
  },

  methods: {
    onSubmit() {
      this.$refs.surname.validate();
      this.$refs.name.validate();
      //this.$refs.mname.validate();
      this.$refs.inn.validate();
      this.$refs.phone.validate();
      this.$refs.pinpp.validate();
      this.$refs.pasport.validate();

      this.$refs.income.validate();
      this.$refs.expense.validate();
      this.$refs.otherExpenses.validate();

      if (
        this.$refs.surname.hasError ||
        this.$refs.name.hasError ||
        //this.$refs.mname.hasError ||
        this.$refs.inn.hasError ||
        this.$refs.phone.hasError ||
        this.$refs.pinpp.hasError ||
        this.$refs.pasport.hasError ||

        this.$refs.income.hasError ||
        this.$refs.expense.hasError ||
        this.$refs.otherExpenses.hasError
      ) {
        this.formHasError = true;
      } else {
        this.$store.commit('loadMessageChange', "");

        // Настройки кредиты
        let spouseCost = 300000; // Стоимость жены
        let childCost = 200000; // Стоимость ребенка
        let loanRate = 25; // Ставка по кредиту (%)
        let creditTerm = 60; // Срок кредита (месяцы)

        // Расчеты по семейному статусу
        let spouse = 0;
        let child = 0;
        if (
          this.personalData.familyStatus === "Женат" ||
          this.personalData.familyStatus === "Замужем"
        ) {
          // Если женат/замужем, то добавляем расходы на супругу/супруга
          spouse = spouseCost;
        }
        if (this.personalData.children === "Да") {
          // Если есть дети, умножаем детей количество детей на их стоимость
          child = parseInt(this.personalData.childrenCount) * childCost;
        }

        // Расчеты максимальной суммы
        let finInc =
          (parseInt(this.personalData.income) +
            parseInt(this.personalData.externalIncomeSize)) *
          0.8;
        let finExp =
          spouse +
          child +
          parseInt(this.personalData.expense) +
          parseInt(this.personalData.otherExpenses);
        let maxPayment = finInc - finExp;
        let percent = loanRate / 100 / 12;
        let maxSum = parseInt(
          maxPayment /
            (percent + percent / (Math.pow(1 + percent, creditTerm) - 1))
        );

        let resp = {
          income: finInc, // Сколько дохода учитываем
          expense: finExp, // Сколько расходов
          maxPayment: maxPayment, // Сколько может платить в месяц
          maxSum: maxSum, // Сколько максимум кредита можем выдать
          //preApprovalForm: true
        };

        // eslint-disable-next-line
        // console.log("Результаты вычисления", resp);

        this.$store.commit("toggleConfirm", true);
        this.$store.commit("creditConfirm", resp);
       
      }
    }
    
  },
  components: {
    appPreApproval: PreApproval,
    appAutoCompleteData: AutoCompleteData,
    appDigIdNetworkError: DigIdNetworkError
  }
};
</script>

<style lang="scss" scoped>
  .tab-title {
    background-color: #ededed;
    color: #0e3475;
    margin-top: 7px;
    padding: 9px 11px;
    border: none;
    text-align: left;
    outline: none;
    font-size: 16px;
    //text-transform: uppercase
  }

  .tab-content {
    color: #212121;
  }

  .personPhoto_block, .default_personPhoto_block {
    width: 94%;
    height: auto;
    border: 1px solid #acacac;
  }

  .personPhoto, .default_personPhoto {
    width: 100%;
    display: block;
  }

  .creditContent {
    width: 48%;
  }

  .loader {
    margin-bottom: 15px;
  }

</style>

<style lang="scss">
  .q-field__bottom {
    padding: 1px 0 0 10px;
  }

  .q-btn--rectangle {
    border-radius: 0;
  }

  .q-field--with-bottom, .q-pb-sm {
    padding-bottom: 16px;
  }

  .q-field__native, .q-field__prefix, .q-field__suffix {
    color: #acacac;
  }
</style>
