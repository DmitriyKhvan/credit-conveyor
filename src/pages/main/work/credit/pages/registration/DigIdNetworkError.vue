<template>
  <div>
    <q-dialog v-model="icon" @input="closeIcon"  persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Сообщение</div>
          <q-space />
          <q-btn @click="closeIcon(false)" icon="close" flat round dense />
        </q-card-section>

        <q-card-section>
          {{ iconMessage }}
        </q-card-section>

        <div class="loader" v-if="loader">
          <q-spinner-facebook />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    icon() {
      return this.$store.state.credits.icon;
    },
    loader() {
      return this.$store.state.credits.loader;
    },
    iconMessage() {
      return this.$store.state.credits.iconMessage;
    }
  },
  methods: {
    closeIcon(val) {
      const data = {
        flag: val,
        loader: false,
        message: ""
      }
      this.$store.commit("credits/errorLoadData", data);
    }
  }
}
</script>

<style scoped>
.loader {
  text-align: center;
  font-size: 40px;
}
</style>