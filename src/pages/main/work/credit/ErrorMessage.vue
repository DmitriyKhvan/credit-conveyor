<template>
  <q-dialog v-model="errorBar" persistent>
    <q-card>
      <q-bar>
        <div>Сообщение</div>

        <q-space />

        <q-btn dense flat icon="close" @click="redirect">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <p>{{ errorMessage }}</p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>Попробуйте снова</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import message from "@/shared/utils/messages";
export default {
  
  data() {
    return {
      //bar: true
    };
  },
  methods: {
    redirect() {
      //this.$store.commit('clearError')
      this.$store.commit('toggleErrorBar', false)
      this.$router.push("/work/credit")
    }
  },
  computed: {
    errorBar() {
      console.log("Причина ошибки", this.$store.getters.error)
      return this.$store.getters.errorBar
    },
    errorMessage() {
      return message[this.$store.getters.error] || "Что-то пошло не так";
    }
  }
};
</script>
