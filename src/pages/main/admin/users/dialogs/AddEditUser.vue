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
        <div>
          <div class="row">
            <div class="col-md-12 searchBlock q-pa-sm">
              <q-input
                v-model="details.name"
                @input="selUsers"
                outlined
                placeholder="Поиск пользователя"
                :rules="[
                    val => $v.details.name.required || 'Добавьте пользователя'
                  ]"
                lazy-rules
              >
                <template v-slot:append>
                  <q-btn @click="clearUser" flat>
                    <q-icon name="clear" />
                  </q-btn>
                  <q-icon name="search" />
                </template>
              </q-input>

              <div
                class="resultBlock q-ma-sm scroll bg-grey-2"
                v-if="resultUser.length !== 0 && details.name.length !== 0"
              >
                <div v-for="user in resultUser" :key="user.EMP_ID" @click="userCliked(user)">
                  <span v-html="user.LAST_NAME"></span>
                  <span v-html="user.FIRST_NAME"></span>
                  <span v-html="user.MIDDLE_NAME"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                v-model="details.username"
                :label="$t('auth.username')"
                @input="$v.details.password.$touch()"
                :rules="[
                  val => $v.details.username.required || $t('auth.usernameError'),
                  val => $v.details.username.minLength || $t('auth.usernameMinError')
                ]"
                lazy-rules
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-select
                outlined
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
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
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
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
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
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-select
                outlined
                color="purple-12"
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
import NotifyService from "@/services/notify.service";
import dialogMix from "@/shared/mixins/dialogMix";
import ApiService from "@/services/api.service";
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
      resultUser: [],
      isPwd: true,
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      rolesList: this.$store.getters["dicts/getRolesDict"],
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        user_id: null,
        username: null,
        name: "",
        email: null,
        password: null,
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
      name: {
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
  methods: {
    selUsers() {
      if (this.details.name.length > 3) {
        ApiService.get("/emps/search?name=" + this.details.name)
          .then(response => {
            console.log(response.data);

            this.resultUser = response.data;
          })
          .catch(error => {
            console.log("error");
          });
      }
    },
    userCliked(user) {
      this.details.emp_id = user.EMP_ID;
      this.details.name =
        user.FIRST_NAME + " " + user.LAST_NAME + " " + user.MIDDLE_NAME;
      this.details.email =
        user.MAIL_ADDRESS.length > 3 ? user.MAIL_ADDRESS : null;
      this.resultUser = [];
    },
    clearUser() {
      this.resultUser = [];
      this.details.emp_id = null;
      this.details.email = null;
      this.details.name = null;
    }
  }
};
</script>

<style scoped>
.searchBlock {
  position: relative;
}
.resultBlock {
  position: absolute;
  top: 50px;
  left: 0;
  width: 80%;
  max-height: 300px;
  z-index: 10000;
  border-radius: 5px;
  padding: 10px;
}
.resultBlock span {
  padding-right: 5px;
}
.resultBlock div {
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
}
.resultBlock div:hover {
  background: #e0e0e0;
}
</style>
