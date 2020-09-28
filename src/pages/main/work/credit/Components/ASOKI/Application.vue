<template>
  <div>
    <q-markup-table separator="cell" flat bordered>
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
          <td>{{ claim.credit_debt }}</td>
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
  }, 
  created() {
    console.log("claim", this.data)
  }
}
</script>

<style lang="scss">

</style>