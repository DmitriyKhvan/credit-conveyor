<template>
  <q-card style="width:500px">
    <q-card-section class="bg-blue-7 text-white">
      <div class="text-h6">{{$t('tables.work.assistant.dialog.resp_for_doc_num')}} 6765</div>
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
      selected: null,
      props: [
        {
          label: "Касымов А.Л.",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          children: [
            {
              label: "Петров В.В.",
              icon: "check_circle",
              children: [
                { label: "Хамдамов А.А.", icon: "check_circle" },
                { label: "Сидоров У.К." }
              ]
            },
            {
              label: "Васичкин В.В.",
              icon: "check_circle",
              children: [
                { label: "Таджиев У.У." },
                { label: "Леонов Ф.Ф.", icon: "check_circle" }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>