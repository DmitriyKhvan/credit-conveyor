<template>
  <div>
    <!-- <q-toolbar class="bg-grey-3"> -->
    <q-btn 
      flat dense icon="library_add" 
      to="/work/credit/registration"
    >
      <q-tooltip anchor="bottom left" self="top left">
        Форма регистрации клиента
      </q-tooltip>
      <q-toolbar-title>
        Cоздать заявку
      </q-toolbar-title>
    </q-btn>

    <q-btn flat dense icon="library_books" :to="link">
      <q-tooltip anchor="bottom left" self="top left">
        Список заявок
      </q-tooltip>
      <q-toolbar-title>
        Очередь заявок
      </q-toolbar-title>
    </q-btn>

    <q-btn flat dense icon="library_add_check" to="/work/credit/taskQueue">
      <q-tooltip anchor="bottom left" self="top left">
        Список задач
      </q-tooltip>
      <q-toolbar-title>
        Очередь задач
      </q-toolbar-title>
    </q-btn>

    <!-- </q-toolbar> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "credit",
  data() {
    return {
      link: ""
    };
  },
  created() {
    if (true) {
      this.link = "/work/credit/application";
    } else {
      this.link = "/work/credit/application2";
    }
  }
};
</script>

<style lang="scss">
  .q-btn--rectangle {
    background: $blue;
    color: #fff;
  }
</style>
