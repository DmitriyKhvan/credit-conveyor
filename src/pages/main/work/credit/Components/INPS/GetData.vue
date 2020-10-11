<template>
  <div class="dataINPS">
    <div class="salaryBlock">
      <div class="salaryItem">
        <h6>Минимальное поступление</h6>
        <span>{{ salaries.min }}</span>
      </div>

      <div class="salaryItem">
        <h6>Максимальное поступление</h6>
        <span>{{ salaries.max }}</span>
      </div>

      <div class="salaryItem">
        <h6>Среднее значение</h6>
        <span>{{ salaries.average }}</span>
      </div>

      <div class="salaryItem">
        <h6>Поступлений за период 12 месяцев</h6>
        <span>{{ salaries.yearWages }}</span>
      </div>
    </div>
    <q-markup-table separator="cell" flat bordered>
      <thead>
        <tr>
          <th>№</th>
          <th>ИНН организации</th>
          <th>Название организации</th>
          <th>Период</th>
          <th>Начисленно</th>
          <th>Налоги</th>
          <th>Баланс</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(salary, index) of salaries.wages.items"
          :key="index + 'salary'"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <p>{{ salary.inn }}</p>
          </td>
          <td>
            <p>{{ salary.org_name }}</p>
          </td>
          <td>
            <p>{{ salary.period }}</p>
          </td>
          <td>
            <p>{{ salary.total_invoices.full | formatNumber }}</p>
          </td>
          <td>
            <p>{{ salary.total_invoices.percent | formatNumber }}</p>
          </td>
          <td>
            <p>{{ salary.total_invoices.balance | formatNumber }}</p>
          </td>
        </tr>
      </tbody>

      <!-- <tbody>
        <tr v-for="(salary, index) of salaries.wages.items" :key="salary.period">
          <td>{{ index + 1 }}</td>
          <td>
            <q-input
              disable
              ref="INN"
              square
              outlined
              v-model="salary.inn"
              dense
              mask="#########"
              :rules="[
                val =>
                  (val && val.length === 9) || 'Количество цифр должно быть 9',
                val => innValid(val)
              ]"
            />
          </td>
          <td>
            <q-input
              disable
              ref="org_name"
              square
              outlined
              v-model="salary.org_name"
              dense
              :rules="[val => !!val || 'Введите название']"
            />
          </td>
          <td>
            <q-input
              disable
              ref="period"
              outlined
              square
              dense
              v-model="salary.period"
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
                      v-model="salary.period"
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
              disable
              ref="salary"
              square
              outlined
              v-model.number="salary.total_invoices.full"
              type="number"
              dense
              :rules="[
                val => !!val || 'Введите сумму',
                val => val > 0 || 'Некорректные данные'
              ]"
            />
          </td>
          <td>
            <q-input
              disable
              ref="taxes"
              square
              outlined
              v-model.number="salary.total_invoices.percent"
              type="number"
              dense
              :rules="[
                val => !!val || 'Введите сумму',
                val => val > 0 || 'Некорректные данные'
              ]"
            />
          </td>
          <td>
            <q-input
              disable
              ref="balance"
              square
              outlined
              v-model.number="salary.total_invoices.balance"
              type="number"
              dense
              :rules="[
                val => !!val || 'Введите сумму',
                val => val > 0 || 'Некорректные данные'
              ]"
            />
          </td>
        </tr>
      </tbody> -->
    </q-markup-table>

    <div class="btnBlock">
      <q-btn
        type="submit"
        color="primary"
        label="Закрыть"
        class="q-ml-sm"
        @click="closeDataINPS"
      />
    </div>
  </div>
</template>

<script>
import formatNumber from "../../filters/format_number"

export default {
  props: ["salaries"],
  data() {
    return {};
  },

  methods: {
    closeDataINPS() {
      this.$emit("closeBar", false);
    }
  },

  filters: {
    formatNumber
  }
};
</script>

<style lang="scss">
.dataINPS {
  .salaryBlock {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .salaryItem {
      margin: 0 5px;
      font-weight: bold;
      text-align: center;

      h6 {
        margin: 0;
      }
    }
  }
}
</style>
