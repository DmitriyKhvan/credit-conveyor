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
            <!-- select  -->
            <q-input
              dense
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              label="User"
              :value="userName"
              @dblclick="selectUser()"
              readonly="readonly"
              @input="onSelectUser"
              :rules="[
                val =>
                  $v.details.emp_id.required || 'User is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>Double Click</template>
            </q-input>
            <!--  -->
            <q-select
              dense
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.role_id"
              :options="rolesModList"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Role"
              :rules="[]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-select
              dense
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.branch_code"
              :options="deviceBranches"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Branches"
              @input="selected"
              :rules="[]"
              lazy-rules
            />
            <q-select
              dense
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.filial_code"
              :options="deviceFilials"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Filials"
              :rules="[]"
              lazy-rules
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
import NotifyService from "./../../../../../services/notify.service";
import dialogMix from "./../../../../../shared/mixins/dialogMix";
import ApiService from "./../../../../../services/api.service";
import CommonUtils from "../../../../../shared/utils/CommonUtils";
import SelectUser from "./../../../../dialogs/SelectUser";

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
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      deviceBranches: [],
      deviceFilials: [],
      branchList: [],
      userInfo: null,
      userName: null,
      rolesModList: [],
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        emp_id: null,
        role_id: null,
        branch_code: null,
        filial_code: null
      }
    };
  },
  validations: {
    details: {
      id: {},
      role_id: { required },
      emp_id: {
        required
      },
      branch_code: {
        required
      },
      filial_code: {
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
    Promise.all([this.selectBranch()])
      .then(x => {
        // --
        this.deviceBranches = x[0].data[0].children.map(val => {
          return {
            text: val.DEPARTMENT_NAME1,
            value: val.CODE
          };
        });
        this.branchList = x[0].data[0].children;
        if (this.details.branch_code) {
          // when edit case initializes deviceFilials array
          this.branchList.forEach(element => {
            if (element.CODE == this.details.branch_code) {
              this.deviceFilials = element.children.map(val => {
                return {
                  text: val.DEPARTMENT_NAME1,
                  value: val.CODE
                };
              });
            }
          });
        }
        // --
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {},
  methods: {
    selectBranch() {
      return ApiService.get("structure/branches");
    },
    selected(parentCode) {
      this.details.filial_code = null;
      this.branchList.forEach(element => {
        if (element.CODE == parentCode) {
          this.deviceFilials = element.children.map(val => {
            return {
              text: val.DEPARTMENT_NAME1,
              value: val.CODE
            };
          });
        }
      });
    },
    async onSelectUser(emp_id) {
      let temp = (await this.getRoleModsList(emp_id)).data.value;
      // rolemodelist
      temp = temp.filter(role => {
        return role.mod_available == 0;
      });
      this.rolesModList = temp.map(val => {
        return {
          text: val.name,
          value: val.role_id
        };
      });
      console.log(this.rolesModList);
    },
    selectUser() {
      let tempData = null;
      if (!!this.data.selectedRow) {
        tempData = this.userInfo.data;
      }
      this.$q
        .dialog({
          component: SelectUser,
          parent: this,
          data: tempData
        })
        .onOk(res => {
          console.log(res);
          this.userName = CommonUtils.domDecoder(
            res.LAST_NAME + " " + res.FIRST_NAME + " " + res.MIDDLE_NAME
          );
          this.details.emp_id = res.EMP_ID;
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    getUserInfoById(id) {
      return ApiService.get(`emps/info?id=${id}`);
    },
    getRoleModsList(emp_id) {
      //let emp_id = this.$store.getters[]
      return ApiService.get(`roles/user?id=${emp_id}`);
    }
  }
};
</script>

<style></style>
