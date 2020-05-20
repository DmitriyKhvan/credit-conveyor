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
                    val => $v.details.fio.required || 'Добавьте пользователя'
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
                label="Минимальная сумма кердита"
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
                label="Максимальная сумма кердита"
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
          <div class="row">
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
      isLoading: this.filials,
      stateList: [
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
       specialList: [
        { key: "Да", value: 1 },
        { key: "Нет", value: 0 }
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
        fio: "",
        mfos: [],
        amount_min: "",
        amount_max: "",
        role_type: null,
        role_name: null,
        special: null,
        status: null
      }
    };
  },
  validations: {
    details: {
      id: {},
      emp_id: {},
      fio: {
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
    try {
      this.$store.dispatch("creditsAdmin/getFilials")
    } catch(error) {}
  },
  computed: {
    filials() {
      // console.log(JSON.stringify(this.$store.getters["creditsAdmin/getFilials"], null, 2))
      return this.$store.getters["creditsAdmin/getFilials"]
    }
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
      this.details.emp_id = user.emp_id
      this.details.fio = user.fio
      this.details.role_name = user.role_name
      this.details.role_type = user.role_type
      if (user.mfo) {
        this.details.mfos.push(user.mfo)
      } else {
        this.details.mfos = user.mfos
      }
      
      this.resultUser = []
      this.searchUser = user.fio
   
    },
    clearUser () {
      this.resultUser = []
      this.searchUser = null
      this.details.emp_id = null
      this.details.fio = null
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

<style scoped>
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
