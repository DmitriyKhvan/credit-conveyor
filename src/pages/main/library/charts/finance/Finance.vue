<template>
  <div>
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "Finance",
  components: {
    GChart
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Year", "Аванс", "Премия", "Зарплата", "Питания"],
        ["Сентябрь", 1000, 1500, 1200, 250],
        ["Октябрь", 1170, 2000, 1200, 250],
        ["Ноябрь", 660, 1800, 1200, 250],
        ["Декабрь", 1040, 1700, 1221, 406],
        ["Январь", 800, 1100, 1471, 406]
      ],
      chartOptions: {
        title: "Мои доходы за последный 5 месяцев",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
        ars: "horizontal",
        height: 300
      }
    };
  },
  methods: {
    currentdate() {
      let date = new Date();
      let year = date.getFullYear();
      return year;
    }
  }
};
</script>

<style></style>
