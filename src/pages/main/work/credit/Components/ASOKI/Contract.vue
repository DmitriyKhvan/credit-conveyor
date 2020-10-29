<template>
  <div>
    <div v-if="data.length">
      <q-markup-table  separator="cell" flat bordered>
        <thead>
          <tr>
            <!-- <th>Номер заявки</th> -->
            <th>Код отделения банка</th>
            <th>Сумма договора</th>
            <th>Сумма срочной задолженности</th>
            <th>Сумма пересмотренной ссудной задолженности</th>
            <th>Сумма кредитов в процессе судебных разбирательств</th>
            <th>Сумма просроченных проблемных задолженностей</th>
            <th>Сумма просроченной задолженности</th>
            <th>Сумма просроченных процентов</th>

            <th>Сумма переведенная на счета непредвиденных обстоятельств</th>
            <th>Сумма процентов на счетах непредвиденных обстоятельств</th>

            <th>Сумма начисленных процентов</th>
            <th>Сумма ежемесячного платежа</th>
            <!-- <th>Дата заявки</th> -->
            
            <th>Номер договора</th>
            <!-- <th>Вид договора</th> -->
            <th>Дата заключения договора</th>
            <th>Дата окончания договора</th>
            <th>Вид кредита</th>
            <!-- <th>Объект кредитования</th> -->
            <th>Процентная ставка</th>
            <!-- <th>Валюта договора</th> -->
            <!-- <th>Класс качества активов</th> -->
            
            
            
            <!-- <th>Дата пересмотренной ссудной задолженности</th>
            
            <th>Дата просроченной задолженности </th>
            
            <th>Дата судебных разбирательств</th>
            
            <th>Дата просроченных процентов</th>
            
            <th>Дата начисленных процентов</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="contract of data" :key="contract.claim_id">
            <template v-if="contract.contract_id">
              <!-- <td>{{ contract.claim_id }}</td> -->
              <td>{{ contract.branch }}</td>
              <td>{{ contract.summa | formatNumber }}</td>
              <td>{{ contract.loan_summa | formatNumber }}</td>
              <td>{{ contract.revised_summa | formatNumber}}</td>
              <td>{{ contract.lawsuit_summa | formatNumber }}</td>
              <td>{{ (contract.expired_summa + contract.expired_percent_summa + contract.fall_summa + contract.fall_percent_summa) | formatNumber}}</td>
              <td>{{ contract.expired_summa | formatNumber}}</td>
              <td>{{ contract.expired_percent_summa | formatNumber}}</td>

              <td>{{ contract.fall_summa | formatNumber}}</td>
              <td>{{ contract.fall_percent_summa | formatNumber}}</td>

              <td>{{ contract.percent_summa | formatNumber}}</td>
              <td>{{ }}</td>
              <!-- <td>{{ contract.claim_date }}</td> -->
              
              <td>{{ contract.contract_id }}</td>
              <!-- <td>{{ contract.contract_type }}</td> -->
              <td>{{ contract.contract_date }}</td>
              <td>{{ contract.contract_end_date }}</td>
              <td>{{ contract.credit_type }}</td>
              <!-- <td>{{ contract.credit_object }}</td> -->
              <td>{{ contract.percent }}</td>
              <!-- <td>{{ contract.currency }}</td> -->
              <!-- <td>{{ contract.quality }}</td> -->
              
              
              
              <!-- <td>{{ contract.revised_date }}</td>
              
              <td>{{ contract.expired_date }}</td>
              
              <td>{{ contract.lawsuit_date }}</td>
              
              <td>{{ contract.expired_percent_date }}</td>
              
              <td>{{ contract.percent_date }}</td> -->
            </template>
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