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
            />
            <q-select
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              v-model="details.type_id"
              :options="typesList"
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Device Type"
              :rules="[
                val =>
                  $v.details.type_id.required || 'Type is required'
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-select
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              v-model="details.mark_id"
              :options="marksList"
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Device Mark"
              :rules="[
                val =>
                  $v.details.mark_id.required || 'Mark is required'
              ]"
              lazy-rules
            />
          </div>
          <div class="row justify-between">
            <div class="text-h6">DETAILS</div>
          </div>
          <!-- Device Models -->

          <div class="row" v-for="(items, index) in details.details" :key="index">
            <div class="col-5">
              <q-select
                outlined
                class="col-xs-12 col-sm-12 col-md-6"
                v-model="details.details[index].detail_id"
                label="Select Detail"
                :options="detailsList"
                stack-label
                option-value="value"
                option-label="text"
                emit-value
                map-options
              />
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
      typesList: [],
      marksList: [],
      detailsList: [],
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        name: null,
        type_id: null,
        mark_id: null,
        details: []
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
    Promise.all([
      this.deviceTypesListSelect(),
      this.deviceMarksListSelect(),
      this.deviceDetailsListSelect()
    ]).then(x => {
      this.typesList = x[0];
      this.marksList = x[1];
      this.detailsList = x[2];
    });
  },
  methods: {
    deviceTypesListSelect() {
      return new Promise((resolve, reject) => {
        ApiService.get("devices/type")
          .then(response => {
            resolve(
              response.data.map(elem => {
                return { text: elem.name[1], value: elem.id };
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    deviceMarksListSelect() {
      return new Promise((resolve, reject) => {
        ApiService.get("devices/mark")
          .then(response => {
            resolve(
              response.data.map(elem => {
                return { text: elem.name, value: elem.id };
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    deviceDetailsListSelect() {
      return new Promise((resolve, reject) => {
        ApiService.get("devices/detail")
          .then(response => {
            resolve(
              response.data.map(elem => {
                return { text: elem.name, value: elem.id };
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    deviceDetailsList() {
      return new Promise((resolve, reject) => {
        ApiService.get("devices/detail")
          .then(response => {
            resolve(
              response.data.map(elem => {
                return { text: elem.name, value: elem.id };
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
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
    }
  }
};
</script>

<style></style>
