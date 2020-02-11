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
              @input="$v.details.name.$touch()"
              :rules="[
                      val => $v.details.name.required || 'Name is required'
                      ]"
              lazy-rules
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
              @input="$v.details.state.$touch()"
              :rules="[
                      val => $v.details.state.required || 'State is required'
                      ]"
              lazy-rules
            />
          </div>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" :disable="$v.details.$invalid" label="Submit" @click="submitForm">
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
import {
  required,
  requiredIf,
  minLength,
  between,
  email
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: "A" },
        { key: "Passive", value: "P" }
      ],
      isValidated: true,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        name: null,
        state: null
      }
    };
  },
  validations: {
    details: {
      id: {},
      name: {
        required
      },
      state: {
        required
      }
    }
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
