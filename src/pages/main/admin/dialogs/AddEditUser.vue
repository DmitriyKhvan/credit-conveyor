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
              v-model="details.username"
              label="Username"
              @input="$v.details.password.$touch()"
              :rules="[
                      val => $v.details.username.required || 'Username is required',
                      val => $v.details.username.minLength || 'Length should be at least 3 chars'
                      ]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.first_name"
              label="First Name"
              @input="$v.details.first_name.$touch()"
              :rules="[
                      val => $v.details.first_name.required || 'First Name is required',
                      val => $v.details.first_name.minLength || 'Length should be at least 3 chars'
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
              label="Last Name"
              @input="$v.details.last_name.$touch()"
              :rules="[
                      val => $v.details.last_name.required || 'Last name is required',
                      val => $v.details.last_name.minLength || 'Length should be at least 3 chars'
                      ]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.middle_name"
              label="Middle Name"
              @input="$v.details.middle_name.$touch()"
              :rules="[
                      val => $v.details.middle_name.required || 'Middle name is required',
                      val => $v.details.middle_name.minLength || 'Length should be at least 3 chars'
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
              label="Email"
              type="email"
              @input="$v.details.email.$touch()"
              :rules="[
                      val => $v.details.email.required || 'Email is required',
                      val => $v.details.email.email || 'Email is incorrect'
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
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              @input="$v.details.password.$touch()"
              :rules="[
                      val => $v.details.password.required || 'Password is required',
                      val => $v.details.password.minLength || 'Length should be at least 3 chars'
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
              label="Phone"
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
              label="State"
              @input="$v.details.status.$touch()"
              :rules="[
                      val => $v.details.status.required || 'Status is required'
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
              label="Roles"
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
              label="Employee Id"
              type="number"
              @input="$v.details.emp_id.$touch()"
              :rules="[
                      val => $v.details.emp_id.required || 'Employee Id is required'
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
  created() {
    console.log(this.data.props.addEdit);
  },
  methods: {}
};
</script>

<style>
</style>
