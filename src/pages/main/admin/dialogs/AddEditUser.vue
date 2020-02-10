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
              v-model="details.username"
              :label="$t('auth.username')"
              @input="$v.details.password.$touch()"
              :rules="[
                val => $v.details.username.required || $t('auth.usernameError'),
                val => $v.details.username.minLength || $t('auth.usernameMinError')
              ]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.first_name"
              :label="$t('tables.users.first_name')"
              @input="$v.details.first_name.$touch()"
              :rules="[
                val =>
                  $v.details.first_name.required || $t('tables.users.firstnameError'),
                val =>
                  $v.details.first_name.minLength || $t('tables.users.firstnameMinError')
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.last_name"
              :label="$t('tables.users.last_name')"
              @input="$v.details.last_name.$touch()"
              :rules="[
                val => $v.details.last_name.required || $t('tables.users.lastnameError'),
                val =>
                  $v.details.last_name.minLength ||
                  $t('tables.users.lastnameMinError')
              ]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.middle_name"
              :label="$t('tables.users.middle_name')"
              @input="$v.details.middle_name.$touch()"
              :rules="[
                val =>
                  $v.details.middle_name.required || $t('tables.users.middlenameError'),
                val =>
                  $v.details.middle_name.minLength ||
                  $t('tables.users.middlenameMinError')
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.email"
              :label="$t('tables.users.email')"
              type="email"
              @input="$v.details.email.$touch()"
              :rules="[
                val => $v.details.email.required || $t('tables.users.emailError'),
                val => $v.details.email.email || $t('tables.users.emailFormError'),
              ]"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.password"
              :label="$t('tables.users.password')"
              :type="isPwd ? 'password' : 'text'"
              @input="$v.details.password.$touch()"
              :rules="[
                val => $v.details.password.required || $t('tables.users.passwordError'),
                val =>
                  $v.details.password.minLength || $t('tables.users.passwordMinError'),
              ]"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.phone"
              :label="$t('tables.users.phone')"
              mask="(+998) ##-###-##-##"
              fill-mask
              @input="$v.details.phone.$touch()"
              :rules="[]"
              lazy-rules
            />

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
              :label="$t('tables.users.status')"
              @input="$v.details.status.$touch()"
              :rules="[
                val => $v.details.status.required || $t('tables.users.statusError')
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-select
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.roles"
              multiple
              :options="rolesList"
              use-chips
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              :label="$t('tables.users.roles')"
              @input="$v.details.roles.$touch()"
              :rules="[]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.emp_id"
              :label="$t('tables.users.emp_id')"
              type="number"
              @input="$v.details.emp_id.$touch()"
              :rules="[
                val => $v.details.emp_id.required || $t('tables.users.empIdError')
              ]"
              lazy-rules
            />
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
      isPwd: true,
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: 0 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      rolesList: this.$store.getters["dicts/getRolesDict"],
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        user_id: null,
        username: null,
        first_name: null,
        last_name: null,
        middle_name: null,
        email: null,
        password: null,
        phone: null,
        status: null,
        roles: [],
        emp_id: null
      }
    };
  },
  validations: {
    details: {
      user_id: {},
      username: {
        required,
        minLength: minLength(3)
      },
      first_name: {
        required,
        minLength: minLength(3)
      },
      last_name: {
        required,
        minLength: minLength(3)
      },
      middle_name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required: requiredIf(val => {
          return val.user_id == null;
        }),
        minLength: minLength(3)
      },
      phone: {},
      status: {
        required
      },
      roles: {},
      emp_id: {
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

<style></style>
