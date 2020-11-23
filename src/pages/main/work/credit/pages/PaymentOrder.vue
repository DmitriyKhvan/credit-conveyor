<template>
  <div class="paymentOrder q-pa-md">
    <form @submit.prevent.stop="onSubmit">
      <div class="row q-col-gutter-md">
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

            <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.filial"
                dense
                label="МФО филиала"
                :rules="[]"
              />
            </div>

            <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.product_code"
                dense
                label="Код кредитного продукта"
                :rules="[]"
              />
            </div>

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
                disable
                square
                outlined
                v-model="payOrder.summ"
                dense
                label="Сумма кредита"
                :rules="[]"
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row paymentBlock">
            <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.client_uid"
                dense
                label="UID клиента"
                :rules="[]"
              />
            </div>

            <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="payOrder.client_inn"
                dense
                label="ИНН клиента"
                :rules="[]"
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
                :rules="[val => !!val || 'Введите счет получателя']"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="MFOBank"
                square
                outlined
                v-model="payOrder.client_bank_mfo"
                dense
                label="МФО банка клиента"
                :rules="[val => !!val || 'Введите МФО банка получателя']"
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
                square
                outlined
                v-model="payOrder.pay_purpose"
                dense
                label="Назначение платежа"
                :rules="[]"
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

            <div class="col-12">
              <q-input
                ref="detailsPayment"
                square
                outlined
                v-model="payOrder.pay_detail"
                dense
                label="Детали платежа"
                :rules="[val => !!val || 'Выберите детали платежа']"
              />
            </div>
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
                  val => (val && val.length === 10) || 'Введите дату'
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
                        @input="() => $refs.qDate.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>

      <q-btn type="submit" color="primary" label="Сформировать платёжку" class="paymentBtn" />
    </form>

  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

import CommonUtils from "@/shared/utils/CommonUtils";
import formatDate from "../filters/formatDate"

export default {
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
          CommonUtils.filterServerError(error)
        );
      }, 500)
      
      this.$router.go(-1);
    }
  },

  watch: {
    "payOrder.pay_code_selected"(val) {
       this.payOrder.pay_detail = ""
      if (val == "09510") {
        this.payOrder.pay_detail = `${val}~${this.payOrder.client_acc}~${this.payOrder.client_inn}~${this.payOrder.pay_purpose}`
      } else {
        this.payOrder.pay_detail = `${val}~${this.payOrder.pay_purpose}~`
      }
    }
  },

  computed: {
    ...mapState({
      // fullProfile: state => state.profile.fullFormProfile,
      payOrder: state => state.profile.payOrder,
      // Customer: state => state.profile.fullFormProfile.Customer,
      // dictionaries: state => state.profile.dictionaries,
      // credits: state => state.credits
    })
  },
  methods: {
    async onSubmit() {
      this.$refs.documentType.validate()
      this.$refs.numberPP.validate()
      this.$refs.recipientAccount.validate()
      this.$refs.MFOBank.validate()
      this.$refs.BankName.validate()
      this.$refs.codePayment.validate()
      this.$refs.detailsPayment.validate()
      this.$refs.date.validate()

      if (
        this.$refs.documentType.hasError ||
        this.$refs.numberPP.hasError ||
        this.$refs.recipientAccount.hasError ||
        this.$refs.MFOBank.hasError ||
        this.$refs.BankName.hasError ||
        this.$refs.codePayment.hasError ||
        this.$refs.detailsPayment.hasError ||
        this.$refs.date.hasError 
      ) {
        this.formHasError = true
      } else {
        console.log('Success')
        const {
          budgetRecipient_acc,
          budgetRecipient_bank,
          budgetRecipient_name,
          client_acc,
          client_bank_mfo,
          client_bank_name,
          client_inn,
          client_uid,
          contract_number,
          filial,
          pay_date,
          pay_detail,
          po_number,
          product_code,
          summ,
          doc_type_selected,
          pay_code_selected
        } = this.payOrder

        const data = {
          output: [
            {
              name: "payOrder",
              data: {
                budgetRecipient_acc,
                budgetRecipient_bank,
                budgetRecipient_name,
                client_acc,
                client_bank_mfo,
                client_bank_name,
                client_inn,
                client_uid,
                contract_number,
                filial,
                pay_date,
                pay_detail,
                po_number,
                product_code,
                summ,
                doc_type_selected,
                pay_code_selected
              }
            }
          ]
        };

        console.log(data)
        this.$router.push("/work/credit/applications");
        try{

        } catch (error) {

        }
      }
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

    .paymentBtn {
      margin-top: 10px;
    }

    .q-field__bottom {
      padding: 0;
    }
  }
</style>
