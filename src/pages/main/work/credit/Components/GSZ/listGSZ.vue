<template>
  <div>
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td :colspan="0 !== 1 ? 6 : null"></td>
          <template v-if="0 === 1">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </template>  
          <td></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss">

</style>