<template>
  <div>
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
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
      chartData: [],
      chartOptions: {
        title: "Мои доходы за последный 5 месяцев",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
        ars: "horizontal",
        height: 300
      }
    };
  },
  created () {
    const id = this.$store.getters["auth/empId"]
    axios
        .get("/emps/kvitok?uid="+id)
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
