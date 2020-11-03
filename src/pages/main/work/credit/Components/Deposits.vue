<template>
  <div>
    <div v-if="data.length"> 
      <q-markup-table separator="cell" flat bordered>
        <thead>
          <tr>
            <th>Название депозита</th>
            <th>Валюта депозита</th>
            <th>Сумма депозита</th>
            <th>Минимальный платеж</th>
            <th>Проценты</th>
            <th>Номер счета</th>
            <th>МФО филиала</th>
            <th>Дата запроса</th>
            <th>Курс валюты</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(deposit, index) of data" :key="deposit.req_date + index">
            <td>{{ deposit.name }}</td>
            <td>{{ deposit.currency }}</td>
            <td>{{ deposit.amount | formatNumber }}</td>
            <td>{{ deposit.min_payment | formatNumber }}</td>
            <td>{{ deposit.percent }}</td>
            <td>{{ deposit.number }}</td>
            <td>{{ deposit.mfo }}</td>
            <td>{{ deposit.req_date }}</td>
            <td>{{ deposit.curr_rate }}</td>
            <td>{{ deposit.uzs_amount | formatNumber }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div v-else>
      <h2 class="messageTitle">{{status}}</h2>
    </div>
  </div>
</template>
<script>
import formatNumber from "../filters/format_number"

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      default: ""
    }
  },
  created() {
    console.log('deposits', this.data)
  },
  filters: {
    formatNumber,
  },
}
</script>

<style lang="scss">

</style>