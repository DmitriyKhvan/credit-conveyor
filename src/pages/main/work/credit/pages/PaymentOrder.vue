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
                v-model="documentType"
                :options="options.documentType"
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
                v-model="numberPP"
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
                v-model="MFO"
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
                v-model="codeCredit"
                dense
                label="Код кредитного продукта"
                :rules="[]"
              />
            </div>

            <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="numberCredit"
                dense
                label="Номер кредитного договора"
                :rules="[]"
              />
            </div>

            <div class="col-12">
              <q-input
                disable
                square
                outlined
                v-model="amountCredit"
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
                v-model="UIDClient"
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
                v-model="INNClient"
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
                v-model="recipientAccount"
                dense
                label="Счет получателя"
                :rules="[val => !!val || 'Введите счет получателя']"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="MFOBank"
                square
                outlined
                v-model="MFOBank"
                dense
                label="МФО банка получателя"
                :rules="[val => !!val || 'Введите МФО банка получателя']"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="BankName"
                square
                outlined
                v-model="BankName"
                dense
                label="Наименование банка получателя"
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
                v-model="codePayment"
                :options="options.codePayment"
                dense
                label="Код назначения платежа"
                :rules="[val => !!val || 'Выберите код платежа']"
                emit-value
                map-options
              />
            </div>
            <div class="col-12">
              <q-input
                ref="detailsPayment"
                square
                outlined
                v-model="detailsPayment"
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
                v-model="date"
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
                        v-model="date"
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

      <q-btn type="submit" color="primary" label="Отправить" class="paymentBtn" />
    </form>
  </div>
</template>
<script>
import formatDate from "../filters/formatDate"

export default {
  data() {
    return {
      documentType: "",
      numberPP: "",
      MFO: "",
      codeCredit: "",
      codePayment: "",
      numberCredit: "",
      amountCredit: "",
      UIDClient: "",
      INNClient: "",
      recipientAccount: "",
      MFOBank: "",
      BankName: "",
      detailsPayment: "",
      date: formatDate(new Date()),
      options: {
        documentType: [
          {
            label: "Тип документа 1",
            value: 1
          },
          {
            label: "Тип документа 2",
            value: 2
          }
        ],

        codePayment: [
          {
            label: "Код 1",
            value: 1
          },
          {
            label: "Код 2",
            value: 2
          }
        ]
      }
    };
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
