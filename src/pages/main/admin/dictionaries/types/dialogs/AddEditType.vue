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
              class="col-xs-12 col-sm-12 col-md-12"
              v-model="details.name"
              label="Name"
              @input="$v.details.name.$touch()"
              :rules="[
                      val => $v.details.name.required || 'Name is required'
                      ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              filled
              autogrow
              color="purple-12"
              class="col-xs-12 col-sm-12 col-md-12"
              v-model="details.description"
              label="Description"
              type="text"
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
import dialogMix from "@/shared/mixins/dialogMix";
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
      isValidated: true,
      // !!! Dont change. Functions in dialogMixin depends on variable "details"
      details: {
        id: null,
        name: null,
        description: null
      }
    };
  },
  validations: {
    details: {
      id: {},
      name: {
        required
      },
      description: {}
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
