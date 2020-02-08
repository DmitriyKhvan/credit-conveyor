<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Header</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-gutter-y-sm q-gutter-x-md column">
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name"
              label="Name"
            />
            <q-select
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.type"
              :options="iconTypeList"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Type"
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.class"
              label="Class"
            />
            <q-select
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.state"
              :options="stateList"
              option-value="value"
              option-label="key"
              emit-value
              map-options
              label="State"
            />
          </div>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" :disable="isLoading" label="Submit" @click="submitForm">
          <q-spinner color="white" size="1em" v-show="isLoading" />
        </q-btn>
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import NotifyService from "./../../../../services/notify.service";
import dialogMix from "./../../../../shared/mixins/dialogMix";

export default {
  data() {
    return {
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: "A" },
        { key: "Passive", value: "P" }
      ],
      iconTypeList: this.$store.getters["dicts/getIconTypes"],
      isValidated: true,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        icon_id: null,
        name: null,
        type: null,
        class: null,
        state: null
      }
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mixins: [dialogMix],
  created() {},
  methods: {}
};
</script>

<style>
</style>
