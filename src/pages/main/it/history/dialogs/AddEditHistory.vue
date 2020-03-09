<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Add Edit History</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-gutter-y-sm q-gutter-x-md column">
          <div class="row">
            <!-- select device -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-12"
              label="Device"
              :value="deviceName"
              @dblclick="selectDevice()"
              readonly="readonly"
              :rules="[
                val =>
                  $v.details.dev_id.required || 'Device is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>Double Click</template>
            </q-input>
            <!--  -->
            <!-- select  -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-12"
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
          </div>
          <div class="row">
            <q-select
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-12 col-md-6"
              v-model="details.status"
              :options="stateList"
              option-value="value"
              option-label="key"
              emit-value
              map-options
              label="Status"
              @input="$v.details.status.$touch()"
              :rules="[
                val => $v.details.status.required || 'Status is required'
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
import NotifyService from "./../../../../../services/notify.service";
import dialogMix from "./../../../../../shared/mixins/dialogMix";
import ApiService from "./../../../../../services/api.service";
import GridDialog from "./../../../../../components/GridDialog";
import SelectUser from "./SelectUser";

import {
  required,
  requiredIf,
  minLength,
  between,
  email
} from "vuelidate/lib/validators";
import CommonUtils from "../../../../../shared/utils/CommonUtils";
export default {
  data() {
    return {
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      deviceName: null,
      userName: null,
      userInfo: null,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        dev_id: null,
        emp_id: null,
        status: null
      },
      deviceDialogProps: {
        caption: "Device List",
        tablePath: "devices/list",
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
        filterColumn: [
          {
            column: "is_assigned",
            value: "0",
            operator: "=="
          }
        ]
      }
    };
  },
  validations: {
    details: {
      id: {},
      dev_id: {
        required
      },
      emp_id: {
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
  created() {},
  methods: {
    async initializeData() {
      if (!!this.data.selectedRow) {
        this.details = this.data.selectedRow[0];
        this.deviceName = this.data.selectedRow[0].type_name;
        this.userName = this.data.selectedRow[0].name;
        this.userInfo = await this.getUserInfoById(
          this.data.selectedRow[0].emp_id
        );
      }
    },
    selectDevice() {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.deviceDialogProps
        })
        .onOk(res => {
          this.deviceName = res[0].type_name;
          this.details.dev_id = res[0].id;
        })
        .onCancel(() => {
          console.log("Cancel");
        });
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
    }
  }
};
</script>

<style></style>
