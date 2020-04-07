<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card class="preApprovalBlock">
        <q-card-section class="column items-start">
          <div class="text-h6">Заявка на кредит</div>
          <div class="creditBackground">
            <h4 class="personName">
              {{
                `${personalData.surname} ${personalData.name} ${personalData.mname}`
              }}
            </h4>
            <table class="creditTable" align="center">
              <tr>
                <td>Eжемесячный доход</td>
                <td>{{ personalData.income | formatNumber }} сум</td>
              </tr>
              <tr>
                <td>Расходы</td>
                <td>{{ preApprovalData.expense | formatNumber }} сум</td>
              </tr>
              <tr>
                <td>Eжемесячная плата</td>
                <td>{{ preApprovalData.maxPayment | formatNumber }} сум</td>
              </tr>
              <tr>
                <td>Доступная сумма кредита</td>
                <td>{{ preApprovalData.maxSum | formatNumber(2) }} сум</td>
              </tr>
            </table>

            <div v-if="failureCreditReason">
              <div class="text-h6">Причина отказа:</div>

              <form @submit.prevent="failureCredit">
                  <q-field
                    ref="toggle"
                    :value="!!selection.length"
                    :rules="[val => !!val || 'выберите причину']"
                  >

                  <div class="row">
                    <div 
                      class="col-6"
                      v-for="(reson, index) of this.credits.reasonsList.slice(0, Math.round(this.credits.reasonsList.length / 2))"
                      :key="'reson' + index"
                    >
                      <q-checkbox
                        v-model="selection"
                        :val="reson.value"
                        :label="reson.name"
                      />
                    </div>

                    <div 
                      class="col-6"
                      v-for="(reson, index) of this.credits.reasonsList.slice(Math.round(this.credits.reasonsList.length / 2))"
                      :key="'reson' + index"
                    >
                      <q-checkbox
                        v-model="selection"
                        :val="reson.value"
                        :label="reson.name"
                      />
                    </div>
                    </div>
                  </q-field>

                <q-card-actions class="row justify-center">
                  <q-btn label="Продолжить" color="green" type="submit" />
                </q-card-actions>
              </form>
            </div>

            <q-card-actions
              v-if="!failureCreditReason"
              class="row justify-center"
            >
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
                @click="
                  () => {
                    failureCreditReason = true;
                  }
                "
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
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
  data() {
    return {
      failureCreditReason: false,
      selection: [],
      model: false
    };
  },

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
    },
    credits() {
      return this.$store.state.credits;
    }
  },
  methods: {
    async successCredit(val) {
      this.$store.commit("toggleConfirm", val);
        console.log(JSON.stringify(this.credits.confirmCreditData, null, 2))
        try {
          const response = await this.$store.dispatch('confirmationCredit', this.credits.confirmCreditData)

          console.log('dictionaries', response)
          if (response.nextTask.input[2].data) {
            this.$store.commit("setDictionaries", response.nextTask.input[2].data) 
            this.$router.push("sub/profile");
          } else {
            throw 'Data is null'
          }

        } catch (error) {
          const errorMessage = CommonUtils.filterServerError(error);
          this.$store.commit("setError", errorMessage);
          sessionStorage.removeItem("csrf_token");
        }
    },
    
    async failureCredit() {
      this.$refs.toggle.validate();
      if (this.$refs.toggle.hasError) {
        this.formHasError = true;
        this.$store.commit("toggleConfirm", true);
      } else {
        this.$store.commit("toggleDisableInput", false);
        this.$store.commit("toggleConfirm", false);

        this.confirmCreditData.output[0].data = false
        this.confirmCreditData.output[1].data = this.selection

        // const data = {
        //   output: [
        //     {
        //       name: "confirm",
        //       data: false
        //     },
        //     {
        //       name: "reasons",
        //       data: this.selection
        //     }
        //   ]
        // };

        try {
          await this.$store.dispatch('confirmationCredit', this.credits.confirmCreditData)
          console.log('failureCredit', this.$store.dispatch('confirmationCredit', this.credits.confirmCreditData))
        } catch (error) {}

        this.$router.push("/work/credit");

        console.log('creditData', data)
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
