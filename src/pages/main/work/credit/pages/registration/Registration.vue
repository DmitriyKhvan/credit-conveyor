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
                    :rules="[
                      val => (val && val.length > 1) || 'Введите фамилию',
                      val => fioValid(val)
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
                    :rules="[
                      val => (val && val.length > 3) || 'Введите имя',
                      val => fioValid(val)
                    ]"
                  />
                  <q-input
                    ref="mname"
                    square
                    outlined
                    v-model="personalData.mname"
                    dense
                    :hint="loadMessage"
                    :disable="disableInput"
                    label="Отчество"
                    :rules="[
                      val => !!val || 'Введите отчество',
                      val => fioValid(val)
                    ]"
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
                    
                    :rules="[
                      val =>
                        (val && val.length == 9) ||
                        'Количество символов должно быт ровно 9',
                      val => !val.match(/(?=(.))\1{9,}/) || 
                        'Неверные данные'
                    ]"
                  />
                  <q-input
                    ref="phone"
                    square
                    outlined
                    v-model="personalData.phone"
                    dense
                    label="Тел. номер"
                    mask="+############"
                    :rules="[
                      val =>
                        (val && val.length === 13) || 'Введите номер телефона',
                      val => !val.match(/(?=([^1-9]))\1{7,}/) || 
                        'Неверные данные'
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
                      val => (val && val.length === 14) || 'Введите ПНФЛ',
                      val => !val.match(/(?=(.))\1{14,}/) || 
                        'Неверные данные'
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
                    :rules="[
                      val =>
                        (val && val.length === 9) ||
                        'Введите Серию и номер паспорта',
                       val => !val.match(/(?=(.))\1{7,}/) || 
                        'Неверные данные'
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
                    @input="onChangeLoan($event)"
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
                  <q-input
                    ref="periodCredit"
                    square
                    outlined
                    v-model.number="personalData.periodCredit"
                    type="number"
                    dense
                    label="Срок кредита"
                    :rules="[
                      val => !!val || 'Выберите срок кредита',
                      val => (val <= periodCreditMax && val >= periodCreditMin) || 
                        `Срок кредита между ${periodCreditMin} - ${periodCreditMax} мес.`
                    ]"
                  />
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
                />
              </div>

              <div class="row col-12 justify-center items-center">
                <!-- Preloader auto compleate -->
                <appLoader v-if="loader" />

                <!-- Button auto complete person data -->
                <app-auto-complete-data v-else-if="scannerSerialNumber" />
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
                  ref="childrenCount"
                  v-if="personalData.children"
                  square
                  outlined
                  v-model.number="personalData.childrenCount"
                  type="number"
                  dense
                  label="Количество детей до 18 лет"
                  :rules="[
                      val =>
                        (val && val > 0) ||
                        'Введите количество детей'
                    ]"
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
                  :rules="[
                    val => !!val || 'Поля должно быт заполнено',
                    val => val > 0 || 'Некорректные данные'
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
                  :rules="[
                    val => !!val || 'Поля должно быт заполнено',
                    val => val > 0 || 'Некорректные данные'
                  ]"
                />
                <q-input
                  ref="otherExpenses"
                  square
                  outlined
                  v-model.number="personalData.otherExpenses"
                  type="number"
                  dense
                  label="Плата за облуживание других обязательств"
                  :rules="[
                    val => val >= 0 || 'Некорректные данные'
                  ]"
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
                    ref="externalIncomeSize"
                    v-if="personalData.externalIncome"
                    square
                    outlined
                    v-model.number="personalData.externalIncomeSize"
                    type="number"
                    dense
                    label="Размер дополнительного дохода"
                    :rules="[
                      val => !!val || 'Поля должно быт заполнено',
                      val => val > 0 || 'Некорректные данные'
                    ]"
                  />
                  <q-select
                    ref="additionalIncomeSource"
                    v-if="personalData.externalIncome"
                    square
                    outlined
                    v-model="personalData.additionalIncomeSource"
                    :options="options.additIncSourOption"
                    dense
                    label="Источник дополнительного дохода"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Поля должно быт заполнено']"
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

      <appLoaderFullScreen v-if="loaderFullScreen" />
      <!-- Pre-Approval -->
      <appPreApproval 
        v-else
        :confirm="confirm"
        @toggleLoaderFullScreen="($event) => loaderFullScreen = $event" 
        @toggleLoaderForm="($event) => loaderForm = $event"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from 'vuex';
import CommonUtils from "@/shared/utils/CommonUtils";
import formatNumber from "../../filters/format_number.js";
import PreApproval from "./PreApproval";
import AutoCompleteData from "./AutoCompleteData";
import Loader from "@/components/Loader";
import LoaderFullScreen from "@/components/LoaderFullScreen";
import { validItems } from "../../filters/valid_filter";

export default {
  data() {
    return {
      loan_product_dict: null,
      loanproduct_loancode: null, // цель кредитования
      periodCreditMin: null,
      periodCreditMax: null,
      confirm: false,
      loader: true,
      loaderForm: false,
      loaderFullScreen: false,
      options: {
        family: [],
        //наличие дополнительного дохода
        additIncSourOption: [], 

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
      if (this.taskId) {
        this.$store.commit("credits/setTaskId", this.taskId);

        if (!axios.defaults.headers.common["BPMCSRFToken"]) { // если перезагрузили страницу
          await this.$store.dispatch("credits/setHeaderRole", sessionStorage.getItem("userRole"))
          await this.$store.dispatch("credits/setHeaderBPM", sessionStorage.getItem("csrf_token"))
        }

        const response = await this.$store.dispatch("profile/getFullForm", this.taskId);
        if (response) {
          this.getPreapprovData(response.data.input)
        } 

        if (localStorage.getItem(this.taskId)) {
          this.$store.commit("credits/setPersonalData", JSON.parse(localStorage.getItem(this.taskId)))
          // чтоб не оставлять предыдущий taskId в случае перехода на полную форму (следующий taskId)
          localStorage.removeItem(this.taskIdPreapp)
        }

        this.setLoan(this.personalData.typeCredit)

        this.loaderForm = false
      } else {
        const auth = await this.$store.dispatch("credits/authBpm");
        console.log("auth", auth);
        const process = await this.$store.dispatch("credits/startProcess");
        console.log("process", process);

        if (process) {
          this.getPreapprovData(process.userTaskCreditDetailed.input)
          this.loaderForm = false
        }

      }
    } catch (error) {
      this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
      this.loaderForm = false
    }

    try {
      await this.$store.dispatch("credits/getDigIdNumber");
      this.loader = false;
    } catch (error) {
      console.log("DigId", error);
      this.loader = false;
    }
  },
  mounted() {
    // window.onunload = function() { 
    //   localStorage.setItem(this.taskIdPreapp, JSON.stringify(this.personalData))
    // }
    // window.onbeforeunload = function() {
    //   localStorage.setItem(this.taskIdPreapp, JSON.stringify(this.personalData))
    // }
  },
  beforeDestroy() {
    localStorage.setItem(this.taskIdPreapp, JSON.stringify(this.personalData))
  },
  computed: {
    ...mapState({
        loadMessage: state => state.credits.loadMessage,
        disableInput: state => state.credits.disableInput,
        scannerSerialNumber: state => state.credits.scannerSerialNumber,
        personalData: state => state.credits.personalData,
        taskIdPreapp: state => state.credits.taskId,
        credits: state => state.credits
      }),
      
    taskId() {
      return this.$route.query.taskId
    }
  },
  watch: {
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
      this.$refs.mname.validate();
      this.$refs.inn.validate();
      this.$refs.phone.validate();
      this.$refs.pinpp.validate();
      this.$refs.pasport.validate();

      this.$refs.typeCredit.validate();

      if (!!this.personalData.typeCredit && this.personalData.typeCredit != 3) {
        this.$refs.typeStepCredit.validate()
        this.$refs.periodCredit.validate()
      } else {
        validItems(this.$refs, "typeStepCredit")
        validItems(this.$refs, "periodCredit")
      }

      this.$refs.familyStatus.validate()

      if (this.personalData.children) {
        this.$refs.childrenCount.validate()
      } else {
        validItems(this.$refs, "childrenCount");
      }

      this.$refs.income.validate();
      this.$refs.expense.validate();
      this.$refs.otherExpenses.validate();
      this.$refs.loan_purpose.validate();

      if (this.personalData.externalIncome) {
        this.$refs.externalIncomeSize.validate()
        this.$refs.additionalIncomeSource.validate()
      } else {
        validItems(this.$refs, "externalIncomeSize");
        validItems(this.$refs, "additionalIncomeSource");
      }

      if (
        this.$refs.surname.hasError ||
        this.$refs.name.hasError ||
        this.$refs.mname.hasError ||
        this.$refs.inn.hasError ||
        this.$refs.phone.hasError ||
        this.$refs.pinpp.hasError ||
        this.$refs.pasport.hasError ||
        this.$refs.typeCredit.hasError ||
        this.$refs.typeStepCredit.hasError ||
        this.$refs.periodCredit.hasError ||
        this.$refs.familyStatus.hasError ||
        this.$refs.childrenCount.hasError ||
        this.$refs.income.hasError ||
        this.$refs.expense.hasError ||
        this.$refs.otherExpenses.hasError ||
        this.$refs.loan_purpose.hasError ||
        this.$refs.externalIncomeSize.hasError ||
        this.$refs.additionalIncomeSource.hasError
      ) {
        this.formHasError = true;
      } else {
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
                    number: passport.slice(2),
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
          const response = await this.$store.dispatch(
            "credits/confirmationCredit",
            data
          );

          console.log("response", response);
          if (response) {
            const preApproval = response.nextTask.input.find(i => i.label == 'preApproval').data
            this.credits.infoList = response.nextTask.input.find(i => i.label == 'InfoList').data // печатные формы
            this.credits.reasonsList = response.nextTask.input.find(i => i.label == 'reasons_list').data.items;
          
            this.confirm = true
            this.$store.commit("credits/creditConfirm", preApproval);
          }

          this.loaderFullScreen = false;
        } catch (error) {
          this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
          this.loaderFullScreen = false;
          setTimeout(() => {
            localStorage.removeItem(this.taskIdPreapp)
          }, 1000)
        }
      }
    },

    onChangeLoan(credit) {
      console.log('credit', credit)
      this.personalData.typeStepCredit = null;
      this.options.typeStepCredits = [];
      this.periodCreditMin = null;
      this.periodCreditMax = null;
      this.personalData.periodCredit = 0;
      this.personalData.loanRate = 0;
      this.personalData.loan_purpose = null

      this.setLoan(credit)
    },

    setLoan(creditId) {
      console.log('creditIddd', creditId)
      if (creditId) {
        const { Loan_dict } = this.loan_product_dict.find(i => i.id === creditId)
        this.options.loanPurpose = this.loanproduct_loancode[creditId].items.map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })

        console.log(this.loanproduct_loancode[creditId])
        this.personalData.loanRate = Loan_dict.loan_rate_base
        this.options.typeStepCredits = Loan_dict.payment_type.items.map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })

        this.periodCreditMin = Number(
          Loan_dict.terms_list.items.find(i => i.label === 'min').value
        );

        this.periodCreditMax = Number(
          Loan_dict.terms_list.items.find(i => i.label === 'max').value
        );

        this.personalData.periodCredit = this.periodCreditMin
      }
      // const idxCredit = this.options.typeCredits.findIndex(
      //   item => item.value == credit
      // );
      // console.log('idxCredit', idxCredit)

      // if (idxCredit !== -1) {

        // this.options.typeStepCredits = this.options.typeCredits[idxCredit].paymentTypes.map(i => {
        //   return {
        //     label: i.label,
        //     value: Number(i.value)
        //   }
        // })

        // this.periodCreditMin = Number(
        //   this.options.typeCredits[idxCredit].period[0].value
        // );
        // this.periodCreditMax = Number(
        //   this.options.typeCredits[idxCredit].period[1].value
        // );

        // if (!this.personalData.periodCredit) {
        //   this.personalData.periodCredit = this.periodCreditMin
        // }
        
        // this.personalData.loanRate = Number(
        //   this.options.typeCredits[idxCredit].loanRate
        // );
      // }
    },

    getPreapprovData(preAppData) {
      this.personalData.spouseCost =
        (preAppData.find(i => i.label == "spouseCost")).data;
      this.personalData.childCost =
        (preAppData.find(i => i.label == "childCost")).data;

      this.options.family = this.transformData(preAppData, "maritalStatus")

      this.options.additIncSourOption = this.transformData(preAppData, "incomeSource")

      //this.options.loanPurpose = this.transformData(preAppData, "loanPupose") 

      this.options.typeCredits = this.transformData(preAppData, "loan_product_list") 

      this.loan_product_dict = preAppData.find(i => i.label == "loan_product_dict").data.items

      this.loanproduct_loancode = preAppData.find(i => i.label == "loanproduct_loancode").data.items[0]

      // console.log('family', this.options.family)

      // const loan_product_listt = preAppData.find(i => i.label == "loan_product_list")
      // const loan_product_dict = preAppData.find(i => i.label == "loan_product_dict")

      // loan_product_listt.data.items.forEach(i => {
      //   const { Loan_dict } = loan_product_dict.data.items.find(j => j.id == i.value)
      //   const credits = {
      //     label: i.label,
      //     value: Number(i.value),
      //     period: Loan_dict.terms_list.items,
      //     loanRate: Loan_dict.loan_rate_base,
      //     paymentTypes: Loan_dict.payment_type.items
      //   };

      //   this.options.typeCredits.push(credits);
      // })

      // console.log("typeCredits", this.options.typeCredits);
    },

    transformData(preAppData, labelData) {
      return (preAppData
        .find(i => i.label == labelData)).data.items
        .map(i => {
          return {
            label: i.label,
            value: Number(i.value)
          }
        })
    },

    fioValid(val) {
      return val.match(/^[A-Z]+$/) || 'Введите на латинице заглавными буквами' // только латинские буквы
    },
  },
  components: {
    appPreApproval: PreApproval,
    appAutoCompleteData: AutoCompleteData,
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

  .q-col-gutter-y-md > *, .q-col-gutter-md > * {
    padding-bottom: 0!important;
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
