<template>
  <q-card style="width:500px">
    <q-card-section class="bg-blue-7 text-white">
      <div class="text-h6">Ответсвенные по документу №{{ task.f_task_data.doc_id }}</div>
    </q-card-section>

    <q-card-section style="max-height: 70vh" class="scroll">
      <q-tree :nodes="props" default-expand-all :selected.sync="selected" node-key="label" />
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn :label="$t('actions.close')" color="white" text-color="black" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "DialogHierarchy",
  data() {
    return {
      selected: null
      //props: this.props
    };
  },
  computed: {
    task() {
      return this.$store.getters["task/getCurrentTask"];
    },
    props() {
      return this.$store.getters["task/getUserHierarchy"];
    }
  }
};
</script>
