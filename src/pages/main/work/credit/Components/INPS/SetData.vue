<template>
  <div class="addSalary">
    <q-btn class="close" @click="closeModel" icon="close" round>
      <q-tooltip>Закрыть</q-tooltip>
    </q-btn>
    <div class="salaryMessage">
      <!-- <p>Данные по клиенту в базе данных Халк Банка отсутствуют. Необходимо ввести данные вручную со справки о заработной плате с места работы клиента.</p> -->
      <p>{{ msg }}</p>
    </div>

    <div v-if="decision.code !== 1">
      <div class="salaryMessage" v-if="decision.code == 0">
        <p>Ручной ввод запрещен!</p>
      </div>
      <q-btn
        label="Ввести заработные поступления вручную"
        class="getDataBtn"
        @click="getINPSSalaryInput"
      />
    </div>

    <form v-else-if="decision.code === 1" @submit.prevent.stop="onSubmit">
      <q-markup-table separator="cell" flat bordered>
        <thead>
          <tr>
            <th>№</th>
            <th>ИНН организации</th>
            <th>Название организации</th>
            <th>Период</th>
            <th colspan="2">Начисленно</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(salary, index) of salaries" :key="index + 'salary'">
            <td>{{ index + 1 }}</td>
            <td>
              <q-input
                ref="INN"
                square
                outlined
                v-model="salary.inn"
                dense
                mask="#########"
                :rules="[
                  val =>
                    (val && val.length === 9) ||
                    'Количество цифр должно быть 9',
                  val => INNYurValid(val)
                ]"
              />
            </td>
            <td>
              <q-input
                ref="org_name"
                square
                outlined
                v-model="salary.name"
                dense
                :rules="[val => !!val || 'Введите название']"
              />
            </td>
            <td>
              <q-input
                ref="period"
                outlined
                square
                dense
                v-model="salary.month"
                mask="##.##.####"
                :rules="[val => (val && val.length === 10) || 'Введите период']"
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
                        v-model="salary.month"
                        @input="
                          $event => {
                            $refs.qDate[index].hide();
                          }
                        "
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </td>
            <td>
              <q-input
                ref="salary"
                square
                outlined
                v-model="salary.sum"
                @input="formatNumberSalary(index)"
                dense
                :rules="[
                  val => !!val || 'Введите сумму',
                  val => val != 0 || 'Некорректные данные'
                ]"
              />
            </td>
            <td>
              <q-btn
                v-if="index + 1 == salaries.length && salaries.length != 1"
                flat
                round
                color="black"
                icon="clear"
                @click.prevent="removeSalary(index)"
              >
                <q-tooltip>Удалить</q-tooltip>
              </q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <div class="btnBlock">
        <q-btn
          color="green"
          label="Добавить месяц"
          class="q-ml-sm"
          @click="addSalary"
        />

        <q-btn
          type="submit"
          color="primary"
          label="Сохранить"
          class="q-ml-sm"
        />
      </div>
      <q-field
        ref="salaries"
        :value="salaries.length >= 3 && salaries.length <= 12"
        :rules="[val => val || 'Заполните от 3 до 12 месяцев']"
      />
    </form>

    <appLoaderFullScreen v-if="loader" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LoaderFullScreen from "@/components/LoaderFullScreen";
import CommonUtils from "@/shared/utils/CommonUtils";
import { validItems, validFilter } from "../../filters/valid_filter";
import formatNumber from "../../filters/format_number";
import validations from "../../mixins/validations";

export default {
  mixins: [validations],
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      decision: {
        code: null,
        message: ""
      },
      dataINPS: null,
      loader: false,
      salaries: [
        {
          inn: null,
          name: "",
          month: "",
          sum: null
        }
      ]
    };
  },
  computed: {
    ...mapState({
      profile: state => state.profile,
      fullProfile: state => state.profile.fullFormProfile
    }),
    ...mapGetters({
      preapprove_num: "profile/preapprove_num"
    })
  },
  methods: {
    formatNumberSalary(idx) {
      this.salaries[idx].sum = formatNumber(this.salaries[idx].sum);
    },

    // innValid(val) {
    //   return !val.match(/(?=(.))\1{9,}/) || "Неверные данные";
    // },

    addSalary() {
      console.log("salaries", this.salaries);

      validFilter(this.$refs, "INNValid", "INN");
      validFilter(this.$refs, "org_nameValid", "org_name");
      validFilter(this.$refs, "periodValid", "period");
      validFilter(this.$refs, "salaryValid", "salary");

      if (
        this.$refs.INNValid.hasError ||
        this.$refs.org_nameValid.hasError ||
        this.$refs.periodValid.hasError ||
        this.$refs.salaryValid.hasError
      ) {
        this.formHasError = true;
      } else {
        this.salaries.push({
          inn: this.salaries[this.salaries.length - 1].inn,
          name: this.salaries[this.salaries.length - 1].name,
          month: "",
          sum: null
        });
      }
    },

    removeSalary(idx) {
      this.salaries.splice(idx, 1);
    },

    async onSubmit() {
      validFilter(this.$refs, "INNValid", "INN");
      validFilter(this.$refs, "org_nameValid", "org_name");
      validFilter(this.$refs, "periodValid", "period");
      validFilter(this.$refs, "salaryValid", "salary");
      this.$refs.salaries.validate();

      if (
        this.$refs.INNValid.hasError ||
        this.$refs.org_nameValid.hasError ||
        this.$refs.periodValid.hasError ||
        this.$refs.salaryValid.hasError ||
        this.$refs.salaries.hasError
      ) {
        this.formHasError = true;
      } else {
        this.loader = true;

        this.salaries.forEach(
          salary => (salary.sum = +salary.sum.replace(/[^0-9]/gim, ""))
        );

        const data = {
          input: [
            {
              name: "application_id",
              data: this.preapprove_num
            },
            {
              name: "from",
              data: "setData"
            },
            {
              name: "setData",
              data: this.salaries
            }
          ]
        };

        console.log("dataSaler", data);

        try {
          this.dataINPS = await this.$store.dispatch("profile/dataINPS", data);
          if (this.dataINPS) {
            this.loader = false;
            this.$emit("closeBar", false);
          }
        } catch (error) {
          this.$store.commit("credits/setMessage", {
            message: CommonUtils.filterServerError(error),
            code: 0
          });
          this.loader = false;
        }
      }
    },

    closeModel() {
      this.$emit("closeBar", false);
    },

    async getINPSSalaryInput() {
      this.loader = true;
      try {
        this.decision = await this.$store.dispatch(
          "creditSettings/getINPSSalaryInput",
          {
            creditId: this.fullProfile.LoanInfo.LoanProduct,
            applicationId: this.fullProfile.ApplicationID
          }
        );
        this.loader = false;
      } catch (error) {
        this.$store.commit("credits/setMessage", {
          message: CommonUtils.filterServerError(error),
          code: 0
        });
        this.loader = false;
      }
    }
  },

  components: {
    appLoaderFullScreen: LoaderFullScreen
  }
};
</script>

<style lang="scss">
.addSalary {
  padding: 5px;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;

    i {
      font-size: 1.4em;
    }
  }

  .q-btn__wrapper:before {
    box-shadow: none;
  }

  .closeModel {
    margin-left: auto;
  }

  .salaryMessage {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .q-card {
    max-width: auto;
  }

  .q-field--with-bottom {
    padding-bottom: 10px;
  }

  .q-table th,
  .q-table td {
    padding: 5px;
  }

  .q-field__bottom {
    padding: 0;
  }

  .q-field--auto-height .q-field__control-container {
    display: flex;
    flex-direction: column;
  }

  .q-field--auto-height .q-field__control,
  .q-field--auto-height .q-field__native {
    min-height: 42px;
  }

  .q-field--standard .q-field__control:after {
    height: auto;
    top: 0;
    background: none;
  }

  .getDataBtn {
    background: #4ab8ff;

    .q-btn__content {
      padding: 7px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
