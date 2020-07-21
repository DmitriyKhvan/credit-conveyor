<template>
  <q-table
    title="Последние документы"
    :data="data"
    :columns="columns"
    row-key="name"
    separator="none"
  />
</template>
<script>
export default {
  data(){
    return {
      columns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name'},
        { name: 'magazine', align: 'left', label: 'Журнал', field: 'magazine', sortable: true },
        { name: 'status', align: 'left', label: 'Статус', field: 'status' },
        { name: 'data', align: 'left', label: 'Дата', field: 'data', sortable: true },
        { name: 'descripton', align: 'left', label: 'Описание', field: 'descripton' },
      ],
      data: [
        {
          name: 'Document 1',
          magazine: 'ЦБ',
          status: 'Closed',
          data: '09/12/2017',
          descripton: 'Покупка нового оборудования для отдела разработ',
        },
        {
          name: 'Doc 2',
          magazine: 'ЦБ',
          status: 'Active',
          data: '06/16/2017',
          descripton: 'Усиление охраны в отделе кредитов',
        },
        {
          name: 'New docs',
          magazine: 'ЦБ',
          status: 'Idle',
          data: '04/05/2017',
          descripton: 'Модернизация оборудования',
        },
        {
          name: 'My document',
          magazine: 'ЦБ',
          status: 'Active',
          data: '02/13/2017',
          descripton: 'The Idea Of God Is Not Henceforth Relevant',
        },
      ]
    }
  }
}
</script>
<style>
  .q-table__middle {
    padding: 0 20px;
  }
  .q-table__card {
    padding: 20px 30px;
  }
  .q-table th, .q-table td {
    padding: 25px 16px;
  }
  .q-table__title {
    font-size: 24px;
  }
  .q-table__top {
    padding-left: 0;
  }
  .q-table__bottom {
    font-size: 16px;
    padding: 15px 0;
  }
</style>
