<template>
  <div>
    <div v-if="data.length"> 
      <q-markup-table separator="cell" flat bordered>
        <thead>
          <tr>
            <th colspan="3">Клиент</th>
            <th colspan="3">Кредит</th>
            <th colspan="3">Просрочка</th>
            <th>Комментарий</th>
          </tr>
          <tr>
            <th>Имя</th>
            <th>Паспорт</th>
            <th>ИНН</th>
            <th>Номер договора</th>
            <th>Код филиала</th>
            <th>Сумма договора</th>
            <th>По основному долгу</th>
            <th>По процентам</th>
            <th>Начисленная пеня</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(GRCInfo, index) of data" :key="'GRCInfo' + index">
            <td>{{ GRCInfo.creditContract.info.items[0].name }}</td>
            <td>{{ GRCInfo.client.passportSerial }}{{ GRCInfo.client.passportNumber }}</td>
            <td>{{ GRCInfo.client.INN }}</td>
            <td>{{ GRCInfo.creditContract.info.items[0].number }}</td>
            <td>{{ GRCInfo.creditContract.info.items[0].mfo }}</td>
            <td>{{ GRCInfo.creditContract.info.items[0].amount | formatNumber}} {{ GRCInfo.creditContract.info.items[index].currency }}</td>
            <td>{{ GRCInfo.creditContract.info.items[0].pamentDetail.pr_amount }}</td>
            <td>{{ GRCInfo.creditContract.info.items[0].pamentDetail.in_amount }}</td>
            <td>{{ GRCInfo.creditContract.info.items[0].pamentDetail.ps_amount }}</td>

            <!-- <td :colspan="0 !== 1 ? 6 : null">{{ GRCInfo.creditContract.info.items[index].number }}</td>
            <template v-if="0 === 1">
              <td>{{ GRCInfo.mfo }}</td>
              <td>{{ GRCInfo.amount }} {{ GRCInfo.currency }}</td>
              <td>{{ GRCInfo.paymentDetail.pr_amount }}</td>
              <td>{{ GRCInfo.paymentDetail.in_amount }}</td>
              <td>{{ GRCInfo.paymentDetail.ps_amount }}</td>
            </template>   -->
            <td></td>
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
  created() {
    console.log("GSZ", this.data)
    // console.log("client", this.client)
  },
  filters: {
    formatNumber,
  },
}
</script>

<style lang="scss">

</style>