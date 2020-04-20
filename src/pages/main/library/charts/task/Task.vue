<template>
  <div>
    <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
      :settings="{ packages: ['bar'] }"
    />
  </div>
</template>

<script>
import axios from "axios";
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
        ["Element", "Количество", { role: "style" }],
        ["Новый", 8, "#b87333"],
        ["Принял", 20, "silver"],
        ["Работаю", 8, "gold"],
        ["Исполнено", 25, "#e5e4e2"]
      ],
      chartOptions: {
        title: "Количество задач за 1 календарный месяц",
        chartArea: { width: "80%" },
        height: 300,
        bar: { groupWidth: "90%" },
        legend: { position: "none" }
      }
    };
  },
  created () {
    axios
        .get("/tasks/count")
        .then(response => { 
            this.chartData = response.data            
        })
        .catch(error => {
            console.log('error') 
        });
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
