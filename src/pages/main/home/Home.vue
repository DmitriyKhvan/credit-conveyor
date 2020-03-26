<template>
  <div>
    <div class="row q-pa-lg q-col-gutter-md">
      <div class="col-lg-9 col-md-6 col-sm-12">
        <q-card square flat bordered class="height100">
          <q-card-section class="bg-grey-3">
            <div class="text-h6">Уведомления</div>
          </q-card-section>
          <div class="row">
            <div class="col-lg-7 col-md-6 col-sm-12">
              <s-finance />  
            </div>
            <div class="col-lg-5 col-md-6 col-sm-12">
              <s-task />
            </div>         
          </div>
        </q-card>
        
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <s-notificatons />
      </div>
    </div>
    
    <div class="row q-col-gutter-md q-px-lg q-mb-sm">
      <div class="col-lg-9 col-md-6 col-sm-12">
        <s-calendar />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 q-pl-md">
        <s-results />
      </div>
    </div>


  </div>
</template>

<script>
import Finance from "../library/charts/finance/Finance";
import Task from "../library/charts/task/Task";
import Notifications from "./components/notifications";
import Calendar from "./components/calendar";
import Results from "./components/results";

export default {
  name: "Home",
  components: {
    SFinance: Finance,
    STask: Task,
    SNotificatons: Notifications,
    SCalendar: Calendar,
    SResults: Results
  },
  
};
</script>

<style lang="sass" scoped>
  .height100
    height: 100%
</style>
