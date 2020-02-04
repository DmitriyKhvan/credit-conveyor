<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>hey this is a section</q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    // ...your custom props
  },

  methods: {
    // NOTE don't change
    show() {
      this.$refs.dialog.show();
    },

    // NOTE don't change
    hide() {
      this.$refs.dialog.hide();
    },

    // NOTE don't change
    onDialogHide() {
      this.$emit("hide");
    },

    onOKClick() {
      this.$emit("ok", 2);

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

<style>
</style>
