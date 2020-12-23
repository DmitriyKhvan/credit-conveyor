<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card class="preApprovalBlock">
        <q-card-section class="column items-start">
          <div class="preApprovalBlock__title">
            <div class="text-h6">Заявка на кредит</div>

            <div class="printBlock">
              <q-btn
                v-if="!INPS"
                flat
                class="print"
                icon="print"
                @click="printFile(credits.infoList)"
                :loading="loading[0]"
              >
                <div class="print__text">(рус.)</div>
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
                <q-tooltip>Печать</q-tooltip>
              </q-btn>

              <q-btn
                v-if="!INPS"
                flat
                class="print"
                icon="print"
                @click="printFile(credits.infoList_uz, 1)"
                :loading="loading[1]"
              >
                <div class="print__text">(узб.)</div>
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
                <q-tooltip>Печать</q-tooltip>
              </q-btn>
            </div>
            
          </div>
          <div class="creditBackground">
            <h4 class="personName" v-if="credits.moratorium > 0">
              На клиента наложен мораторий, который истечет через {{ credits.moratorium }} д.
            </h4>
            <h4 class="personName">
              {{
                `${personalData.surname} ${personalData.name} ${personalData.mname}`
              }}
            </h4>
            <div class="creditTable" align="center">
              <div class="creditTable__row">
                <div class="creditTable__field">Eжемесячный доход</div>
                <div class="creditTable__value__green">
                  {{ personalData.income | formatNumber }} сум
                </div>
                <div class="dashed"></div>
              </div>
              <div class="creditTable__row">
                <div class="creditTable__field">Расходы</div>
                <div class="creditTable__value__red">
                  {{ preApprovalData.expense | formatNumber }} сум
                </div>
                <div class="dashed"></div>
              </div>
              <div class="creditTable__row">
                <div class="creditTable__field">Eжемесячная плата</div>
                <div class="creditTable__value__red">
                  {{ preApprovalData.maxPayment | formatNumber }} сум
                </div>
                <div class="dashed"></div>
              </div>
              <div class="creditTable__row">
                <div class="creditTable__field">Доступная сумма кредита</div>
                <div class="creditTable__value__green">
                  {{ preApprovalData.maxSum | formatNumber }} сум
                </div>
                <div class="dashed"></div>
              </div>
              <div class="creditTable__row">
                <div class="creditTable__field">
                  Максимальная сумма по кредитному продукту
                </div>
                <div class="creditTable__value__green">
                  {{ personalData.ProductMaxSum | formatNumber }} сум
                </div>
                <div class="dashed"></div>
              </div>
            </div>

            <p class="failureCredit" v-if="preApprovalData.maxSum < 0">
              Недостаточно средств для предоставления кредита
            </p>

            <div v-if="failureCreditReason">
              <div class="text-h6 resonFailure">Причина отказа</div>

              <form @submit.prevent="failureCredit">
                <q-field
                  ref="toggle"
                  :value="!!selection.length"
                  :rules="[(val) => !!val || 'выберите причину']"
                >
                  <div class="row q-col-gutter-y-sm">
                    <div
                      class="col-6 reson"
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
                      class="col-6 reson"
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
                  <q-btn class="continue" label="Продолжить" type="submit" />
                </q-card-actions>
              </form>
            </div>

            <q-card-actions
              v-if="!failureCreditReason && !INPS"
              class="row justify-center"
            >
              <q-btn
                class="preappBtnSuccess"
                v-if="preApprovalData.maxSum > 0"
                label="Отправить заявку"
                :disable="credits.moratorium > 0 ? true : false"
                @click="successCredit"
              />
              <q-btn
                class="preappBtnFailure"
                label="Отменить"
                @click="
                  () => {
                    failureCreditReason = true;
                  }
                "
              />
            </q-card-actions>

            <q-card-actions v-if="INPS" class="row justify-center">
              <q-btn
                label="Отменить"
                color="red-5"
                @click="failureCreditINPS(false)"
              />
            </q-card-actions>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import printJS from "print-js";
import formatNumber from "../../filters/format_number.js";
import CommonUtils from "@/shared/utils/CommonUtils";
// import LoaderFullScreen from "@/components/LoaderFullScreen";

export default {
  props: {
    // confirm: Boolean,
    INPS: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      failureCreditReason: false,
      confirm: true,
      selection: [],
      model: false,
      loading: [false, false],

      confirmCreditData: {
        output: [
          {
            name: "confirm",
            data: true,
          },
          {
            name: "reasons",
            data: [],
          },
        ],
      },

      fileData: {
        type: "info_list",
        // lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб,
        lang: 0, //0 - рус, 1 - узб,
        data: {},
      },

      docId: [false, false]
    };
  },

  computed: {
    ...mapState({
      taskIdPreapp: (state) => state.credits.taskId,
      preApprovalData: (state) => state.credits.preApprovalData,
      personalData: (state) => state.credits.personalData,
      credits: (state) => state.credits,
    }),
  },

  methods: {
    async successCredit() {
      if (Object.keys(this.fileData.data).length == 0) {
        this.$store.commit(
          "credits/setMessage",
          "Распечатайте документ"
        );
      } else {
        // this.$emit("toggleLoaderForm", true);
        this.$emit("toggleLoaderFullScreen", true);
        console.log(JSON.stringify(this.confirmCreditData, null, 2));
        try {
          // const response = await this.$store.dispatch(
          //   "credits/confirmationCredit",
          //   this.confirmCreditData
          // );

          const response = await this.$store.dispatch(
            "credits/calculationCredit",
            this.confirmCreditData
          );

          console.log("response", response);

          if (response) {
            const data = response.nextTask.input.find(
              (i) => i.label === "application"
            ).data;
            const dictionaries = response.nextTask.input.find(
              (i) => i.label === "inputDictionaries"
            ).data;

            console.log("dic", JSON.stringify(dictionaries, null, 2));

            this.$store.commit("profile/resetDataFullFormProfile");
            this.$store.commit("profile/setPreapprovData", data);
            this.$store.commit("profile/setDictionaries", dictionaries);

            this.$store.commit("profile/setInput", response.nextTask.input);  // all input from BPM

            this.$router.push("sub/profile");
            setTimeout(() => {
              localStorage.removeItem(this.taskIdPreapp);
            }, 1000);

            //this.$emit("toggleLoaderForm", false);
          }
        } catch (error) {
          // this.$emit("toggleLoaderForm", false);
          this.$emit("toggleLoaderFullScreen", false);
          setTimeout(() => {
            this.$store.commit(
              "credits/setMessage",
              CommonUtils.filterServerError(error)
            );
            localStorage.removeItem(this.taskIdPreapp);
          }, 1000)
          
          // sessionStorage.clear();
          // this.$router.push("/work/credit");
        }
      }
    },

    async failureCredit() {
      this.$refs.toggle.validate();
      if (this.$refs.toggle.hasError) {
        this.formHasError = true;
      } else {
        this.$emit("toggleLoaderFullScreen", true);
        this.confirmCreditData.output[0].data = false;
        this.confirmCreditData.output[1].data = this.selection;

        console.log(JSON.stringify(this.confirmCreditData, null, 2));
        try {
          const response = await this.$store.dispatch(
            "credits/confirmationCredit",
            this.confirmCreditData
          );

          // const response = await this.$store.dispatch(
          //   "credits/calculationCredit",
          //   this.confirmCreditData
          // );
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
            // чтоб удаление произошло после метода beforeDestroy в родительском компоненте
            setTimeout(() => {
              localStorage.removeItem(this.taskIdPreapp);
            }, 1000);
          }
        } catch (error) {
          this.$emit("toggleLoaderFullScreen", false);
          
          setTimeout(() => {
            this.$store.commit(
              "credits/setMessage",
              CommonUtils.filterServerError(error)
            );
            localStorage.removeItem(this.taskIdPreapp);
          }, 1000);
        }
      }
    },

    failureCreditINPS(flag) {
      console.log("failureCreditINPS");
      this.$emit("failureCreditINPS", flag);
    },

    async printFile(fileData, language = 0) {
      this.loading.splice(language, 1, true);
      let file = null;
      this.fileData.lang = language;
      this.fileData.data = fileData;
      const docId = this.docId[language] ? this.docId[language] : null
      try {
        console.log(JSON.stringify(this.fileData, null, 2));

        if (docId) {
          file = await this.$store.dispatch(
            "credits/getFile",
            docId
          );
        } else {
          file = await this.$store.dispatch("credits/getFile", this.fileData);

          if (file) {
            this.docId[language] = file.id; // для кеширования id
          }
        }

        console.log("file", file);

        if (file) {
          printJS(file.url);
          window.URL.revokeObjectURL(file.url);
        }

        this.loading.splice(language, 1, false);
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.loading.splice(language, 1, false);
      }
    },
  },

  filters: {
    formatNumber,
  },
};
</script>
<style lang="scss">
.preApprovalBlock {
  max-width: 620px !important;
  width: 620px;
  min-height: 290px;
  padding: 20px 30px;

  &__title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  // .q-dialog__inner--minimized > div {
  //   max-width: 620px;
  // }

  .print {
    margin-left: 10px;
    .q-btn__content {
      font-size: 12px;
      color: #74798c;
    }

    .q-btn__wrapper {
      padding: 0;
    }

    &__text {
      margin-left: 2px;
    }

    .q-btn__wrapper::before {
      box-shadow: none;
    }
  }

  .items-start {
    padding: 0;

    .text-h6 {
      font-size: 18px;
      font-weight: 600;
    }

    .resonFailure {
      color: #ea2250;
      text-align: center;
      margin-bottom: 10px;
    }

    .creditBackground {
      padding-bottom: 12px;
      width: 100%;
      // background: url("~assets/images/credit/ornament.png") no-repeat 0 0;
      //assets/images/credit/ornament.png
      .personName {
        margin: 15px 0 0 0;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        line-height: 24px;
        color: #384966;

        &::after {
          content: "";
          display: block;
          height: 1px;
          background: #f2f2f2;
          margin-top: 15px;
        }
      }

      .creditTable {
        margin: 30px 0 60px 0;
        &__row {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          font-size: 16px;
          font-weight: 600;

          .dashed {
            position: absolute;
            border: 1px dashed #f2f2f2;
            width: 100%;
            top: 13px;
          }
        }

        &__field,
        &__value__green,
        &__value__red {
          background: #ffffff;
          z-index: 10;
        }

        &__field {
          color: #273959;
          padding-right: 60px;
          text-align: left;
          max-width: 365px;
        }

        &__value__green {
          color: #61c9a9;
          padding-left: 60px;
        }

        &__value__red {
          color: #ff8787;
          padding-left: 60px;
        }
      }
    }
  }

  .failureCredit {
    text-align: center;
    color: $red-5;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .preappBtnSuccess,
  .preappBtnFailure {
    margin: 0 10px;
    border-radius: 0;
    width: 186px;

    .q-btn__content {
      font-size: 14px;
      padding: 12px;
      color: #ffffff;
    }
  }

  .preappBtnFailure {
    background: #ff4a4a;
  }

  .preappBtnSuccess {
    background: #47b881;
  }

  .continue {
    background: #47b881;
    border-radius: 0;
    margin-top: 40px;

    .q-btn__content {
      font-size: 14px;
      padding: 12px 45px;
      color: #ffffff;
    }
  }

  .reson {
    color: #a0a5ba;
  }

  .q-field__control:before,
  .q-field__control:after {
    content: none;
  }
}
</style>
