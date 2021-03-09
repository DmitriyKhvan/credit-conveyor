<template>
  <q-dialog
    :content-class="'alertMessage'"
    persistent
    ref="alertMessage"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <p class="message">Вы действительно хотите удалить?</p>
      <!-- {{ data.tableName }}
        {{ data.idItem }} -->
      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn class="blueBtn add" label="Удалить" @click="onOKClick" />
        <q-btn class="redBtn add" label="Отмена" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import MessagePopup from "../Components/MessagePopup";

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

    async onOKClick() {
      try {
        const responce = await this.$store.dispatch(
          "creditSettings/removeItem",
          this.data
        );

        this.$q.dialog({
          component: MessagePopup,
          parent: this,
          data: {
            message: responce.message,
            // message: this.$t(`alertMessage.${responce.message}`),
            code: responce.code
          }
          // persistent: true
        });
      } catch (error) {
        this.$q.dialog({
          component: MessagePopup,
          parent: this,
          data: {
            message: error.message,
            code: error.code
          }
          // persistent: true
        });
      }

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
.alertMessage {
  .message {
    text-align: center;
    padding: 20px;
    font-size: 20px;
  }

  .q-dialog-plugin {
    padding: 0 20px 20px;
    width: 500px;
  }

  .q-dialog__inner--minimized > div {
    max-width: 500px;
  }

  // .redBtn.add, .blueBtn.add{
  // }

  // .redBtn.add {

  // }
}
</style>
