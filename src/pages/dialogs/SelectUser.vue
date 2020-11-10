<template>
  <q-dialog  ref="dialog" @hide="onDialogHide" persistent full-width>
    <q-card class="q-dialog-plugin full-width" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Выберите пользователя</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section>
        <div class="column no-wrap">
          <div class="column">
            <structure-bank v-bind:view="'dialog'" @selectUser="selectUser"  />
          </div>
          <!-- <div class="full-width">
            <div class="col row">
              <user-card v-bind:itemData="item" />
            </div>
          </div> -->
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Ok" :disable="!isSelected" @click="onOkClick">
          <!-- <q-spinner color="white" size="1em" v-show="true" /> -->
        </q-btn>
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import StructureBank from "./../../components/StructureBank";
import UserCard from "./../../components/UserCard";
import dialogMix from "./../../shared/mixins/dialogMix";

export default {
  name: "SelectUser",
  components: {
    StructureBank,
    UserCard
  },
  mixins: [],
  data() {
    return {
      emittedItem: null
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.emittedItem = this.data;
  },
  computed: {
    item() {
      return this.emittedItem;
    },
    isSelected() {
      return this.emittedItem !== null;
    }
  },
  methods: {
    selectUser(item) {
      this.emittedItem = item;
    },
    onOkClick() {
      this.$emit("ok", this.emittedItem);
      this.hide();
    },

    onCancelClick() {
      this.$q
        .dialog({
          title: "Подтверждать",
          message: this.$t("messages.confirm_exit"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.hide();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    // !!! Don't change
    show() {
      this.$refs.dialog.show();
    },

    // !!! Don't change
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    }
  }
};
</script>

<style>
</style>
