<template>
  <q-dialog ref="alertMessage" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <p class="message">Вы действительно хотите удалить?</p>
      <!-- {{ data.tableName }}
        {{ data.idItem }} -->
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="red" label="Удалить" @click="onOKClick" />
        <q-btn color="blue" label="Отмена" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.alertMessage.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.alertMessage.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      this.$store.dispatch("creditSettings/removeItem", this.data);

      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>

<style lang="scss">
.message {
  text-align: center;
  padding: 20px;
  font-size: 20px;
}
</style>
