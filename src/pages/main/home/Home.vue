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
              <div class="row q-col-gutter-lg q-py-md">
                <div class="col-lg-7 col-md-7 col-sm-12">
                  <s-finance />
                </div>
                <div class="col-lg-5 col-md-5 col-sm-12">
                  <s-task />
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
  }
};
</script>

<style lang="sass" scoped>
.height100
  height: 100%
</style>
