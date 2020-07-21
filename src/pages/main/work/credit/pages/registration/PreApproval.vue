<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card class="preApprovalBlock">
        <q-card-section class="column items-start">
          <div class="preApprovalBlock__title">
            <div class="text-h6">Заявка на кредит</div>
            <q-btn 
              flat 
              class="print" 
              icon="print" 
              @click="printFile(credits.infoList)" 
              :loading="loading"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
              <q-tooltip>Распечатать</q-tooltip>
            </q-btn>
          </div>
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
                      v-for="(reson, index) of this.credits.reasonsList.slice(
                        0,
                        Math.round(this.credits.reasonsList.length / 2)
                      )"
                      :key="reson.value"
                    >
                      <q-checkbox
                        v-model="selection"
                        :val="reson.value"
                        :label="reson.label"
                      />
                    </div>

                    <div
                      class="col-6"
                      v-for="(reson, index) of this.credits.reasonsList.slice(
                        Math.round(this.credits.reasonsList.length / 2)
                      )"
                      :key="reson.value"
                    >
                      <q-checkbox
                        v-model="selection"
                        :val="reson.value"
                        :label="reson.label"
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
                @click="successCredit"
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
import {mapState} from "vuex"
import printJS from "print-js";
import formatNumber from "../../filters/format_number.js";
import CommonUtils from "@/shared/utils/CommonUtils";
// import LoaderFullScreen from "@/components/LoaderFullScreen";

export default {
  props: {
    confirm: Boolean
  },
  data() {
    return {
      failureCreditReason: false,
      selection: [],
      model: false,
      loading: false,

      fileData: {
        type: "info_list",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб,
        data: {}
      },
    };
  },

  computed: {
    ...mapState({
      taskIdPreapp: state => state.credits.taskId,
    }),
    disableBtn() {
      return this.$store.getters["credits/credits"].disableBtn;
    },
    preApprovalData() {
      return this.$store.getters["credits/credits"].preApprovalData;
    },
    personalData() {
      return this.$store.getters["credits/credits"].personalData;
    },
    credits() {
      return this.$store.getters["credits/credits"];
    }
  },
  methods: {
    async successCredit() {
      console.log(this.$store);
      //this.confirm = false
      this.$emit("toggleLoaderForm", true);
      console.log(JSON.stringify(this.credits.confirmCreditData, null, 2));
      try {
        const response = await this.$store.dispatch(
          "credits/confirmationCredit",
          this.credits.confirmCreditData
        );

        console.log("response", response);

        if (response) {
          const data = response.nextTask.input.find(
            i => i.label === "application"
          ).data;
          const dictionaries = response.nextTask.input.find(
            i => i.label === "inputDictionaries"
          ).data;

          

          console.log("dic", JSON.stringify(dictionaries, null, 2));

          this.$store.commit("profile/setPreapprovData", data);
          this.$store.commit("profile/setDictionaries", dictionaries);

          sessionStorage.setItem("preapprovData", JSON.stringify(data));
          sessionStorage.setItem("dictionaries", JSON.stringify(dictionaries));
          
          this.$router.push("profile");
          localStorage.removeItem(this.taskIdPreapp)
          this.$emit("toggleLoaderForm", false);
        }
      } catch (error) {
        this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
        this.$emit("toggleLoaderForm", false);
      }
    },

    async failureCredit() {
      this.$refs.toggle.validate();
      if (this.$refs.toggle.hasError) {
        this.formHasError = true;
      } else {
        this.$emit("toggleLoaderFullScreen", true);
        this.$store.commit("credits/toggleDisableInput", false);
        this.credits.confirmCreditData.output[0].data = false;
        this.credits.confirmCreditData.output[1].data = this.selection;

        console.log(JSON.stringify(this.credits.confirmCreditData, null, 2));
        try {
          const response = await this.$store.dispatch(
            "credits/confirmationCredit",
            this.credits.confirmCreditData
          );
          console.log("res", response);
          
          // if (res.requestedTask.state === "completed") {
          //   this.$store.commit("credits/setMessage", "Credit failure");
          //   sessionStorage.clear();
          //   this.$router.push("/work/credit");
          //   //this.$emit("toggleLoaderFullScreen", true);
          // } else {
          //   throw "Task do not completed";
          // }

          if (response) {
            this.$store.commit("credits/setMessage", "Credit failure");
            sessionStorage.clear();
            this.$router.push("/work/credit");
            localStorage.removeItem(this.taskIdPreapp)
          }
          
        } catch (error) {
          this.$emit("toggleLoaderFullScreen", false);
          this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
        }
      }
    },

    async printFile(fileData) {
      this.loading = true
      let file = null
      this.fileData.data = fileData
      try {
        console.log(JSON.stringify(this.fileData, null, 2))

        if (this.fileData.idFile) {
            file = await this.$store.dispatch(
            "credits/getFile",
            this.fileData.idFile
          );
        } else {
            file = await this.$store.dispatch(
            "credits/getFile",
            this.fileData
          );
          
          if (file) {
            this.fileData.idFile = file.id // для кеширования id
          }
        }

        console.log('file', file)

        if (file) {
          printJS(file.url);
          window.URL.revokeObjectURL(file.url);
        }

        this.loading = false
      } catch(error) {
        this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
        this.loading = false
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

  &__title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .print {
    width: 10%;

    .q-btn__wrapper::before {
      box-shadow: none;
    }
  }

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
