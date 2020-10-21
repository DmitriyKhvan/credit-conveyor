<template>
  <div>
    <div v-if="!data.length && status == 'FAILED'"> 
      <h2 class="messageTitle">Ошибка в заросе АСОКИ</h2>
    </div>

    <div v-else-if="!data.length && status == 'SUCCESS'"> 
      <h2 class="messageTitle">Данные не найдены</h2>
    </div>

    <q-markup-table v-else separator="cell" flat bordered>
      <thead>
        <tr>
          <th>Номер и дата заявки</th>
          <th>Название организации</th>
          <th>Тип класса качества</th>
          <th>Номер и дата договора</th>
          <th>Дата окончания договора</th>
          <th>Сумма срочной задолженности </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="claim of data" :key="claim.claim_date_number">
          <td>{{ claim.claim_date_number }}</td>
          <td>{{ claim.org_name }}</td>
          <td>{{ claim.credit_quality }}</td>
          <td>{{ claim.credit_date_number }}</td>
          <td>{{ claim.credit_end_date }}</td>
          <td>{{ claim.credit_debt | formatNumber}}</td>
        </tr>
      </tbody>
    </q-markup-table>
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