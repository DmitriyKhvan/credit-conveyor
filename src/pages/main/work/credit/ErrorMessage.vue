<template>
  <q-dialog v-model="errorBar" persistent>
    <q-card>
      <q-bar>
        <div>{{$t('common.message')}}</div>

        <q-space />

        <q-btn dense flat icon="close" @click="redirect">
          <q-tooltip>{{$t('actions.close')}}</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <p>{{ errorMessage }}</p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>{{$t('tables.work.credit.try_again')}}</p>
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
      this.$store.commit("toggleErrorBar", false);
      this.$router.push("/work/credit");
    }
  },
  computed: {
    errorBar() {
      return this.$store.getters.errorBar
    },
    errorMessage() {
      return message[this.$store.getters.error] || "Что-то пошло не так";
    }
  }
};
</script>
