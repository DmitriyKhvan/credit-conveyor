<template>
  <div class="creditMenu">
    <!-- <q-toolbar class="bg-grey-3"> -->
    <q-btn 
      class="subMenuCredit"
      flat  
      to="/work/credit/registration"
    >
      <!-- Надо подумать как добавить outline параметр для реверсии цвета!!! -->
      <q-icon 
        name="library_add" 
      />
      <!--  -->
      <q-tooltip anchor="bottom left" self="top left">
        Форма регистрации клиента
      </q-tooltip>
      <q-toolbar-title>
        Cоздать заявку
      </q-toolbar-title>
    </q-btn>

    <q-btn class="subMenuCredit" flat icon="library_books" :to="link">
      <q-tooltip anchor="bottom left" self="top left">
        Список заявок
      </q-tooltip>
      <q-toolbar-title>
        Очередь заявок
      </q-toolbar-title>
    </q-btn>

    <q-btn class="subMenuCredit" flat icon="library_add_check" to="/work/credit/taskQueue">
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
<style lang="scss" scoped>
  .creditMenu {
    margin: 15px;
  }

  .q-btn--rectangle {
    background: $blue;
    color: #fff;
    margin-right: 15px;
  }
  .ellipsis {
    font-size: 1rem
  }
</style>

<style>
  /* .subMenuCredit {
    border-radius: 3px;
  } */
</style>
