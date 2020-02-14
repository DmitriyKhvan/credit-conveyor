<template>
  <div>
    <q-toolbar class="bg-grey-3">
      <q-btn
        flat
        dense
        icon="add"
        style="background-color: rgba(171, 178, 185, 0.2)"
        to="/work/credit/registration"
      >
        <q-tooltip anchor="bottom right" self="top left">
          Форма регистрации клиента
        </q-tooltip>
      </q-btn>
      <q-toolbar-title style="font-family: 'Lobster', cursive;">
        Cоздать заявку
      </q-toolbar-title>

      <q-btn
        flat
        dense
        icon="add"
        style="background-color: rgba(171, 178, 185, 0.2)"
        to="/work/credit/taskQueue"
      >
        <q-tooltip anchor="bottom right" self="top left">
          Список задач
        </q-tooltip>
      </q-btn>
      <q-toolbar-title style="font-family: 'Lobster', cursive;">
        Очередь задач
      </q-toolbar-title>

    <q-btn
        flat
        dense
        icon="add"
        style="background-color: rgba(171, 178, 185, 0.2)"
        to="/work/credit/application"
      >
        <q-tooltip anchor="bottom right" self="top left">
          Список заявок
        </q-tooltip>
      </q-btn>
      <q-toolbar-title style="font-family: 'Lobster', cursive;">
        Очередь заявок
      </q-toolbar-title>
    </q-toolbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "credit",
  data() {
    return {};
  }
};
</script>
