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
            <q-select
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.parent_id"
              :options="parentMenusList"
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              @input="setPreUrl"
              label="Parent Menu"
              :rules="[]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name[0]"
              label="Name Uz"
              @input="$v.details.name.$touch()"
              :rules="[]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name[1]"
              label="Name Ru"
              :rules="[]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name[2]"
              label="Name En"
              @input="$v.details.name.$touch()"
              :rules="[]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.url"
              label="Url"
              @input="$v.details.url.$touch()"
              :rules="[val => $v.details.url.required || 'Url is required']"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.ord"
              label="Order"
              type="number"
              @input="$v.details.ord.$touch()"
              :rules="[
                val => $v.details.ord.required || 'Order is required',
                val => $v.details.ord.numeric || 'Not numeric'
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.icon"
              label="Icon Class Name"
              :rules="[]"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon name="extension" class="cursor-pointer">
                  <q-popup-proxy v-model="showIconPicker">
                    <q-icon-picker
                      v-model="details.icon"
                      :filter="details.icon"
                      icon-set="material-icons"
                      tooltips
                      :pagination.sync="pagination"
                      style="height: 300px; width: 300px; background-color: white;"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.roles"
              multiple
              :options="rolesList"
              use-chips
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Roles"
              @input="$v.details.roles.$touch()"
              :rules="[
                val => $v.details.roles.required || 'Order is required',
                val => $v.details.roles.minLength || 'Role is not assigned'
              ]"
              lazy-rules
            />
          </div>
          <div class="row">
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
import NotifyService from "@/services/notify.service";
import dialogMix from "@/shared/mixins/dialogMix";
import {
  required,
  requiredIf,
  minLength,
  between,
  email,
  numeric
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      stateList: [
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      },

      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        menu_id: null,
        parent_id: null,
        name: [],
        url: null, // '/home' formatda
        ord: null,
        status: null,
        icon: null,
        roles: [],
        preUrl: "/"
      }
    };
  },
  validations: {
    details: {
      menu_id: {},
      parent_id: {},
      name: {
        required,
        minLength: minLength(3),
        $each: {
          minLength: minLength(3)
        }
      },
      url: {
        required
      }, // '/home' formatda
      ord: {
        required,
        numeric
      },
      status: {
        required
      },
      icon: {},
      roles: {
        required,
        minLength: minLength(1)
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
    console.log(this.getPreUrl);
  },
  computed: {
    ...mapGetters({
      parentMenusList: "dicts/getParentMenus"
    }),
    ...mapGetters({
      rolesList: "dicts/getRolesDict"
    }),
    ...mapGetters({
      isLoading: "common/isLoading"
    }),
    getPreUrl() {
      return this.preUrl;
    }
  },
  methods: {
    setPreUrl(pre) {
      // console.log(pre);
      this.preUrl = pre;
    }
  }
};
</script>

<style></style>
