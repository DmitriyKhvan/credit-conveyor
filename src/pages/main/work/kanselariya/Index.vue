<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat to="/work/chancellary/registration">
        <q-icon name="note_add" />
      </q-btn>
      <q-toolbar-title>
        Канцелария
      </q-toolbar-title>
      <q-space />
    </q-toolbar>
    <div class="q-pa-md">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
