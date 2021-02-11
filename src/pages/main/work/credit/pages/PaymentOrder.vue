<template>
  <div class="paymentOrder q-pa-md">
    <!-- <pre>
      {{payOrders}}
    </pre> -->
    
    <form @submit.prevent.stop="onSubmit">
      <div 
        v-for="(payOrder, index) of payOrders" 
        :key="'payOrder' + index"
        class="row q-col-gutter-md payOrderBlock"
      >
        <div v-if="index > 0" class="col-12 text-right">
          <q-btn label="Удалить" @click="removePayOrder(index)" class="redBtn" />
        </div> 
        <div class="col-4">
          <div class="row paymentBlock">
            <div class="col-12">
              <q-select
                ref="documentType"
                square
                outlined
                v-model="payOrder.doc_type_selected"
                :options="payOrder.doc_type.items"
                dense
                label="Тип документа"
                :rules="[val => !!val || 'Выберите тип документа']"
                emit-value
                map-options
              />
            </div>

            <div class="col-12">
              <q-input
                ref="numberPP"
                square
                outlined
                v-model="payOrder.po_number"
                dense
                label="Номер ПП"
                :rules="[val => !!val || 'Введите номер ПП']"
              />
            </div>

            <!-- <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.filial"
                dense
                label="МФО филиала"
                :rules="[]"
              />
            </div> -->

            <!-- <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.product_code"
                dense
                label="Код кредитного продукта"
                :rules="[]"
              />
            </div> -->

            <div class="col-12">
              <!-- <q-input
                disable
                square
                outlined
                v-model="numberCredit"
                dense
                label="Номер кредитного договора"
                :rules="[]"
              /> -->
              <q-input
                disable
                square
                outlined
                v-model="payOrder.contract_number"
                dense
                label="Номер кредитного договора"
                :rules="[]"
              />
            </div>

            <div class="col-12">
              <!-- <q-input
                disable
                square
                outlined
                v-model="amountCredit"
                dense
                label="Сумма кредита"
                :rules="[]"
              /> -->

              <q-input
                ref="payOrderSumm"
                square
                outlined
                v-model="payOrder.summ"
                @input="formatNumber(index)" 
                dense
                label="Сумма кредита"
                :rules="[val => val != 0 || 'Неверные данные']"
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row paymentBlock">
            <!-- <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.client_uid"
                dense
                label="UID клиента"
                :rules="[]"
              />
            </div> -->

            <!-- <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.client_inn"
                dense
                label="ИНН клиента"
                :rules="[]"
              />
            </div> -->

            <div class="col-12">
              <q-input
                ref="MFOBank"
                square
                outlined
                v-model="payOrder.client_bank_mfo"
                dense
                label="МФО банка клиента"
                :rules="[val => numeralValid(val)]"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="BankName"
                square
                outlined
                v-model="payOrder.client_bank_name"
                dense
                label="Наименование банка клиента"
                :rules="[
                  val => !!val || 'Введите наименование банка получателя'
                ]"
              />
            </div>

            <div class="col-12">
              <q-input
                ref="recipientAccount"
                square
                outlined
                v-model="payOrder.client_acc"
                dense
                label="Счет клиента"
                :rules="[val => numeralValid(val)]"
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row paymentBlock">
            <div class="col-12">
              <q-select
                ref="codePayment"
                square
                outlined
                v-model="payOrder.pay_code_selected"
                :options="payOrder.pay_code.items"
                dense
                label="Код назначения платежа"
                :rules="[val => !!val || 'Выберите код платежа']"
                emit-value
                map-options
              />
            </div>

            <div class="col-12">
              <q-input
                ref="payOrderPayPurpose"
                square
                outlined
                v-model="payOrder.pay_purpose"
                dense
                label="Назначение платежа"
                :rules="[val => !! val || 'Введите данные']"
              />
            </div>

            <template v-if="payOrder.pay_code_selected == '09510'">
              <div class="col-12">
                <q-input
                  square
                  outlined
                  v-model="payOrder.budgetRecipient_acc"
                  dense
                  label="Счет бюджетополучителя"
                  :rules="[]"
                />
              </div>

              <div class="col-12">
                <q-input
                  disable
                  square
                  outlined
                  v-model="payOrder.budgetRecipient_name"
                  dense
                  label="Назначение бюджетополучителя"
                  :rules="[]"
                />
              </div>
              
              <div class="col-12">
                <q-input
                  disable
                  square
                  outlined
                  v-model="payOrder.budgetRecipient_bank"
                  dense
                  label="Банк бюджетополучителя"
                  :rules="[]"
                />
              </div>
              <div class="col-12">
                <q-input
                  disable
                  square
                  outlined
                  v-model="payOrder.budgetRecipient_inn"
                  dense
                  label="ИНН бюджетополучителя"
                  :rules="[]"
                />
              </div>
            </template>

            <!-- <div class="col-12">
              <q-input
                ref="detailsPayment"
                square
                outlined
                v-model="payOrder.pay_detail"
                dense
                label="Детали платежа"
                :rules="[val => !!val || 'Выберите детали платежа']"
              />
            </div> -->
            <div class="col-12">
              <q-input
                ref="date"
                outlined
                square
                dense
                label="Дата"
                v-model="payOrder.pay_date"
                mask="##.##.####"
                :rules="[
                  val => !!val  || 'Введите дату'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                      ref="qDate"
                    >
                      <q-date
                        mask="DD.MM.YYYY"
                        v-model="payOrder.pay_date"
                        @input="() => $refs.qDate[index].hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <q-btn label="Добавление платежа" @click="addPayOrder" class="blueBtn" />
        <q-btn type="submit" label="Сформировать платёжку" class="blueBtn" />
      </div>
      
    </form>

  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

import AlertMessage from "@/components/AlertMessage";
import CommonUtils from "@/shared/utils/CommonUtils";

import validMixin from "@/shared/mixins/validMixin";

import formatNumber from "@/shared/filters/formatNumber"
import { validItems, validFilter } from "../filters/valid_filter"
import formatDate from "../filters/formatDate"

export default {
  mixins: [validMixin],
  data() {
    return {
    //   documentType: "",
    //   numberPP: "",
    //   MFO: "00887",
    //   codeCredit: "132",
    //   codePayment: "",
    //   numberCredit: "",
    //   amountCredit: "",
    //   UIDClient: "10945828",
    //   INNClient: "500439371",
    //   recipientAccount: "",
    //   MFOBank: "00887",
    //   BankName: "НБУ Бош филлиали",
    //   detailsPayment: "",
    //   date: formatDate(new Date()),
    //   options: {
    //     documentType: [
    //       {
    //         label: "PayOrder",
    //         value: 1
    //       },
    //       // {
    //       //   label: "Тип документа 2",
    //       //   value: 2
    //       // }
    //     ],

    //     codePayment: [
    //       {
    //         label: "Код 1",
    //         value: 1
    //       },
    //       {
    //         label: "Код 2",
    //         value: 2
    //       }
    //     ]
    //   }
    };
  },
  async created() {
    this.$store.commit("credits/setTaskId", this.$route.query.taskId);

    // если перезагрузили страницу
    if (!axios.defaults.headers.common["BPMCSRFToken"]) {
      this.userRole = sessionStorage.getItem("userRole");
      await this.$store.dispatch(
        "credits/setHeaderRole",
        sessionStorage.getItem("userRole")
      );
      await this.$store.dispatch(
        "credits/setHeaderBPM",
        sessionStorage.getItem("csrf_token")
      );
    }

    try {
      const res = await this.$store.dispatch("profile/getFullForm");
      this.loaderForm = false;
      console.log("res", res);
    } catch (error) {
      setTimeout(() => {
        this.$store.commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
      }, 500)
      
      this.$router.go(-1);
    }
  },

  watch: {
    // "payOrder.pay_code_selected"(val) {
    //    this.payOrder.pay_detail = ""
    //   if (val == "09510") {
    //     this.payOrder.pay_detail = `${val}~${this.payOrder.client_acc}~${this.payOrder.client_inn}~${this.payOrder.pay_purpose}`
    //   } else {
    //     this.payOrder.pay_detail = `${val}~${this.payOrder.pay_purpose}~`
    //   }
    // }
  },

  computed: {
    ...mapState({
      // fullProfile: state => state.profile.fullFormProfile,
      payOrder: state => state.profile.payOrder,
      payOrders: state => state.profile.payOrders,
      // Customer: state => state.profile.fullFormProfile.Customer,
      // dictionaries: state => state.profile.dictionaries,
      // credits: state => state.credits
    }),

    // paymentOrders() {
    //   return 
    // }
  },
  methods: {
    async onSubmit() {
      validFilter(this.$refs, "documentTypeValid", "documentType");
      validFilter(this.$refs, "payOrderSummValid", "payOrderSumm");
      validFilter(this.$refs, "numberPPValid", "numberPP");
      validFilter(this.$refs, "recipientAccountValid", "recipientAccount");
      validFilter(this.$refs, "MFOBankValid", "MFOBank");
      validFilter(this.$refs, "BankNameValid", "BankName");
      validFilter(this.$refs, "codePaymentValid", "codePayment");
      validFilter(this.$refs, "payOrderPayPurposeValid", "payOrderPayPurpose");
      validFilter(this.$refs, "dateValid", "date");

      if (
        this.$refs.documentTypeValid.hasError ||
        this.$refs.payOrderSummValid.hasError ||
        this.$refs.numberPPValid.hasError ||
        this.$refs.recipientAccountValid.hasError ||
        this.$refs.MFOBankValid.hasError ||
        this.$refs.BankNameValid.hasError ||
        this.$refs.codePaymentValid.hasError ||
        // this.$refs.detailsPayment.hasError ||
        this.$refs.payOrderPayPurposeValid.hasError ||
        this.$refs.dateValid.hasError 
      ) {
        this.formHasError = true
        this.$store.commit("credits/setMessage", {
          message: "Заполните все обязательные поля"
        });
      } else {
        console.log('Success')
        
        this.payOrders.forEach(i => i.summ = +String(i.summ).replace(/[^0-9]/gim, ''))

        const data = {
          output: [
            {
              name: "payOrder",
              data: this.payOrders
            }
          ]
        };

        console.log('data', JSON.stringify(data, null, 2))
        // this.$router.push("/work/credit/applications");
        try{

        } catch (error) {

        }
      }
    },

    addPayOrder() {
      const payOrder = JSON.parse(JSON.stringify(this.payOrder))
      this.payOrders.push(payOrder)
      console.log('this.payOrders', this.payOrders)
    },

    removePayOrder(idx) {
      // this.payOrders.splice(idx, 1)
      this.$q.dialog({
          component: AlertMessage,
          parent: this,
          data: {
            idx,
            item: this.payOrders,
            itemName: `платежку ${idx + 1}`
            // message: error.message,
            // code: error.code
          }
          // persistent: true
        })
    },

    formatNumber(idx) {
      this.payOrders[idx].summ = formatNumber(this.payOrders[idx].summ)
    }
  }
};
</script>
<style lang="scss">
  .paymentOrder {
    background: #ffffff;
    .paymentBlock {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px 20px 0px 20px;
    }

    .payOrderBlock {
      margin-bottom: 20px;
    }

    .paymentBtn {
      margin-top: 10px;
    }

    .q-field__bottom {
      padding: 0;
    }

    .blueBtn .q-btn__content,
  .redBtn .q-btn__content {
    // width: 173px;
    // height: 47px;
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
  }

  .blueBtn {
    background: #4ab8ff;
  }

  .redBtn {
    background: #ff4a4a;
    margin-left: 24px !important;
  }
  }
</style>
