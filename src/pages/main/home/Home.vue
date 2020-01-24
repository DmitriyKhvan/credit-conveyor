<template>
  <div class="q-pa-md row items-start wrap q-gutter-md">
    <q-card class="col-6">
      <s-finance />
    </q-card>
    <q-card class="col-5">
      <s-task />
    </q-card>
    <q-calendar locale="ru" />
  </div>
</template>

<script>
import Finance from "../library/charts/finance/Finance";
import Task from "../library/charts/task/Task";
export default {
  name: "Home",
  components: {
    SFinance: Finance,
    STask: Task
  },
  data() {
    return {};
  }
};
</script>

<style></style>
