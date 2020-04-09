<template>
  <div class="registration">
    <div class="loaderForm" v-if="loaderForm">
      <appLoader />
    </div>

    <div v-else class="q-pa-md row justify-center">
      <form @submit.prevent.stop="onSubmit">
        <div class="row q-col-gutter-md">
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
                    :rules="[
                      (val) => (val && val.length > 1) || 'Введите фамилию',
                    ]"
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
                    :rules="[(val) => (val && val.length > 3) || 'Введите имя']"
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
                      (val) =>
                        (val && val.length == 9) ||
                        'Количество символов должно быт ровно 9',
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
                      (val) =>
                        (val && val.length === 19) || 'Введите номер телефона',
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
                    :rules="[
                      (val) => (val && val.length === 14) || 'Введите ПНФЛ',
                    ]"
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
                      (val) =>
                        (val && val.length === 9) ||
                        'Введите Серию и номер паспорта',
                    ]"
                  />
                </div>

                <div class="col-5 row content-between justify-end">
                  <div
                    v-if="personalData.personPhoto"
                    class="personPhoto_block"
                  >
                    <img
                      :src="'data:image/png;base64,' + personalData.personPhoto"
                      alt
                      class="personPhoto"
                    />
                  </div>
                  <div v-else class="default_personPhoto_block">
                    <img
                      src="~assets/images/default-avatar.png"
                      alt=""
                      class="default_personPhoto"
                    />
                  </div>
                </div>
              </div>

              <div class="row q-col-gutter-md justify-between">
                <div class="col-6">
                  <q-select
                    ref="typeCredit"
                    square
                    outlined
                    v-model="personalData.typeCredit"
                    :options="options.typeCredits"
                    dense
                    label="Кредитный продукт"
                    emit-value
                    map-options
                    :rules="[(val) => !!val || 'Выберите кредитный продукт']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    v-if="!!personalData.typeCredit"
                    ref="typeStepCredit"
                    square
                    outlined
                    v-model="personalData.typeStepCredit"
                    :options="options.typeStepCredits"
                    dense
                    label="Тип погашения кредита"
                    emit-value
                    map-options
                    :rules="[
                      (val) => !!val || 'Выберите тип погашения кредита',
                    ]"
                  />
                </div>
              </div>

              <div v-if="!!personalData.typeCredit" class="col-12">
                <h6 class="periodCredit">Выберите срок кредита</h6>
                <q-badge color="secondary">
                  Срок: {{ personalData.periodCredit }} ({{
                    periodCreditMin
                  }}
                  до {{ periodCreditMax }})
                </q-badge>
                <q-slider
                  v-model.number="personalData.periodCredit"
                  :min="periodCreditMin"
                  :max="periodCreditMax"
                  :step="1"
                  label
                  label-always
                  color="light-green"
                  :rules="[(val) => !!val || 'Выберите срок кредита']"
                />
              </div>

              <div class="row col-12 justify-center items-center">
                <!-- Preloader auto compleate -->
                <appLoader v-if="loader" />

                <!-- Button auto complete person data -->
                <app-auto-complete-data v-else />
              </div>
            </div>
          </div>

          <div class="col-5 q-col-gutter-md">
            <!-- Family status -->
            <div class="family-status tab">
              <h4 class="tab-title" ref="familyStatus">Семейное положение</h4>
              <div class="tab-content q-col-gutter-md" ref="tabContent">
                <q-select
                  square
                  outlined
                  v-model="personalData.familyStatus"
                  :options="options.family"
                  dense
                  label="Семейное положения"
                  emit-value
                  map-options
                />
                <q-select
                  square
                  outlined
                  v-model="personalData.children"
                  :options="options.children"
                  dense
                  label="Есть ли дети"
                  emit-value
                  map-options
                />
                <q-input
                  v-if="personalData.children"
                  square
                  outlined
                  v-model.number="personalData.childrenCount"
                  mask="##"
                  dense
                  label="Количество детей до 18 лет"
                />
              </div>
            </div>

            <!-- Expense/income -->
            <div class="expense-income tab">
              <h4 class="tab-title" ref="expenseIncome">
                Ежемесячные расходы/доходы
              </h4>
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
                    (val) =>
                      (val && val.length !== null) ||
                      'Поля должно быт заполнено',
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
                  emit-value
                  map-options
                />
                <q-input
                  v-if="personalData.externalIncome"
                  square
                  outlined
                  v-model.number="personalData.externalIncomeSize"
                  type="number"
                  dense
                  label="Размер дополнительного дохода"
                />
                <q-select
                  v-if="personalData.externalIncome"
                  square
                  outlined
                  v-model="personalData.additionalIncomeSource"
                  :options="options.additIncSourOption"
                  dense
                  label="Источник дополнительного дохода"
                />
              </div>
            </div>

            <!-- Credit result -->
            <div class="row ">
              <q-btn
                type="submit"
                color="green"
                label="РАССЧИТАТЬ КРЕДИТ"
                class="q-ml-sm full-width"
              />
            </div>

          </div>
        </div>
      </form>
      <!-- DigID Network error! -->
      <app-dig-id-network-error></app-dig-id-network-error>

      <apploaderFullScreen v-if="loaderPreApproval"></apploaderFullScreen>
      <!-- Pre-Approval -->
      <app-pre-approval v-else></app-pre-approval>
    </div>
  </div>
</template>
<script>
// import Vue from "vue";
import CommonUtils from "@/shared/utils/CommonUtils";
import PreApproval from "./PreApproval";
import AutoCompleteData from "./AutoCompleteData";
import DigIdNetworkError from "./DigIdNetworkError";
import Loader from "@/components/Loader";
import LoaderFullScreen from "@/components/LoaderFullScreen";
import  { validItems } from "../../filters/valid_filter"

// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }

export default {
  data() {
    return {
      periodCreditMin: null,
      periodCreditMax: null,
      loader: true,
      loaderForm: true,
      loaderPreApproval: false,
      options: {
        family: [
          {
            label: "Нет",
            value: false,
          },
          {
            label: "Женат / замужем",
            value: true,
          },
        ],
        children: [
          {
            label: "Да",
            value: true,
          },
          {
            label: "Нет",
            value: false,
          },
        ],
        // MONEY //
        extIncOption: [
          {
            label: "Да",
            value: true,
          },
          {
            label: "Нет",
            value: false,
          },
        ], //наличие дополнительного дохода
        additIncSourOption: [
          "Работа по найму",
          "Аренда движимого имущетсва",
          "Аренда недвижимого имущества",
          "Предпринимательская деятельность",
          "Дивиденды",
          "Другое",
        ], //источник дополнительного дохода

        typeCredits: [],

        typeStepCredits: [],
      },
    };
  },
  async created() {
    this.$store.commit("resetPersonData");

    try {
      const auth = await this.$store.dispatch("authBpm");
      console.log("auth", auth);

      const process = await this.$store.dispatch("startProcess");

      // console.log("process", process);
      // this.$store.commit("setTaskId", process.userTaskCreditDetailed.id);

      this.personalData.spouseCost =
        process.userTaskCreditDetailed.input.spouseCost;
      this.personalData.childCost =
        process.userTaskCreditDetailed.input.childCost;

      for (let typeCredit of process.userTaskCreditDetailed.input.credits) {
        const credits = {
          label: typeCredit.creditName.name,
          value: typeCredit.creditName.value,
          period: typeCredit.period,
          loanRate: typeCredit.loanRateBase,
          paymentTypes: typeCredit.paymentTypes,
        };

        this.options.typeCredits.push(credits);
      }

      console.log("typeCredits", this.options.typeCredits);
      this.loaderForm = false;
    } catch (error) {}

    try {
      const scannerSerial = await this.$store.dispatch("getDigIdNumber");
      this.$store.commit("sentScannerSerialNumber", scannerSerial);
      this.loader = false;
    } catch (err) {
      console.log("DigId", err);
      this.loader = false;
    }
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
    },
    credits() {
      return this.$store.state.credits;
    },
  },
  watch: {
    "personalData.typeCredit"(credit) {
      this.personalData.typeStepCredit = null;
      this.options.typeStepCredits = [];
      this.periodCreditMin = null;
      this.periodCreditMax = null;
      this.personalData.periodCredit = 0;
      this.personalData.loanRate = 0;

      const idxCredit = this.options.typeCredits.findIndex(
        (item) => item.value == credit
      );

      if (idxCredit !== -1) {
        for (let typeStepCredits of this.options.typeCredits[idxCredit]
          .paymentTypes) {
          const stepCredit = {
            label: typeStepCredits.name,
            value: typeStepCredits.value,
          };
          this.options.typeStepCredits.push(stepCredit);
        }

        this.periodCreditMin = Number(
          this.options.typeCredits[idxCredit].period[0].value
        );
        this.periodCreditMax = Number(
          this.options.typeCredits[idxCredit].period[1].value
        );
        this.personalData.periodCredit = Number(
          this.options.typeCredits[idxCredit].period[0].value
        );
        this.personalData.loanRate = Number(
          this.options.typeCredits[idxCredit].loanRate
        );
      }
    },
    "personalData.children"(status) {
      if (!status) {
        this.personalData.childrenCount = 0;
      }
    },

    "personalData.externalIncome"(status) {
      if (!status) {
        this.personalData.externalIncomeSize = 0;
        this.personalData.additionalIncomeSource = "";
      }
    },
  },
  methods: {
    async onSubmit() {
      this.$refs.surname.validate();
      this.$refs.name.validate();
      //this.$refs.mname.validate();
      this.$refs.inn.validate();
      this.$refs.phone.validate();
      this.$refs.pinpp.validate();
      this.$refs.pasport.validate();

      this.$refs.typeCredit.validate();

      if (!!this.personalData.typeCredit) {
        this.$refs.typeStepCredit.validate();
      } else {
        validItems(this.$refs, "typeStepCredit");
      }

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
        this.$refs.typeCredit.hasError ||
        this.$refs.typeStepCredit.hasError ||
        this.$refs.income.hasError ||
        this.$refs.expense.hasError ||
        this.$refs.otherExpenses.hasError
      ) {
        this.formHasError = true;
      } else {
        this.$store.commit("loadMessageChange", "");
        this.loaderPreApproval = true;
        const {
          children,
          familyStatus,
          childrenCount,
          typeStepCredit,
          typeCredit,
          income,
          otherExpenses,
          expense,
          externalIncomeSize,
          name,
          surname,
          mname,
          passport,
          phone,
          inn,
          pinpp,
          periodCredit,
          loanRate,
          spouseCost,
          childCost,
        } = this.personalData;

        const data = {
          output: [
            {
              name: "preApp",
              data: {
                maritalInfo: {
                  childrens: children,
                  status: familyStatus,
                  childrenCount: Number(childrenCount),
                },
                payment_id: Number(typeStepCredit),
                loan_product_id: Number(typeCredit),
                finance: {
                  incomingOther: externalIncomeSize, //доп. доход
                  expensesOther: otherExpenses, //др. переод. расходы
                  expensesPeriodic: expense, //переод. расходы
                  incomingConfirm: income, //ежем. доход
                },
                customer: {
                  firstName: name,
                  lastName: surname,
                  middleName: mname,
                  passport: {
                    number: Number(passport.slice(2)),
                    series: passport.slice(0, 2),
                  },
                  mainPhone: phone.replace(/[\s+()]/g, ""),
                  tin: Number(inn),
                  pinpp,
                },
              },
            },
            {
              name: "creditProduct",
              data: {
                spouseCost: Number(spouseCost),
                childCost: Number(childCost),
                creditTerm: Number(periodCredit),
                loanRate: Number(loanRate),
              },
            },
          ],
        };

        //console.log(JSON.stringify(data, null, 2))

        try {
          const resCredit = await this.$store.dispatch(
            "calculationCredit",
            data
          );

          console.log('resCredit', resCredit)

          this.credits.reasonsList = resCredit.nextTask.input.reasonsList;

          const resp = {
            income: resCredit.nextTask.input.incoming, // Сколько дохода учитываем
            expense: resCredit.nextTask.input.expenses, // Сколько расходов
            maxPayment: resCredit.nextTask.input.payment, // Сколько может платить в месяц
            maxSum: resCredit.nextTask.input.sum, // Сколько максимум кредита можем выдать
          };

          this.$store.commit("toggleConfirm", true);
          this.$store.commit("creditConfirm", resp);
          this.loaderPreApproval = false;
        } catch (e) {}
      }
    }
  },
  components: {
    appPreApproval: PreApproval,
    appAutoCompleteData: AutoCompleteData,
    appDigIdNetworkError: DigIdNetworkError,
    appLoader: Loader,
    apploaderFullScreen: LoaderFullScreen,
  },
};
</script>

<style lang="scss">
.registration {

  .loaderForm {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  .tab-title {
    background-color: #ededed;
    color: #0e3475;
    margin-top: 10px;
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

  .personPhoto_block,
  .default_personPhoto_block {
    width: 94%;
    height: auto;
    border: 1px solid #acacac;
  }

  .personPhoto,
  .default_personPhoto {
    width: 100%;
    display: block;
  }

  // .creditContent {
  //   width: 48%;
  // }

  .loader {
    margin-bottom: 15px;
  }

  .q-btn--rectangle {
    border-radius: 0;
  }

  .q-field--with-bottom,
  .q-pb-sm {
    padding-bottom: 16px;
  }

  .q-field__native,
  .q-field__prefix,
  .q-field__suffix {
    color: #acacac;
  }

  .q-field__bottom {
    padding: 1px 0 0 10px;
  }

  .periodCredit {
    margin: 0;
  }
}
</style>
