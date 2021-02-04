<template>
  <q-dialog
    :content-class="'alertMessage'"
    persistent
    ref="alertMessage"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <p class="message">Вы действительно хотите удалить {{ data.itemName }}?</p>
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
import MessagePopup from "./MessagePopup";

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
        this.data.item.splice(this.data.idx, 1);
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

  .blueBtn .q-btn__content,
  .redBtn .q-btn__content {
    width: 173px;
    height: 47px;
    font-size: 14px;
    color: #fff;
  }

  .blueBtn {
    background: #4ab8ff;
  }

  .redBtn {
    background: #ff4a4a;
    margin-left: 24px !important;
  }

  // .redBtn.add, .blueBtn.add{
  // }

  // .redBtn.add {

  // }
}
</style>
