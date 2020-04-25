<template>
<div class="creditConveyor">
  <!-- <div class="creditMenu">
    <q-btn 
      class="subMenuCredit"
      flat  
      to="/work/credit/registration"
    > -->
      <!-- Надо подумать как добавить outline параметр для реверсии цвета!!! -->
      <!-- <q-icon 
        name="library_add" 
      /> -->
      <!--  -->
      <!-- <q-tooltip anchor="bottom left" self="top left">
        Форма регистрации клиента
      </q-tooltip>
      <q-toolbar-title>
        Cоздать заявку
      </q-toolbar-title>
    </q-btn> -->

    <!-- <q-btn class="subMenuCredit" flat icon="library_books" to="/work/credit/applications">
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
  </div> -->
  
  <router-view></router-view>

  <!-- Server error message -->
  <errorMessage></errorMessage>
</div>
</template>
<script>
import ErrorMessage from './ErrorMessage'

export default {
  name: "credit",
  computed: {
    error() {
      console.log('computed', this.$store.getters["credits/message"])
      return this.$store.getters["credits/messageId"]
    }
  },
  watch: {
    error(serverError) {   
      this.$store.commit("credits/toggleMessageBar", true)
      console.log('watch', this.$store.getters["credits/messageBar"])
    }
  },

  components: {
    errorMessage: ErrorMessage
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
