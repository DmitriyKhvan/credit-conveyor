<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{ $t("tables.education.addEditTest") }}</div>
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
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.name"
              :label="$t('tables.education.addEditTest')"
              @input="$v.details.name.$touch()"
              :rules="[
                val => $v.details.name.required || $t('tables.education.topicNameError'),
                val => $v.details.name.minLength || $t('tables.education.topicNameError')
              ]"
              lazy-rules
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.description"
              :label="$t('tables.education.description')"
              @input="$v.details.description.$touch()"
              :rules="[
                val => $v.details.description.required || $t('tables.education.topicNameError'),
                val => $v.details.description.minLength || $t('tables.education.topicNameError')
              ]"
              lazy-rules
            />
            <q-input
              type="number"
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.duration"
              :label="$t('tables.education.duration')"
              @input="$v.details.duration.$touch()"
              :rules="[
                val => $v.details.duration.required || $t('tables.education.topicNameError'),
              ]"
              lazy-rules
            />
            <q-select
              outlined
              clearable
              :options="hideStatus"
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.status"
              option-value="value"
              option-label="key"
              emit-value
              map-options
              :label="$t('tables.education.hideStatus')"
              lazy-rules
            />
          </div>
          <div class="row">
            <table>
              <tr v-for="(items, index) in details.topics" :key="index">
                <q-card-actions style="border:1px solid blue">
                  <!--{{topicList[index].id}} -->
                  <td>
                    <q-select
                      outlined
                      clearable
                      :options="topicList"
                      color="purple-12"
                      class="col-xs-12 col-sm-6 col-md-6"
                      v-model="details.topics[index].id"
                      option-value="id"
                      option-label="name"
                      emit-value
                      map-options
                      :label="$t('tables.education.topicName')"
                      lazy-rules
                    />
                    <!--Need to correct style-->
                  </td>
                  <td>
                    Easy
                    <q-input
                      type="number"
                      outlined
                      clearable
                      color="purple-12"
                      class="col-xs-12 col-sm-6 col-md-6"
                      v-model="details.topics[index].easy"
                      :label="$t('tables.education.testAmount')"
                      lazy-rules
                    />
                  </td>
                  <td>
                    Medium
                    <q-input
                      type="number"
                      outlined
                      clearable
                      color="purple-12"
                      class="col-xs-12 col-sm-6 col-md-6"
                      v-model="details.topics[index].medium"
                      :label="$t('tables.education.testAmount')"
                      lazy-rules
                    />
                  </td>
                  <td>
                    Hard
                    <q-input
                      type="number"
                      outlined
                      clearable
                      color="purple-12"
                      class="col-xs-12 col-sm-6 col-md-6"
                      v-model="details.topics[index].hard"
                      :label="$t('tables.education.testAmount')"
                      lazy-rules
                    />
                  </td>
                  <td>
                    <q-btn color="red" icon="delete" @click="removeElement(index)" />
                  </td>
                </q-card-actions>
              </tr>
            </table>
          </div>
          <div>
            <div class="row">
              <q-btn color="primary" icon="add" @click="addOneMoreVariant()" />
            </div>
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
import NotifyService from "../../../../../../services/notify.service";
import dialogMix from "../../../../../../shared/mixins/dialogMix";
import {
  required,
  requiredIf,
  minLength,
  between,
  email
} from "vuelidate/lib/validators";

import axios from "axios";
export default {
  data() {
    return {
      topicList: null,
      hideStatus: [
        {
          key: "show",
          value: "1"
        },
        {
          key: "hide",
          value: "0"
        }
      ],
      isPwd: true,
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: 0 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        name: null,
        description: null,
        duration: null,
        status: null,
        topics: [
          {
            id: null,
            easy: null,
            medium: null,
            hard: null
          }
        ]
      },
      customData: null
    };
  },
  validations: {
    details: {
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      duration: {
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
    addOneMoreVariant() {
      this.details.topics.push({
        id: null,
        name: null,
        easy: null,
        medium: null,
        hard: null
      });
    },
    removeElement(index) {
      this.details.topics.splice(index, 1);
    }
  },
  beforeCreate: function() {
    axios
      .get("test/topic")
      .then(res => {
        console.log(res);
        this.topicList = res.data;
      })
      .catch(err => {
        console.log(err);
        this.topicList = err;
      });
  }
};
</script>

<style></style>
