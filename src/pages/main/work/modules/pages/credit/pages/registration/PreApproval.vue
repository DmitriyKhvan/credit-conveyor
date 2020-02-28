<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card class="preApprovalBlock">
        <q-card-section class="column  items-start">
          <div class="text-h6">Заявка на кредит</div>
          <div class="creditBackground">
            <h4 class="personName">{{`${personalData.surname} ${personalData.name} ${personalData.mname}`}}</h4>
            <table class="creditTable" align="center">
              <tr>
                <td>Eжемесячный доход </td>
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

            <q-card-actions class="row justify-center">
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
                @click="failureCredit(false)"
              />
            </q-card-actions>
                
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import formatNumber from '../../filters/format_number.js';

export default {
  data() {
    return {

    }
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
      this.$store.commit('toggleConfirm', val);
      this.$router.push('profile');
       // const data = {
      //   output: [
      //     {
      //       name: "preApplication",
      //       data: {
      //         preApproval: {
      //           incoming: 0,
      //           payment: 0,
      //           sum: 0,
      //           expenses: 0
      //         },
      //         applicationID: 0,
      //         maritalStatus: {
      //           childrens: true,
      //           status: true,
      //           childrenCount: 2
      //         },
      //         finance: {
      //           otherIncome: 0,
      //           periodicExpenses: 1000000,
      //           otherExpenses: 0,
      //           confirmIncome: 4000000
      //         },
      //         createDate: "2020-01-08T10:02:33.573Z",
      //         customer: {
      //           firstName: "First name",
      //           lastName: "Last name",
      //           number: 0,
      //           phone: 0,
      //           series: "",
      //           tin: 0,
      //           middleName: "",
      //           pinpp: 0
      //         }
      //       }
      //     }
      //   ]
      // };
    },
    failureCredit(val) {
      console.log("failureCredit");
      this.$store.commit('toggleConfirm', val)
    }
  },

  filters: {
    formatNumber
  }
}
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
      background: url(../../assets/ornament.png) no-repeat 0 0;

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

      &::before{
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