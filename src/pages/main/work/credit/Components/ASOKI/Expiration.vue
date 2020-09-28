<template>
  <div>
    <q-markup-table separator="cell" flat bordered>
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
      <tbody>
        <tr v-for="(overdue_payment, index) of data" :key="overdue_payment.id_contract">
          <td>{{ overdue_payment.id_contract }}</td>
          <td>{{ overdue_payment.overdue.items[index].month }}</td>
          <td>{{ overdue_payment.overdue.items[index].begin_sum }}</td>
          <td>{{ overdue_payment.overdue.items[index].overdue_sum }}</td>
          <td>{{ overdue_payment.overdue.items[index].end_sum }}</td>
          <td>{{ overdue_payment.overdue.items[index].overdue_percent }}</td>
          <td>{{ overdue_payment.overdue.items[index].total_overdue }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss">

</style>