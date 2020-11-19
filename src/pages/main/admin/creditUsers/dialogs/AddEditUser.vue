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
              <!-- <h6 class="title" v-if="details.fio">{{details.fio}}</h6> -->
              <q-input
                  
                  v-model="searchUser" 
                  @input = "selUsers"
                  outlined
                  placeholder="Поиск пользователя"  
                  :rules="[
                    val => $v.details.emp_name.required || 'Добавьте пользователя'
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
                  :key="user.emp_id"
                  @click="userCliked(user)"
                >
                  <span v-html="user.fio"></span>
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
                v-model="details.role_name"
                :label="$t('tables.users.roles')"
                disable
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <div class="creditBlock">
                <p class="labelCredit">{{$t('tables.users.roles')}}</p>
                <span class="valueCredit">{{ rolesU.join(", ") }}</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-select
                outlined
                v-model="details.mfos"
                multiple
                :options="filials"
                use-chips
                stack-label
                option-value="value"
                option-label="label"
                emit-value
                map-options
                label="MFO"
                @input="$v.details.mfos.$touch()"
                :rules="[
                  val => $v.details.mfos.required || 'Введите MFO'
                ]"
                lazy-rules
                options-selected-class="text-deep-orange"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <div :class="scope.opt.class">
                         <q-item-label v-html="scope.opt.label" />
                      </div>
                      <!-- <q-item-label caption>{{ scope.opt.description }}</q-item-label> -->
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            
          </div>
        
          <div class="row">
            <!-- <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Статус пользователя"
                disable
              />
            </div> -->
            
            <!-- <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                
                label="Должность"
                disable
              />
            </div> -->
            
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                v-model.number="details.amount_min"
                type="number"
                label="Минимальная сумма кредита"
                @input="$v.details.amount_min.$touch()"
                :rules="[
                  val => $v.details.amount_min.required || 'Введите минимальную сумму'
                ]"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-input
                outlined
                clearable
                color="purple-12"
                v-model.number="details.amount_max"
                type="number"
                label="Максимальная сумма кредита"
                @input="$v.details.amount_max.$touch()"
                :rules="[
                  val => $v.details.amount_max.required || 'Введите максимальную сумму'
                ]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-select
                outlined
                color="purple-12"
                v-model="details.special"
                :options="specialList"
                option-value="value"
                option-label="key"
                emit-value
                map-options
                label="Особый"
                @input="$v.details.special.$touch()"
                :rules="[
                  val => $v.details.special.required || 'Выберите тип'
                ]"
                lazy-rules
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

          <template v-if="details.role_name == 'CreditCommitteeMember'">
          <!-- <template v-if="rolesU.find(i => i == 'CM')"> -->
          <!-- <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-checkbox
                v-model="details.is_chairman"
                color="secondary"
                label="is_chairman"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
              <q-checkbox
                v-model="details.is_risk_manager"
                color="secondary"
                label="is_risk_manager"
              />
            </div>
          </div> -->
          <!-- </template> -->

          <!-- <template v-if="details.role_name == 'CreditCommitteeMember' || details.role_name == 'CreditSecretary'"> -->
          <!-- <template v-if="details.role_name == 'CreditCommitteeMember'"> -->
          <div class="row">
            
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">

              <q-select
                outlined
                v-model="details.groups"
                multiple
                :options="committeeGroups"
                use-chips
                stack-label
                option-value="id"
                option-label="name"
                emit-value
                map-options
                label="Группа кредитного комитета"
                
                lazy-rules
                options-selected-class="text-deep-orange"
              />
            </div>
            
          </div>
          </template>
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
      rolesU: ['CM', 'CC', 'CCC'],
      searchUser: null,
      resultUser: [],
      
      isPwd: true,
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: true },
        { key: "Passive", value: false }
      ],
       specialList: [
        { key: "Да", value: true },
        { key: "Нет", value: false }
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
        id: null,
        emp_id: null,
        emp_name: "",
        mfos: [],
        amount_min: "",
        amount_max: "",
        role_type: null,
        role_name: null,
        special: null,
        status: null,
        is_chairman: false,
        is_risk_manager: false,
        groups: []
      }
    };
  },
  validations: {
    details: {
      id: {},
      emp_id: {},
      emp_name: {
        required,
        minLength: minLength(3)
      },
      mfos: {
        required
      },
      amount_min: {
        required,
        minLength: minLength(3)
      },
      amount_max: {
        required,
        minLength: minLength(3)
      },
      roles: {},
      special: {
        required
      },
      status: {
        required
      },
      // is_chairman: {
      //   required
      // },
      // is_risk_manager: {
      //   required
      // },
      // groups: {
      //   required
      // }
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
    this.searchUser = this.details.emp_name
    try {
      this.$store.dispatch("creditsAdmin/getFilials")
    } catch(error) {}

    try {
      this.$store.dispatch("creditsAdmin/getCommitteeGroups")
    } catch(error) {}
  },
  computed: {
    filials() {
      // console.log(JSON.stringify(this.$store.getters["creditsAdmin/getFilials"], null, 2))
      return this.$store.getters["creditsAdmin/getFilials"]
    },

    committeeGroups() {
      return this.$store.getters["creditsAdmin/getCommitteeGroups"]
    }
  },
  watch: {
    // "details.mfos"(val) {
    //   console.log('mfos', val)
    //   // console.log('mfos', this.mfos)
    //     try {
    //       this.$store.dispatch("creditsAdmin/getCommitteeGroups", val[0])
    //     } catch(error) {}
      
    // },

    // "details.role_name"(val) {
    //   console.log('role_name', val)
    //   if (val == 'CreditCommitteeMember') {
    //     try {
    //       this.$store.dispatch("creditsAdmin/getCommitteeGroups")
    //     } catch(error) {}
    //   }
    // }
  },
  methods: {
    selUsers () {
      if(this.searchUser.length !== 0){           
          axios
              .get("/credit/commitee/search?name="+this.searchUser)
              .then(response => {                    
                  this.resultUser = response.data
              })
              .catch(error => {
                  console.log('error') 
              });
      }
    },
    userCliked(user) {
      console.log('user',user)
      this.details.emp_id = user.emp_id
      this.details.emp_name = user.fio
      this.details.role_name = user.role_name
      this.details.role_type = user.role_type
      if (user.mfo) {
        this.details.mfos = []
        this.details.mfos.push(user.mfo)
      } else {
        this.details.mfos = user.mfos
      }
      
      this.resultUser = []
      this.searchUser = user.fio

      // if(user.role_name.find("CCM")) {
      //   this.details.groups = null
      // }
   
    },
    clearUser () {
      this.resultUser = []
      this.searchUser = null
      this.details.emp_id = null
      this.details.emp_name = null
    },

    // filterFn (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options = this.filials.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.creditBlock {
    padding: 11px 9px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 16px;

    .labelCredit {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      line-height: 11px;
    }
  }

.title {
  margin: 0;
}

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

.parent {
  font-weight: 600;
}

.child {
  padding-left: 20px;
}

.q-item{
  min-height: 15px;
  padding: 6px 16px;
}
</style>
