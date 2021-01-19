<template>
  <q-dialog ref="alertMessage" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-btn flat round icon="close" class="closeBtn" @click="onOKClick" />
      <div class="message">
        <q-icon 
          v-if="data.code == 1" 
          name="check_circle" 
          class="text-green" 
          style="font-size: 4rem;"
        />
        <q-icon 
          v-else-if="data.code == 0" 
          name="error" 
          class="text-red" 
          style="font-size: 4rem;"
        />
        <q-icon 
          v-else 
          name="warning"  
          class="text-orange" 
          style="font-size: 4rem;"
        />
        <p>{{data.message}}</p>
      </div>
      <!-- <q-card-actions align="right">
        <q-btn color="red" label="Удалить" @click="onOKClick" />
        <q-btn color="blue" label="Отмена" @click="onCancelClick" />
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script>


export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          message: "",
          code: 99,
        };
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

.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  color: #A0A5BA
}
</style>
