<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{ $t("tables.devices.add_edit_devices") }}</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-gutter-y-sm q-gutter-x-md column">
          <div class="row">
            <!-- select types of devices -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              :label="$t('tables.device_models.device_type')"
              :value="deviceTypeName"
              @dblclick="selectDeviceType()"
              readonly="readonly"
              :rules="[
                val => $v.details.type_id.required || 'Type is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>{{ $t("common.double_click") }}</template>
            </q-input>
            <!--  -->
            <!-- select mark of device -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              :label="$t('tables.device_models.device_mark')"
              :value="deviceMarkName"
              @dblclick="selectDeviceMark()"
              readonly="readonly"
              :rules="[
                val => $v.details.mark_id.required || 'Mark is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>{{ $t("common.double_click") }}</template>
            </q-input>
            <!--  -->
          </div>
          <div class="row">
            <!-- model ID -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              :label="$t('tables.device_models.device_mark')"
              :value="deviceModelName"
              @dblclick="selectDeviceModel()"
              readonly="readonly"
              :rules="[
                val => $v.details.model_id.required || 'Model is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>{{ $t("common.double_click") }}</template>
            </q-input>
            <!--  -->
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-12 col-md-6"
              v-model="details.serial"
              :label="$t('tables.devices.device_serial_number')"
              :rules="[
                val => $v.details.serial.required || 'Serial is required'
              ]"
              lazy-rules
            ></q-input>
          </div>
          <div class="row">
            <!-- TODO -->
            <q-select
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.branch_id"
              :options="deviceBranches"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              :label="$t('tables.devices.branch')"
              :disable="isBranchIdRestricted"
              @input="selected"
              :rules="[
                val => $v.details.branch_id.required || 'Branch is required'
              ]"
              lazy-rules
            />
            <q-select
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.filial_id"
              :options="deviceFilials"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              :disable="isFilialIdResticted"
              :label="$t('tables.devices.filial')"
              :rules="[
                val => $v.details.filial_id.required || 'Filial is required'
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              v-model="details.description"
              outlined
              class="col-xs-12 col-sm-12 col-md-12"
              :label="$t('tables.devices.description')"
              filled
              type="textarea"
              rows="3"
            />
          </div>
          <div class="row">
            <q-input
              v-model="details.inventar"
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              :label="$t('tables.devices.inventory')"
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
              :label="$t('tables.devices.status')"
              @input="$v.details.status.$touch()"
              :rules="[
                val => $v.details.status.required || 'Status is required'
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              :label="$t('tables.devices.made_date')"
              v-model="details.made_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="madeDate"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="details.made_date"
                      @input="() => $refs.madeDate.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              :label="$t('tables.devices.bought_date')"
              v-model="details.bought_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="boughtDate"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="details.bought_date"
                      @input="() => $refs.boughtDate.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          :disable="$v.details.$invalid"
          label="Submit"
          @click="submitForm"
        >
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
import GridDialog from "@/components/GridDialog";
import ApiService from "@/services/api.service";
import { mapGetters } from "vuex";

import {
  required,
  requiredIf,
  minLength,
  between,
  email,
  numeric
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Активный", value: 1 },
        { key: "Пассивный", value: 0 }
      ],
      isValidated: true,
      deviceTypeName: null,
      deviceMarkName: null,
      deviceModelName: null,
      deviceBranches: [],
      deviceFilials: [],
      branchList: [],
      isBranchIdRestricted: false,
      isFilialIdResticted: false,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        type_id: null,
        mark_id: null,
        model_id: null,
        serial: null,
        branch_id: null,
        filial_id: null,
        status: null,
        description: null,
        inventar: null,
        made_date: null,
        bought_date: null
      },
      deviceTypeDialogProps: {
        caption: "Device Types",
        tablePath: "devices/type",
        rowId: "id", //
        defaultSort: [],
        excludedColumns: [],
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
      deviceMarkDialogProps: {
        caption: "Device Marks",
        tablePath: "devices/mark",
        rowId: "id", //
        defaultSort: [], // TODO
        excludedColumns: [],
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
      deviceModelDialogProps: {
        caption: "Device Models",
        tablePath: "devices/model",
        rowId: "id", //
        defaultSort: [], // TODO
        excludedColumns: [],
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
      deviceBranchDialogProps: {
        caption: "Branches",
        tablePath: "devices/model",
        rowId: "id", //
        defaultSort: [], // TODO
        excludedColumns: [],
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
      deviceFilialDialogProps: {
        caption: "Filials",
        tablePath: "devices/model",
        rowId: "id", //
        defaultSort: [], // TODO
        excludedColumns: [],
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
      }
    };
  },
  validations: {
    details: {
      id: {},
      type_id: {
        required
      },
      mark_id: {
        required
      }, // '/home' formatda
      model_id: {
        required
      },
      serial: {
        required
      },
      branch_id: {
        required
      },
      filial_id: {
        required
      },
      status: {
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
    if (!!this.branchCode) {
      Promise.all([this.selectBranch()])
        .then(x => {
          // all access
          if (this.branchCode == 0) {
            this.deviceBranches = x[0].data[0].children.map(val => {
              return {
                text: val.DEPARTMENT_NAME1,
                value: val.CODE
              };
            });
          } // access to specific branch
          else {
            if (this.isEdit) {
              this.isBranchIdRestricted = true; // disable branch field to edit
              if (this.filialCode != null) {
                this.isFilialIdResticted = true;
              }
            }

            this.deviceBranches = x[0].data[0].children
              .filter(val => this.branchCode == val.CODE)
              .map(val => {
                return {
                  text: val.DEPARTMENT_NAME1,
                  value: val.CODE
                };
              });
          }

          this.branchList = x[0].data[0].children;

          if (!!this.details.branch_id) {
            // when edit case initializes deviceFilials array
            this.branchList.forEach(element => {
              if (element.CODE == this.details.branch_id) {
                this.deviceFilials = element.children.map(val => {
                  return {
                    text: val.DEPARTMENT_NAME1,
                    value: val.CODE
                  };
                });
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters({
      branchCode: "auth/branchCode",
      filialCode: "auth/filialCode"
    })
  },
  methods: {
    initializeData() {
      if (!!this.data.selectedRow) {
        this.details = this.data.selectedRow[0];
        this.deviceTypeName = this.data.selectedRow[0].type_name;
        this.deviceMarkName = this.data.selectedRow[0].mark_name;
        this.deviceModelName = this.data.selectedRow[0].model_name;
      }
    },
    selectDeviceType() {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.deviceTypeDialogProps
        })
        .onOk(res => {
          this.deviceTypeName = res[0].name_ru;
          this.details.type_id = res[0].id;
          this.deviceModelDialogProps.filterColumn.splice(0, 1, {
            column: "type_id",
            value: res[0].id,
            operator: "=="
          });
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    selectDeviceMark() {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.deviceMarkDialogProps
        })
        .onOk(res => {
          this.deviceMarkName = res[0].name;
          this.details.mark_id = res[0].id;
          this.deviceModelDialogProps.filterColumn.splice(1, 1, {
            column: "mark_id",
            value: res[0].id,
            operator: "=="
          });
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    selectDeviceModel() {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.deviceModelDialogProps
        })
        .onOk(res => {
          this.deviceModelName = res[0].name;
          this.details.model_id = res[0].id;
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    selectBranch() {
      return ApiService.get("structure/branches");
    },

    selected(parentCode) {
      this.details.filial_id = null;
      // if selected branch
      this.branchList.forEach(element => {
        if (element.CODE == parentCode) {
          if (!!this.filialCode) {
            // if filial restriction is set, filter that filial only
            this.deviceFilials = element.children
              .filter(val => val.CODE == this.filialCode)
              .map(val => {
                return {
                  text: val.DEPARTMENT_NAME1,
                  value: val.CODE
                };
              });
          }
          // ifnot take all filial list
          else {
            this.deviceFilials = element.children.map(val => {
              return {
                text: val.DEPARTMENT_NAME1,
                value: val.CODE
              };
            });
          }
        }
      });
    }
  }
};
</script>

<style></style>
