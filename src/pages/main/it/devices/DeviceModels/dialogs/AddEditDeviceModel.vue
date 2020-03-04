<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Add Edit Device Model</div>
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
              class="col-xs-12 col-sm-12 col-md-6"
              v-model="details.name"
              label="Device Model Name"
              :rules="[
                val =>
                  $v.details.name.required || 'Device Model Name is required'
              ]"
              lazy-rules
            ></q-input>
            <!-- select types of devices -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              label="Device Type"
              :value="deviceTypeName"
              @dblclick="selectDeviceType()"
              readonly="readonly"
              :rules="[
                val =>
                  $v.details.type_id.required || 'Type is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>Double Click</template>
            </q-input>
            <!--  -->
          </div>
          <div class="row">
            <!-- select mark of device -->
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              label="Device Mark"
              :value="deviceMarkName"
              @dblclick="selectDeviceMark()"
              readonly="readonly"
              :rules="[
                val =>
                  $v.details.mark_id.required || 'Mark is required'
              ]"
              lazy-rules
            >
              <template v-slot:hint>Double Click</template>
            </q-input>
            <!--  -->
          </div>

          <div class="row justify-between">
            <div class="text-h6">DETAILS</div>
          </div>

          <!-- Device Model Details -->
          <div class="row" v-for="(items, index) in details.details" :key="index">
            <div class="col-5">
              <q-input
                outlined
                class="col-xs-12 col-sm-12 col-md-6"
                label="Device Detail"
                :value="deviceDetailName[index]"
                @dblclick="selectDeviceDetail(index)"
                readonly="readonly"
              >
                <template v-slot:hint>Double Click</template>
              </q-input>
            </div>
            <div class="col-5">
              <q-input
                outlined
                clearable
                color="purple-12"
                class="col-xs-12 col-sm-12 col-md-6"
                v-model="details.details[index].value"
                label="Device Model Name"
              />
            </div>
            <div class="col-1">
              <div class="q-gutter-sm">
                <q-btn
                  icon="delete"
                  flat
                  color="red"
                  size="lg"
                  align="between"
                  @click="deleteDetailItem(index)"
                >
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <span>Delete</span>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn color="teal" @click="addDetailItem()">
          <q-icon left size="2em" name="add" />
          <div>Add</div>
        </q-btn>
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
import NotifyService from "./../../../../../../services/notify.service";
import dialogMix from "./../../../../../../shared/mixins/dialogMix";
import GridDialog from "./../../../../../../components/GridDialog";

import {
  required,
  requiredIf,
  minLength,
  between,
  email
} from "vuelidate/lib/validators";
import ApiService from "../../../../../../services/api.service";

export default {
  data() {
    return {
      isLoading: this.$store.getters["common/getLoading"],
      isValidated: true,
      deviceTypeName: null,
      deviceMarkName: null,
      deviceDetailName: [],
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        name: null,
        type_id: null,
        mark_id: null,
        details: []
      },
      deviceTypeDialogProps: {
        caption: "Device Types",
        tablePath: "devices/type",
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
      deviceDetailDialogProps: {
        caption: "Device Detail",
        tablePath: "devices/detail",
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
      name: {
        required
      },
      type_id: {
        required
      },
      mark_id: {
        required
      }
    }
  },
  components: {
    GridDialog
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
    initializeData() {
      if (!!this.data.selectedRow) {
        this.details = this.data.selectedRow[0];
        this.deviceTypeName = this.data.selectedRow[0].type_name;
        this.deviceMarkName = this.data.selectedRow[0].mark_name;
        this.data.selectedRow[0].details.forEach((element, index) => {
          this.deviceDetailName[index] = element.detail_name;
        });
      }
    },

    deleteDetailItem(index) {
      this.details.details.splice(index, 1);
    },
    addDetailItem() {
      let aDetail = {
        id: null,
        detail_id: null,
        value: null
      };
      this.details.details = this.details.details || [];
      this.details.details.push(aDetail);
    },

    selectDeviceType() {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.deviceTypeDialogProps
        })
        .onOk(res => {
          console.log(res);
          this.deviceTypeName = res[0].name_ru;
          this.details.type_id = res[0].id;
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
          console.log(res);
          this.deviceMarkName = res[0].name;
          this.details.mark_id = res[0].id;
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    selectDeviceDetail(index) {
      this.$q
        .dialog({
          component: GridDialog,
          parent: this,
          data: this.deviceDetailDialogProps
        })
        .onOk(res => {
          this.deviceDetailName[index] = res[0].name;
          this.details.details[index].detail_id = res[0].id;
          console.log(this.details.details);
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    }
  }
};
</script>

<style></style>
