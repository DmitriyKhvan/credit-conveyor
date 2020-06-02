<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{$t('tables.device_details._self')}}</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-gutter-y-sm q-gutter-x-md column">
          <div class="row">
            <q-select
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.type_id"
              :options="typesList"
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              :label="$t('tables.device_types.type_id')"
              @input="$v.details.type_id.$touch()"
              :rules="[
                val =>
                  $v.details.type_id.required || 'Type is required'
              ]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name"
              :label="$t('tables.device_details.deviceCharacteresticsName')"
              @input="$v.details.name.$touch()"
              :rules="[
                val =>
                  $v.details.name.required || 'Name is required'
              ]"
              lazy-rules
            />
          </div>
        </div>

        <div class="row" v-for="(item, index) in details.values" :key="index">
          <div class="col-8">
            <q-input
              outlined
              class="col-xs-12 col-sm-12 col-md-6"
              label="Value"
              v-model="item.value"
            >
              <template v-slot:hint>{{$t('common.double_click')}}</template>
            </q-input>
          </div>
          <div class="col-1">
            <div class="q-gutter-sm">
              <q-btn
                icon="delete"
                flat
                color="red"
                size="lg"
                align="between"
                @click="deleteDetailValue(index)"
              >
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <span>{{$t('actions.delete')}}</span>
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn color="teal" @click="addDetailValue()">
          <q-icon left size="2em" name="add" />
          <div>{{$t('actions.add')}}</div>
        </q-btn>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          :disable="$v.details.$invalid"
          :label="$t('actions.submit')"
          @click="submitForm"
        >
          <q-spinner color="white" size="1em" v-show="isLoading" />
        </q-btn>
        <q-btn color="primary" :label="$t('actions.cancel')" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import NotifyService from "@/services/notify.service";
import dialogMix from "@/shared/mixins/dialogMix";
import {
  required,
  requiredIf,
  minLength,
  between,
  email
} from "vuelidate/lib/validators";
import ApiService from "@/services/api.service";
export default {
  data() {
    return {
      isLoading: this.$store.getters["common/getLoading"],
      isValidated: true,
      typesList: [],
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        name: null,
        type_id: null,
        values: []
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
      values: {}
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
    Promise.all([this.deviceDetailsList()]).then(x => {
      this.typesList = x[0];
    });
  },
  methods: {
    deviceDetailsList() {
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
    addDetailValue() {
      let aValue = {
        id: null,
        value: null
      };
      this.details.values = this.details.values || [];
      this.details.values.push(aValue);
    },
    deleteDetailValue(index) {
      this.details.values.splice(index, 1);
    }
  },
  computed: {
    getDetailId() {
      return this.details.type_id;
    }
  }
};
</script>

<style></style>
