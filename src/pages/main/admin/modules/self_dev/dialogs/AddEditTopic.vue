<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{ $t("tables.users.add_edit") }}</div>
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
              :label="$t('tables.education.topicName')"
              @input="$v.details.name.$touch()"
              :rules="[
                val => $v.details.name.required || $t('tables.education.topicNameError'),
                val => $v.details.name.minLength || $t('tables.education.topicNameError')
              ]"
              lazy-rules
            />
            <!-- <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="test_amount"
              :label="$t('test_amount')"
              @input="$v.test_amount.$touch()"
              :rules="[
                val => $v.test_amount.required || $t('test_amountError'),
                val => $v.test_amount.minLength || $t('test_amountError')
              ]"
              lazy-rules
            />-->
          </div>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          :disable="$v.details.$invalid"
          :label="$t('actions.save')"
          @click="submitForm"
        >
          <q-spinner color="white" size="1em" v-show="isLoading" />
        </q-btn>
        <q-btn color="primary" :label="$t('actions.close')" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import NotifyService from "../../../../../../services/notify.service";
import dialogMix from "../../../../../../shared/mixins/dialogMix";
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
      isPwd: true,
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: 0 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        name: null,
        timer: 1,
        status: 1,
        test_amount: 1
      },
      customData: null
    };
  },
  validations: {
    details: {
      name: {
        required,
        minLength: minLength(3)
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

<style></style>
