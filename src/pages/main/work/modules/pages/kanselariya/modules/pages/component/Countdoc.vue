<template>
  <div>
    <q-card square flat class="card-style">
      <q-table
        title="Количество всех зарегистрированных документов по журналу"
        :data="data"
        :columns="columns"
        row-key="name"
        hide-bottom
        dense
        separator="cell"
      />
    </q-card>
  </div>
</template>
<script>
export default {
  name: "count",
  data() {
    return {
      columns: [
        { name: "name1", label: "Бизнес", field: "name1", align: "left" },
        { name: "name2", label: "дсп", field: "name2", align: "left" },
        { name: "name3", label: "Исходящие", field: "name3", align: "left" },
        { name: "name4", label: "Зарубежные", field: "name4", align: "left" },
        { name: "name5", label: "НБ,ЦБ (отд)", field: "name5", align: "left" },
        { name: "name6", label: "Граждане", field: "name6", align: "left" },
        { name: "name7", label: "Кабмин", field: "name7", align: "left" },
        { name: "name8", label: "Организации", field: "name8", align: "left" },
        { name: "name9", label: "Отделения", field: "name9", align: "left" },
        {
          name: "name10",
          label: "План мероприятий",
          field: "name10",
          align: "left"
        },
        { name: "name11", label: "ПОРТАЛ", field: "name11", align: "left" },
        { name: "name12", label: "ПОРТАЛ НБУ", field: "name12", align: "left" },
        {
          name: "name13",
          label: "ПОРТАЛ ГЕН.ПРОК",
          field: "name13",
          align: "left"
        },
        { name: "name14", label: "Поручения", field: "name14", align: "left" },
        { name: "name15", label: "право", field: "name15", align: "left" },
        { name: "name16", label: "Приказы", field: "name16", align: "left" },
        { name: "name17", label: "Протоколы", field: "name17", align: "left" },
        {
          name: "name18",
          label: "Распоряжения",
          field: "name18",
          align: "left"
        },
        { name: "name19", label: "Сотрудники", field: "name19", align: "left" },
        {
          name: "name20",
          label: "телефон доверия",
          field: "name20",
          align: "left"
        }
      ],
      data: [
        {
          name1: 25000,
          name2: 1595,
          name3: 656,
          name4: 4589,
          name5: 4563,
          name6: 14785,
          name7: 1256,
          name8: 1963,
          name9: 1726,
          name10: 12500,
          name11: 1999,
          name12: 1999,
          name13: 1999,
          name14: 1999,
          name15: 1999,
          name16: 1999,
          name17: 1999,
          name18: 1999,
          name19: 1999,
          name20: 1999,
          name21: 1999
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.card-style {
  border: 1px solid #abb2b9;
  margin-top: 10px;
  .title {
    font-size: 20px;
  }
}
</style>
