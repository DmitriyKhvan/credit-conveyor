<template>
  <div>
    <div v-if="data.length"> 
      <q-markup-table 
        separator="cell" 
        flat 
        bordered
      >
        <thead>
          <tr>
            <th>ID договора</th>
            <th>Месяц</th>
            <th>Сумма срочной задолженности на начало месяца</th>
            <th>Сумма просроченной задолженности</th>
            <th>Сумма срочной задолженности на конец месяца</th>
            <th>Сумма просроченной задолженности по процентам</th>
            <th>Сумма просрочек</th>
          </tr>
        </thead>
        <tbody
          v-for="(overdue_payment, index) of data" 
          :key="'overdue_payment.id' + index"
          v-if="overdue_payment.overdue.items.length && overdue_payment.id_contract"
        >
          <tr 
            v-for="(overdue, index) of overdue_payment.overdue.items" :key="'overdue' + index"
          >
            <td>{{ overdue_payment.id_contract }}</td>
            <td>{{ overdue.month }}</td>
            <td>{{ overdue.begin_sum | formatNumber }}</td>
            <td>{{ overdue.overdue_sum | formatNumber }}</td>
            <td>{{ overdue.end_sum | formatNumber }}</td>
            <td>{{ overdue.overdue_percent | formatNumber }}</td>
            <td>{{ overdue.total_overdue | formatNumber }}</td>
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
import formatNumber from "../../filters/format_number";

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
  filters: {
    formatNumber,
  },
}
</script>

<style lang="scss">

</style>