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
            <!-- select user -->
            <q-input
              outlined
              dense
              class="col-xs-12 col-sm-12 col-md-6"
              label="User"
              :value="userName"
              @dblclick="selectUser()"
              readonly="readonly"
              :rules="[
                val =>
                  $v.details.emp_id.required || 'User is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>Double Click</template>
            </q-input>
            <!--  -->
            <!-- select user -->
            <q-input
              outlined
              dense
              class="col-xs-12 col-sm-12 col-md-6"
              label="Menu"
              :value="menuName"
              @dblclick="selectMenu()"
              readonly="readonly"
              :rules="[
                val =>
                  $v.details.emp_id.required || 'Menu is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>Double Click</template>
            </q-input>
            <!--  -->
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
import NotifyService from "@/services/notify.service";
import dialogMix from "@/shared/mixins/dialogMix";
import ApiService from "@/services/api.service";
import CommonUtils from "@/shared/utils/CommonUtils";
import GridDialog from "@/components/GridDialog";

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
      userName: null,
      menuName: null,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        menu_id: null,
        role_id: null,
        branch_code: null,
        filial_code: null
      },
      selectUserProps: {
        caption: "Users",
        tablePath: "auth/users",
        rowId: "user_id", //
        defaultSort: [],
        excludedColumns: [
          "user_id",
          "username",
          "roles",
          "status",
          "created_by",
          "creation_date",
          "updated_by",
          "update_date",
          "emp_id",
          "first_name",
          "last_name",
          "middle_name",
          "role_names"
        ],
        excludeSortingColoumns: [],
        selectMode: "single",
        paginationConfig: {
          sortBy: "name",
          descending: false,
          page: 1,
          rowsPerPage: 5
          //rowsNumber: 4 // if getting data from a server
        },
        filterColumn: []
      },
      selectMenuProps: {
        caption: this.$t("tables.menus._self"),
        tablePath: "menus/user",
        rowId: "menu_id", //
        defaultSort: [],
        excludedColumns: [
          "name",
          "status",
          "created_by",
          "creation_date",
          "updated_by",
          "update_date"
        ],
        excludeSortingColoumns: [],
        selectMode: "single",
        paginationConfig: {
          sortBy: "url",
          descending: false,
          page: 1,
          rowsPerPage: 5
          //rowsNumber: 4 // if getting data from a server
        },
        filterColumn: []
      }
    };
  },
  validations: {
    details: {
      id: {},
      role_id: { required },
      menu_id: {
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
              // adding extra All option to filials
              this.deviceFilials = [
                { text: "All", value: "0" },
                ...this.deviceFilials
              ];
            }
          });
        }
        // --adding extra All option to branches
        this.deviceBranches = [
          { text: "All", value: "0" },
          ...this.deviceBranches
        ];
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {},
  methods: {
    initializeData() {
      if (!!this.data.selectedRow) {
        this.details = this.data.selectedRow[0];
        let emp_id = this.data.selectedRow[0].emp_id;
        this.userName = this.data.selectedRow[0].name;
        let menu_id = this.data.selectedRow[0].menu_id;
        this.menuName = this.data.selectedRow[0].menu_name; //select menu name
      }
    },
    selectBranch() {
      return ApiService.get("structure/branches");
    },
    selected(parentCode) {
      this.details.filial_code = null;
      this.deviceFilials = [];
      this.branchList.forEach(element => {
        if (element.CODE == parentCode) {
          this.deviceFilials = element.children.map(val => {
            return {
              text: val.DEPARTMENT_NAME1,
              value: val.CODE
            };
          });
          this.deviceFilials = [
            { text: "All", value: "0" },
            ...this.deviceFilials
          ];
        }
      });
    },
    selectUser() {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.selectUserProps
        })
        .onOk(res => {
          this.userName = res[0].name;
          this.details.emp_id = res[0].emp_id;
          this.selectMenuProps.tablePath = `menus/user?id=${res[0].emp_id}`;
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    selectMenu() {
      if (!!this.details.emp_id) {
        console.log(this.selectMenuProps);
        this.$q
          .dialog({
            component: GridDialog,
            parent: this,
            data: this.selectMenuProps
          })
          .onOk(res => {
            console.log(res[0]);
            this.menuName = res[0].name[1]; // menu by lang#
            this.details.menu_id = res[0].menu_id;
          })
          .onCancel(() => {
            console.log("Cancel");
          });
      } else {
        this.$q
          .dialog({
            dark: true,
            title: "Alert",
            message: "Choose the User first !!!"
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    }
  }
};
</script>

<style></style>
