<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card class="preApprovalBlock">
        <q-card-section class="column items-start">
          <div class="text-h6">Заявка на кредит</div>
          <div class="creditBackground">
            <h4
              class="personName"
            >{{`${personalData.surname} ${personalData.name} ${personalData.mname}`}}</h4>
            <table class="creditTable" align="center">
              <tr>
                <td>Eжемесячный доход</td>
                <td>{{ personalData.income | formatNumber}} сум</td>
              </tr>
              <tr>
                <td>Расходы</td>
                <td>{{ preApprovalData.expense | formatNumber}} сум</td>
              </tr>
              <tr>
                <td>Eжемесячная плата</td>
                <td>{{preApprovalData.maxPayment | formatNumber}} сум</td>
              </tr>
              <tr>
                <td>Доступная сумма кредита</td>
                <td>{{preApprovalData.maxSum | formatNumber(2)}} сум</td>
              </tr>
            </table>

            <div v-if="failureCreditReason">
              <div class="text-h6">Причина отказа:</div>

              <form @submit.prevent="onSubmit">
                <div class="row">
                  <q-field
                    ref="toggle"
                    :value="!!selection.length"
                    :rules="[val => !!val || 'выберите причину']"
                  >
                    <div class="col-6">
                      <q-checkbox
                        v-model="selection"
                        val="не устроила ставка"
                        label="не устроила ставка"
                      />
                      <q-checkbox
                        v-model="selection"
                        val="не устроил срок кредита"
                        label="не устроил срок кредита"
                      />
                      <q-checkbox
                        v-model="selection"
                        val="не устроила сумма"
                        label="не устроила сумма"
                      />
                    </div>
                    <div class="col-6">
                      <q-checkbox
                        v-model="selection"
                        val="изменились планы"
                        label="изменились планы"
                      />
                      <q-checkbox
                        v-model="selection"
                        val="не устраивает размер платежа"
                        label="не устраивает размер платежа"
                      />
                    </div>
                  </q-field>
                </div>

                <q-card-actions class="row justify-center">
                  <q-btn label="Продолжить" color="green" type="submit" />
                </q-card-actions>
              </form>
            </div>

            <q-card-actions v-if="!failureCreditReason" class="row justify-center">
              <q-btn
                label="Отправить заявку"
                color="green"
                v-close-popup
                :disable="disableBtn"
                @click="successCredit(false)"
              />
              <q-btn
                label="Отменить"
                color="red-5"
                v-close-popup
                @click="() => {failureCreditReason = true}"
              />
            </q-card-actions>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import formatNumber from "../../filters/format_number.js";

export default {
  data() {
    return {
      failureCreditReason: false,
      selection: [],
      model: false
    };
  },
  // created() {
  //   console.log(this.$store.state.credits.confirm)
  // },
  computed: {
    disableBtn() {
      return this.$store.state.credits.disableBtn;
    },
    confirm() {
      return this.$store.state.credits.confirm;
    },
    preApprovalData() {
      return this.$store.state.credits.preApprovalData;
    },
    personalData() {
      return this.$store.state.credits.personalData;
    }
  },
  methods: {
    successCredit(val) {
      console.log("successCredit");
      this.$store.commit("toggleConfirm", val);
      this.$router.push("profile");
    },
    failureCredit(val) {
      console.log("failureCredit", this.selection);
      this.$store.commit("resetPersonData");
      this.$store.commit("toggleDisableInput", val);
      this.$store.commit("toggleConfirm", val);
      this.$router.push("/work/credit");
    },

    onSubmit() {
      console.log("selection ", this.selection);
      this.$refs.toggle.validate();
      console.log("ddd", this.$refs.toggle.hasError);
      if (this.$refs.toggle.hasError) {
        this.formHasError = true;
        console.log("unvalid");

        console.log("failureCredit", this.selection);
        this.$store.commit("toggleConfirm", true);
      } else {
        console.log("valid");
        console.log("failureCredit", this.selection);
        this.$store.commit("resetPersonData");
        this.$store.commit("toggleDisableInput", false);
        this.$store.commit("toggleConfirm", false);
        this.$router.push("/work/credit");
      }
    }
  },

  filters: {
    formatNumber
  }
};
</script>
<style lang="scss" scoped>
.preApprovalBlock {
  width: 510px;
  min-height: 290px;

  .items-start {
    padding: 0;

    .text-h6 {
      padding: 10px 25px;
      color: #acacac;
      width: 100%;
    }

    .creditBackground {
      padding-bottom: 12px;
      width: 100%;
      background: url("~assets/images/credit/ornament.png") no-repeat 0 0;
      //assets/images/credit/ornament.png
      .personName {
        margin: 15px 0 0 0;
        text-align: center;
        font-size: 22px;
        color: #0e3475;
      }

      .creditTable {
        margin-bottom: 5px;
        width: 70%;

        td {
          padding: 8px 0;
        }

        td:nth-child(odd) {
          color: #acacac;
        }

        td:nth-child(even) {
          color: #5bb85d;
        }
      }

      &::before {
        content: "";
        display: block;
        height: 1px;
        background: #acacac;
      }
    }
  }
}

.q-btn--rectangle {
  margin: 0 10px;
  border-radius: 0;
  width: 35%;
}
</style>
