<template>
  <div class="registration">
    <div class="loaderForm" v-if="loaderForm">
      <appLoader />
    </div>

    <div v-else class="q-pa-md row justify-center">
      <form @submit.prevent.stop="onSubmit" class="preapprovForm">
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
                      val => (val && val.length > 1) || 'Введите фамилию'
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
                        (val && val.length == 9) ||
                        'Количество символов должно быт ровно 9'
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
                      val =>
                        (val && val.length === 19) || 'Введите номер телефона'
                    ]"
                  />
                  <q-input
                    ref="pinpp"
                    square
                    outlined
                    v-model.lazy="personalData.pinpp"
                    dense
                    :hint="loadMessage"
                    :disable="disableInput"
                    label="ПИНФЛ"
                    mask="##############"
                    :rules="[
                      val => (val && val.length === 14) || 'Введите ПНФЛ'
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
                      val =>
                        (val && val.length === 9) ||
                        'Введите Серию и номер паспорта'
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
                    :rules="[val => !!val || 'Выберите кредитный продукт']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    v-if="!!personalData.typeCredit && personalData.typeCredit != 3"
                    ref="typeStepCredit"
                    square
                    outlined
                    v-model="personalData.typeStepCredit"
                    :options="options.typeStepCredits"
                    dense
                    label="Тип графика гашения"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите тип графика гашения']"
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
                  :rules="[val => !!val || 'Выберите срок кредита']"
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

          <div class="col-5">
            <!-- Family status -->
            <div class="family-status tab">
              <h4 class="tab-title">Семейное положение</h4>
              <div class="tab-content q-col-gutter-md" ref="tabContent">
                <q-select
                  ref="familyStatus"
                  square
                  outlined
                  v-model="personalData.familyStatus"
                  :options="options.family"
                  dense
                  label="Семейное положения"
                  emit-value
                  map-options
                  :rules="[val => !!val || 'Выберите семейное положение']"
                />
                <q-select
                  square
                  outlined
                  v-model="personalData.children"
                  :options="credits.options.confirmation"
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
                    val =>
                      (val && val.length !== null) ||
                      'Поля должно быт заполнено'
                  ]"
                />

                <!-- Для форматирования числе -->
                <!-- <q-input
                  ref="income"
                  square
                  outlined
                  v-model="personalData.income"
                  dense
                  label="Подтвержденный ежемесячный доход"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length !== null) ||
                      'Поля должно быт заполнено'
                  ]"
                /> -->
                 
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
                
                <div class="q-col-gutter-md">
                  <q-select
                    square
                    outlined
                    v-model="personalData.externalIncome"
                    :options="credits.options.confirmation"
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
                    emit-value
                    map-options
                  />

                  <q-select
                    ref="loan_purpose"
                    square
                    outlined
                    v-model="personalData.loan_purpose"
                    :options="options.loanPurpose"
                    dense
                    label="Цель кредитования"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите цель кредитования']"
                  />
                </div>
              </div>
            </div>

            <!-- Credit result -->
            <div class="row calCreditBtn">
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
      <appDigIdNetworkError />

      <appLoaderFullScreen v-if="loaderFullScreen" />
      <!-- Pre-Approval -->
      <appPreApproval 
        v-else
        @toggleLoaderFullScreen="($event) => loaderFullScreen = $event" 
        @toggleLoaderForm="($event) => loaderForm = $event"
      />
    </div>
  </div>
</template>
<script>
import CommonUtils from "@/shared/utils/CommonUtils";
import formatNumber from "../../filters/format_number.js";
import PreApproval from "./PreApproval";
import AutoCompleteData from "./AutoCompleteData";
import DigIdNetworkError from "./DigIdNetworkError";
import Loader from "@/components/Loader";
import LoaderFullScreen from "@/components/LoaderFullScreen";
import { validItems } from "../../filters/valid_filter";

export default {
  data() {
    return {
      periodCreditMin: null,
      periodCreditMax: null,
      loader: true,
      loaderForm: false,
      loaderFullScreen: false,
      options: {
        family: [],
        //наличие дополнительного дохода
        additIncSourOption: [
          // {
          //   label: "Работа по найму",
          //   value: 11
          // },
          // {
          //   label: "Аренда движимого имущества",
          //   value: 12
          // },
          // {
          //   label: "Аренда недвижимого имущества",
          //   value: 13
          // },
          // {
          //   label: "Предпринимательская деятельность",
          //   value: 14
          // },
          // {
          //   label: "Дивиденды",
          //   value: 15
          // },
          // {
          //   label: "Другое",
          //   value: 16
          // }
        ], 

        //источник дополнительного дохода
        typeCredits: [],

        //тип графика гашения
        typeStepCredits: [],

        // цель кредитования
        loanPurpose: []
      }
    };
  },
  async created() {
    this.$store.commit("credits/resetPersonData");

    try {
      this.loaderForm = true
      const auth = await this.$store.dispatch("credits/authBpm");
      console.log("auth", auth);
      const process = await this.$store.dispatch("credits/startProcess");
      console.log("process", process);

      this.personalData.spouseCost =
        (process.userTaskCreditDetailed.input.find(i => i.label == "spouseCost")).data;
      this.personalData.childCost =
        (process.userTaskCreditDetailed.input.find(i => i.label == "childCost")).data;

      this.options.family = 
        (process.userTaskCreditDetailed.input
        .find(i => i.label == "maritalStatus")).data.items
        .map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })

      this.options.additIncSourOption = 
        (process.userTaskCreditDetailed.input
        .find(i => i.label == "incomeSource")).data.items
        .map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })

      this.options.loanPurpose = 
        (process.userTaskCreditDetailed.input
        .find(i => i.label == "loanPupose")).data.items
        .map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })

      console.log('family', this.options.family)

      const loan_product_listt = process.userTaskCreditDetailed.input.find(i => i.label == "loan_product_list")
      const loan_product_dict = process.userTaskCreditDetailed.input.find(i => i.label == "loan_product_dict")

      loan_product_listt.data.items.forEach(i => {
        const { Loan_dict } = loan_product_dict.data.items.find(j => j.id == i.value)
        const credits = {
          label: i.label,
          value: Number(i.value),
          period: Loan_dict.terms_list.items,
          loanRate: Loan_dict.loan_rate_base,
          paymentTypes: Loan_dict.payment_type.items
        };

        this.options.typeCredits.push(credits);
      })

      console.log("typeCredits", this.options.typeCredits);
      this.loaderForm = false
    } catch (error) {
      this.loaderForm = false
    }

    try {
      const scannerSerial = await this.$store.dispatch("credits/getDigIdNumber");
      this.$store.commit("credits/sentScannerSerialNumber", scannerSerial);
      this.loader = false;
    } catch (err) {
      console.log("DigId", err);
      this.loader = false;
    }
  },
  computed: {
    loadMessage() {
      return this.$store.getters["credits/credits"].loadMessage
    },
    disableInput() {
      return this.$store.getters["credits/credits"].disableInput
    },
    // disableBtn() {
    //   return this.$store.state.credits.disableBtn;
    // },
    personalData() {
      return this.$store.getters["credits/credits"].personalData
    },
    credits() {
      return this.$store.getters["credits/credits"];
    }
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
        item => item.value == credit
      );

      if (idxCredit !== -1) {

        this.options.typeStepCredits = this.options.typeCredits[idxCredit].paymentTypes.map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })

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
    // Для форматирования чисeл
    // "personalData.income"(number) {
    //   console.log(formatNumber(number)) 
    //   this.personalData.income = formatNumber((this.personalData.income).replace(/\s+/g, ''))
    // }
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

      if (!!this.personalData.typeCredit && this.personalData.typeCredit != 3) {
        this.$refs.typeStepCredit.validate();
      } else {
        validItems(this.$refs, "typeStepCredit");
      }

      this.$refs.familyStatus.validate();
      this.$refs.income.validate();
      this.$refs.expense.validate();
      this.$refs.otherExpenses.validate();
      this.$refs.loan_purpose.validate();

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
        this.$refs.familyStatus.hasError ||
        this.$refs.income.hasError ||
        this.$refs.expense.hasError ||
        this.$refs.otherExpenses.hasError ||
        this.$refs.loan_purpose.hasError
      ) {
        this.formHasError = true;
      } else {
        this.$store.commit("credits/loadMessageChange", "");

        this.credits.confirmCreditData = {
          output: [
            {
              name: "confirm",
              data: true
            },
            {
              name: "reasons",
              data: []
            }
          ]
        }

        this.loaderFullScreen = true;
        const {
          children,
          familyStatus,
          childrenCount,
          typeStepCredit,
          typeCredit,
          income,
          loan_purpose,
          otherExpenses,
          expense,
          externalIncomeSize,
          additionalIncomeSource,
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
          childCost
        } = this.personalData;

        const data = {
          output: [
            {
              name: "preApp",
              data: {
                maritalInfo: {
                  childrens: children,
                  status: this.options.family.find(i => i.value == familyStatus) ? (this.options.family.find(i => i.value == familyStatus)).label : "",
                  statusId: Number(familyStatus),
                  childrenCount: Number(childrenCount)
                },
                //payment_id: Number(typeStepCredit),
                loan_product_id: Number(typeCredit),
                finance: {
                  loan_purpose, // цель кредитования
                  incomingOther: externalIncomeSize, //доп. доход
                  expensesOther: otherExpenses, //др. переод. расходы
                  expensesPeriodic: expense, //переод. расходы
                  incomingConfirm: income, //ежем. доход
                  incomeType: additionalIncomeSource //тип доп. дохода
                },
                customer: {
                  firstName: name,
                  lastName: surname,
                  middleName: mname,
                  passport: {
                    number: Number(passport.slice(2)),
                    series: passport.slice(0, 2)
                  },
                  mainPhone: phone.replace(/[\s()]/g, ""),
                  tin: inn,
                  pinpp
                }
              }
            },
            {
              name: "creditProduct",
              data: {
                repaymentType: Number(typeStepCredit),
                spouseCost: Number(spouseCost),
                childCost: Number(childCost),
                creditTerm: Number(periodCredit),
                loanRate: Number(loanRate)
              }
            }
          ]
        };

        console.log(JSON.stringify(data, null, 2));

        try {
         
          const resCredit = await this.$store.dispatch(
            "credits/confirmationCredit",
            data
          );

          console.log("resCredit", resCredit);

          const preApproval = resCredit.nextTask.input.find(i => i.label == 'preApproval').data
          this.credits.infoList = resCredit.nextTask.input.find(i => i.label == 'InfoList').data
          this.credits.reasonsList = resCredit.nextTask.input.find(i => i.label == 'reasons_list').data.items;
         
          this.$store.commit("credits/toggleConfirm", true);
          this.$store.commit("credits/creditConfirm", preApproval);
          
          this.loaderFullScreen = false;
        } catch (e) {
          this.loaderFullScreen = false;
        }
      }
    }
  },
  components: {
    appPreApproval: PreApproval,
    appAutoCompleteData: AutoCompleteData,
    appDigIdNetworkError: DigIdNetworkError,
    appLoader: Loader,
    appLoaderFullScreen: LoaderFullScreen
  }
};
</script>

<style lang="scss">
.registration {

  .preapprovForm {
    width: 80%
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

  .calCreditBtn {
    padding-top: 16px;
  }
}
</style>
