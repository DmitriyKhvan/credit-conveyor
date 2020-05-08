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
                  v-model="searchUser" 
                  @input = "selUsers"
                  outlined
                  placeholder="Поиск пользователя"  
                  :rules="[
                    val => $v.details.last_name.required || 'Добавьте пользователя'
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

              <div class="resultBlock q-ma-sm scroll bg-grey-2" v-if="resultUser.length !== 0 && searchUser.length !== 0">
                <div                   
                  v-for="user in resultUser"
                  :key="user.EMP_ID"
                  @click="userCliked(user)"
                >
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
                v-model="details.roles"
                :label="$t('tables.users.roles')"
                disable
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Должность"
                disable
              />
            </div>
            
            
            

            <!-- <q-input
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
            /> -->
          </div>
          <!-- <div class="row">
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
          </div> -->
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Статус пользователя"
                disable
              />
            </div>
            
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="МФО"

              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Минимальная сумма кердита"

              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Максимальная сумма кердита"

              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Особый"

              />
            </div>
            
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
          <div class="row">
            
            <!-- <q-input
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
            /> -->
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
import axios from "axios";
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
      searchUser: null,
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
      // details: {
      //   user_id: null,
      //   username: null,
      //   first_name: null,
      //   last_name: null,
      //   middle_name: null,
      //   email: null,
      //   password: null,
      //   phone: null,
      //   status: null,
      //   roles: [],
      //   emp_id: null
      // }

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
    
  },
  methods: {
    selUsers () {
      if(this.searchUser.length !== 0){           
          axios
              .get("/emps/search?name="+this.searchUser)
              .then(response => {                    
                  this.resultUser = response.data
              })
              .catch(error => {
                  console.log('error') 
              });
      }
    },
    userCliked(user) {
      console.log('user', user)
      this.details.emp_id = user.EMP_ID
      this.details.first_name = user.FIRST_NAME
      this.details.last_name = user.LAST_NAME
      this.details.middle_name = user.MIDDLE_NAME
      this.details.email = user.MAIL_ADDRESS.length > 3 ? user.MAIL_ADDRESS : null
      this.resultUser = []
      this.searchUser = user.LAST_NAME+' '+user.FIRST_NAME+' '+user.MIDDLE_NAME
   
    },
    clearUser () {
      this.resultUser = []
      this.searchUser = null
      this.details.emp_id = null
      this.details.first_name = null
      this.details.last_name = null
      this.details.middle_name = null
      this.details.email = null
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
  border-radius: 5px ;
  padding: 10px;
}
.resultBlock span {padding-right: 5px;}
.resultBlock div {
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
}
.resultBlock div:hover {
  background: #e0e0e0 ;
}
</style>
