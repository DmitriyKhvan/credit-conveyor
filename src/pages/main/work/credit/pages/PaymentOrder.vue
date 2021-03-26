<template>
  <div class="paymentOrder q-pa-md">
    <!-- <pre>
      {{payOrders}}
    </pre> -->
    <div class="loaderForm" v-if="loaderForm">
      <appLoader />
    </div>

    <form v-else @submit.prevent.stop="onSubmit">
      <div
        v-for="(payOrder, index) of payOrders.items"
        :key="'payOrder' + index"
        class="row q-col-gutter-md payOrderBlock"
      >
        <div v-if="index > 0" class="col-12 status">
          <p v-if="payOrder.status != 'success'">{{ payOrder.status }}</p>
          <q-btn
            label="Удалить"
            @click="removePayOrder(index)"
            class="redBtn text-right"
          />
        </div>
        <div class="col-4">
          <div class="row paymentBlock">
            <div class="col-12">
              <q-select
                :disable="payOrder.status == 'success' ? true : false"
                ref="documentType"
                square
                outlined
                v-model="payOrder.payMethod"
                :options="pay_method.items"
                dense
                label="Тип документа"
                :rules="[val => !!val || 'Выберите тип документа']"
                emit-value
                map-options
              />
            </div>

            <!-- <div class="col-12">
              <q-input
                :disable="payOrder.status == 'success' ? true : false"
                ref="numberPP"
                square
                outlined
                v-model="payOrder.transactionID"
                dense
                label="Номер ПП"
                :rules="[val => !!val || 'Введите номер ПП']"
              />
            </div> -->

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
              <q-input
                disable
                square
                outlined
                v-model="payOrder.loanId"
                dense
                label="Номер кредитного договора"
                :rules="[]"
              />
            </div>

            <div class="col-12">
              <q-input
                :disable="payOrder.status == 'success' ? true : false"
                ref="payOrderSumm"
                square
                outlined
                v-model="payOrder.amount"
                @input="validAmount(index)"
                dense
                label="Сумма кредита"
                :rules="[
                  val =>
                    payOrder.status !== 'success'
                      ? fullAmount - totalAmount >= 0 ||
                        'Превышен лимит выделенного кредита'
                      : null
                ]"
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
                ref="INNRecipient"
                square
                outlined
                v-model="payOrder.inn"
                dense
                label="ИНН получателя"
                mask="#########"
                :rules="[
                  val =>
                    (val && val.length === 9) ||
                    'Количество символов должно быт ровно 9',
                  val => !val.match(/(?=(.))\1{9,}/) || 'Неверные данные'
                ]"
              />
            </div>

            <div class="col-12">
              <q-input
                :disable="payOrder.status == 'success' ? true : false"
                ref="MFOBank"
                square
                outlined
                v-model.lazy="payOrder.codeFilial"
                @change="getBankBranches($event.target.value, index)"
                dense
                label="МФО банка клиента"
                :rules="[val => numeralValid(val)]"
              />
            </div>
            <div class="col-12">
              <q-input
                disable
                ref="BankName"
                square
                outlined
                v-model="client_bank_name[index]"
                dense
                label="Наименование банка клиента"
                :rules="[val => !!val || 'Выберите наименование банка']"
              />
            </div>

            <div class="col-12">
              <q-input
                :disable="payOrder.status == 'success' ? true : false"
                ref="recipientAccount"
                square
                outlined
                v-model="payOrder.account"
                dense
                label="Счет клиента"
                mask="####################"
                :rules="[
                  val =>
                    (val && val.length === 20) ||
                    'Количество символов должно быт ровно 20',
                  val => !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
                ]"
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row paymentBlock">
            <div class="col-12">
              <q-select
                :disable="payOrder.status == 'success' ? true : false"
                ref="codePayment"
                square
                outlined
                v-model="payOrder.codePurpose"
                :options="purpose_code.items"
                dense
                label="Код назначения платежа"
                :rules="[val => !!val || 'Выберите код платежа']"
                emit-value
                map-options
              />
            </div>

            <div class="col-12">
              <q-input
                :disable="payOrder.status == 'success' ? true : false"
                ref="payOrderPayPurpose"
                square
                outlined
                v-model="payOrder.purpose"
                dense
                label="Назначение платежа"
                :rules="[val => !!val || 'Введите данные']"
              />
            </div>

            <div class="col-12">
              <q-input
                ref="creditNameRecipient"
                square
                outlined
                v-model="payOrder.creditName"
                dense
                label="Наименование получателя"
                :rules="[val => !!val || 'Введите данные']"
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
            <!-- <div class="col-12">
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
            </div> -->
          </div>
        </div>
      </div>

      <div class="text-center">
        <q-btn
          :disable="payOrders.items.length > 4 ? true : false"
          label="Добавление платежа"
          @click="addPayOrder"
          class="blueBtn"
        />
        <q-btn type="submit" label="Сформировать платёжку" class="blueBtn" />
      </div>
    </form>
    <appLoaderFullScreen v-if="loader" />
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

import Loader from "@/components/Loader";
import AlertMessage from "@/components/AlertMessage";
import CommonUtils from "@/shared/utils/CommonUtils";

import validMixin from "@/shared/mixins/validMixin";

import formatNumber from "@/shared/filters/formatNumber";
import { validItems, validFilter } from "../filters/valid_filter";
import LoaderFullScreen from "@/components/LoaderFullScreen";

export default {
  mixins: [validMixin],
  data() {
    return {
      loader: false,
      loaderForm: false,
      client_bank_name: [],
      // creditAmount: 35000000,
      totalAmount: 0
      // payOrderTemp: {
      //     "amount": null,
      //     "codeFilial": "",
      //     "purpose": "",
      //     "payMethod": "",
      //     "inn": "",
      //     "id": 0,
      //     "loanId": null,
      //     "account": "",
      //     "codePurpose": "",
      //     "transactionID": 0,
      //     "status": ""
      //   }
      // client_bank_name: [
      //   {
      //     name: ""
      //   }
      // ],

      // payOrders: {
      //   items: [
      //     {
      //       amount: 15000000,
      //       codeFilial: "111",
      //       purpose: "444",
      //       payMethod: "06",
      //       inn: "497803022",
      //       id: 0,
      //       loanId: "555",
      //       account: "666",
      //       codePurpose: "01007",
      //       transactionID: "222",
      //       status: "success"
      //     },
      //     {
      //       amount: 15000000,
      //       codeFilial: "777",
      //       purpose: "123",
      //       payMethod: "06",
      //       inn: "497803022",
      //       id: 0,
      //       loanId: "456",
      //       account: "789",
      //       codePurpose: "01007",
      //       transactionID: "888",
      //       status: "Счет не найден"
      //     }
      //   ]
      // }
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
      this.loaderForm = true;
      // await new Promise(resolve => setTimeout(resolve, 3000))
      const res = await this.$store.dispatch("profile/getFullForm");
      this.loaderForm = false;
      console.log("res", res);
      this.loaderForm = false;
    } catch (error) {
      setTimeout(() => {
        this.$store.commit("credits/setMessage", {
          message: CommonUtils.filterServerError(error),
          code: 0
        });
      }, 500);

      this.loaderForm = false;
      this.$router.go(-1);
    }

    // this.payOrders.items[0].status = 'success'
    // this.payOrders.items[1].status = 'Ошибка в ИАБС'

    for (let i = 0; i < this.payOrders.items.length; i++) {
      if (this.payOrders.items[i].codeFilial !== "") {
        await this.getBankBranches(this.payOrders.items[i].codeFilial, i);
      }
      // else {
      //   break
      // }

      this.formatNumber(i);
    }
  },

  mounted() {
    this.client_bank_name = new Array(this.payOrders.length);
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
      payOrder: state => state.profile.payOrder,
      payOrders: state => state.profile.payOrders,
      fullAmount: state => state.profile.fullAmount,
      payOrdersInput: state => state.profile.payOrdersInput
    }),

    purpose_code() {
      return this.payOrdersInput.find(i => i.label === "purpose_code").data;
    },

    pay_method() {
      return this.payOrdersInput.find(i => i.label === "pay_method").data;
    }
  },
  methods: {
    async onSubmit() {
      validFilter(this.$refs, "documentTypeValid", "documentType");
      validFilter(this.$refs, "payOrderSummValid", "payOrderSumm");
      validFilter(this.$refs, "numberPPValid", "numberPP");
      validFilter(this.$refs, "recipientAccountValid", "recipientAccount");
      validFilter(this.$refs, "INNRecipientValid", "INNRecipient");
      validFilter(this.$refs, "MFOBankValid", "MFOBank");
      validFilter(this.$refs, "BankNameValid", "BankName");
      validFilter(this.$refs, "codePaymentValid", "codePayment");
      validFilter(this.$refs, "payOrderPayPurposeValid", "payOrderPayPurpose");
      validFilter(
        this.$refs,
        "creditNameRecipientValid",
        "creditNameRecipient"
      );
      // validFilter(this.$refs, "dateValid", "date");

      if (
        this.$refs.documentTypeValid.hasError ||
        this.$refs.payOrderSummValid.hasError ||
        this.$refs.numberPPValid.hasError ||
        this.$refs.recipientAccountValid.hasError ||
        this.$refs.INNRecipientValid.hasError ||
        this.$refs.MFOBankValid.hasError ||
        this.$refs.BankNameValid.hasError ||
        this.$refs.codePaymentValid.hasError ||
        // this.$refs.detailsPayment.hasError ||
        this.$refs.payOrderPayPurposeValid.hasError ||
        this.$refs.creditNameRecipientValid.hasError
        // this.$refs.dateValid.hasError
      ) {
        this.formHasError = true;
        this.$store.commit("credits/setMessage", {
          message: "Заполните все обязательные поля"
        });
      } else {
        console.log("Success");

        this.loader = true;

        const payOrderFilter = this.payOrders.items
          .filter(i => i.status != "success")
          .map(i => {
            i.amount = +String(i.amount).replace(/[^0-9]/gim, "");
            return { ...i };
          });

        // payOrderFilter.forEach(
        //   i => (i.amount = +String(i.amount).replace(/[^0-9]/gim, ""))
        // )

        console.log("data1", JSON.stringify(payOrderFilter, null, 2));

        const data = {
          output: [
            {
              name: "payOrder",
              data: payOrderFilter
            }
          ]
        };

        console.log("data", JSON.stringify(data, null, 2));

        try {
          const response = await this.$store.dispatch(
            "credits/confirmationCredit",
            data
          );
          console.log("response", JSON.stringify(response, null, 2));

          if (response) {
            const sleep = ms => {
              return new Promise(resolve => setTimeout(resolve, ms));
            };

            await sleep(3000);

            setTimeout(() => {
              this.$store.commit("credits/setMessage", {
                message: "Платежка оформлена",
                code: 1
              });
            }, 500);

            this.$router.push("/work/credit/applications");
            // this.$router.go(-1);
          }

          this.loader = false;
        } catch (error) {
          this.loader = false;
          setTimeout(() => {
            this.$store.commit("credits/setMessage", {
              message: CommonUtils.filterServerError(error),
              code: 0
            });
          }, 500);

          this.$router.push("/work/credit/applications");
        }
      }
    },

    addPayOrder() {
      const payOrder = JSON.parse(JSON.stringify(this.payOrder));
      // payOrder.codeFilial = null
      this.payOrders.items.push(payOrder);
      this.client_bank_name.push(null);
      this.getBankBranches(
        payOrder.codeFilial,
        this.client_bank_name.length - 1
      );
      console.log("this.payOrders", this.payOrders);
    },

    removePayOrder(idx) {
      // this.payOrders.splice(idx, 1)
      this.client_bank_name.splice(idx, 1);
      this.$q.dialog({
        component: AlertMessage,
        parent: this,
        data: {
          idx,
          item: this.payOrders.items,
          itemName: `платежку ${idx + 1}`
          // message: error.message,
          // code: error.code
        }
        // persistent: true
      });
    },

    validAmount(idx) {
      this.totalAmount = 0;
      this.payOrders.items.forEach(payOrder => {
        this.totalAmount += Number(
          String(payOrder.amount).replace(/[^0-9]/gim, "")
        );
      });

      console.log("totalAmount2", this.totalAmount);
      this.formatNumber(idx);

      validFilter(this.$refs, "payOrderSummValid", "payOrderSumm");
    },

    formatNumber(idx) {
      this.payOrders.items[idx].amount = formatNumber(
        this.payOrders.items[idx].amount
      );
    },

    async getBankBranches(MFO, idx) {
      console.log(MFO);
      try {
        const response = await this.$store.dispatch(
          "profile/getBankBranches",
          MFO
        );
        console.log(response);
        if (response.length) {
          this.client_bank_name.splice(idx, 1, response[0].filialName);
        } else {
          this.client_bank_name.splice(idx, 1);
        }

        console.log(response);
      } catch (error) {}
    }
  },
  components: {
    appLoaderFullScreen: LoaderFullScreen,
    appLoader: Loader
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

  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: red;
  }
}
</style>
