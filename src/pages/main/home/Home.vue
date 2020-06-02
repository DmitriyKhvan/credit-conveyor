<template>
  <div>
    <div class="row q-col-gutter-lg q-pa-md">
      <div class="col-lg-9 col-md-12">
        <div class="row">
          <div class="col q-pb-md">
            <q-card square flat bordered class="height100">
              <q-card-section class="bg-grey-3">
                <div class="text-h6">Уведомления</div>
              </q-card-section>
              <div class="row q-col-gutter-lg q-px-md q-py-lg">
                <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                  <s-graf v-if="graf" :tables="graf" height="120" title="Мои доходы за последние 6 месяцев"/>
                  <q-circular-progress
                    v-else
                    indeterminate
                    size="50px"
                    color="primary"
                    class="q-ma-md"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                  <s-graf v-if="result" :tables="result" height="120" title="Мои результаты"/> 
                  <q-circular-progress
                    v-else
                    indeterminate
                    size="50px"
                    color="primary"
                    class="q-ma-md"
                  />                 
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <s-calendar />
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-12">
        <div class="row q-col-gutter-lg">
          <div class="col-lg-12 col-md-6 col-sm-12">
            <s-notificatons />
          </div>
          <div class="col-lg-12 col-md-6 col-sm-12">
            <s-results />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Finance from "../library/charts/finance/Finance";
// import Task from "../library/charts/task/Task";
import Notifications from "./components/notifications";
import Calendar from "./components/calendar";
import Results from "./components/results";
import Graf from "./components/graf";
import axios from "axios";

export default {
  name: "Home",
  components: {
    // SFinance: Finance,
    // STask: Task,
    SNotificatons: Notifications,
    SCalendar: Calendar,
    SResults: Results,
    SGraf: Graf
  },
  data () {
    return {
      graf: null,
      result: null
    }
  },
  created () {
    const id = this.$store.getters["auth/empId"]
    axios
        .get("/emps/kvitok?uid="+id)
        .then(response => {             
            this.graf = response.data                
        })
        .catch(error => {
            console.log('error') 
        });

    axios
        .get("/tasks/count")
        .then(response => {           
            this.result = response.data            
        })
        .catch(error => {
            console.log('error') 
        });

    
    
  }
};
</script>

<style lang="sass" scoped>
.height100
  height: 100%
</style>
