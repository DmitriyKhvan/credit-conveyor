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
              v-model="details.authority"
              label="Authority"
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name[0]"
              label="Name Uz"
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name[1]"
              label="Name Ru"
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name[2]"
              label="Name En"
            />
          </div>

          <div class="row">
            <q-select
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.status"
              :options="stateList"
              option-value="value"
              option-label="key"
              emit-value
              map-options
              label="Status"
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
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        role_id: null,
        authority: null,
        name: [],
        status: null
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
  created() {
    console.log(this.data.props.addEdit);
  },
  methods: {}
};
</script>

<style>
</style>
