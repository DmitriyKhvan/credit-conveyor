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
          <div class="row"></div>
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
import GridDialog from "./../../../../../components/GridDialog";
import ApiService from "./../../../../../services/api.service";

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
      isValidated: true,
      deviceName: null,
      userName: null,
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
            value: 0,
            operator: "=="
          }
        ]
      }
    };
  },
  validations: {
    details: {
      id: {},
      name: {
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
    }
  }
};
</script>

<style></style>
