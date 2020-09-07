<template>
  <div class="row q-pa-lg">
    <div class="col">
      <a-filter></a-filter>

      <div class="row content q-pa-md q-my-lg">
        <div class="col">
          <a-views></a-views>
          <a-task v-for="d in docs" :key="d.doc_id" :doc="d"></a-task>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Task from "./components/Task";
import Views from "./components/Views";
import Filter from "./components/Filter";

export default {
  components: {
    ATask: Task,
    AViews: Views,
    AFilter: Filter,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      docs: "apparat/getAllDocs",
    }),
  },
  created() {
    this.$store.dispatch("apparat/loadFilters");
    this.$store.dispatch("apparat/loadAllDocs", { page: 1 });
  },
};
</script>
<style scoped>
.content {
  background: #fff;
}
</style>
<style>
.buttonFilter .q-btn__content div {
  font-size: 16px;
  text-transform: none;
}
.buttonTask .q-btn__content div {
  font-size: 14px;
  font-weight: bold;
}
.buttonTask .q-btn__wrapper {
  min-height: 10px;
}
</style>
