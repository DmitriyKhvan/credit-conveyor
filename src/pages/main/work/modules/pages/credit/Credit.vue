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
        Кредитный конвейер
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
