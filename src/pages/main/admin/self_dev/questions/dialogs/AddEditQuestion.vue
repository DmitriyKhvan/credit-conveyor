<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{ $t("tables.education.addEditQuestion") }}</div>
          <q-btn flat :icon="'clear'" v-on:click.native="onCancelClick()"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-gutter-y-sm q-gutter-x-md column">
          <div class="row">
            <q-select
              outlined
              clearable
              :options="topicList"
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.topic_id"
              option-value="value"
              option-label="text"
              emit-value
              map-options
              :label="$t('tables.education.topicName')"
              @input="$v.details.topic_id.$touch()"
              :rules="[
                val => $v.details.topic_id.required || $t('tables.education.topicNameError')
              ]"
              lazy-rules
            />
            <q-select
              outlined
              clearable
              :options="levels"
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="details.level"
              option-value="value"
              option-label="key"
              emit-value
              map-options
              :label="$t('tables.education.levelOfQuestion')"
              @input="$v.details.level.$touch()"
              :rules="[
                val => $v.details.level.required || $t('tables.education.levelQuestionError')
              ]"
              lazy-rules
            />
          </div>

          <div class="row">
            <q-input
              outlined
              autogrow
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-12 col-md-12"
              v-model="details.question_text"
              :label="$t('tables.education.questionName')"
              @input="$v.details.question_text.$touch()"
              :rules="[
                val => $v.details.question_text.required || $t('tables.education.topicNameError'),
                val => $v.details.question_text.minLength || $t('tables.education.topicNameError')
              ]"
              lazy-rules
            />
          </div>

          <div class="row justify-between">
            <div class="text-h6">VARIANTS</div>
          </div>

          <div class="row">
            <!--(v, index) in $v.people.$each.$iter-->
            <table>
              <tr v-for="(items, index) in details.variants" :key="index">
                <td>
                  <q-input
                    outlined
                    clearable
                    color="purple-12"
                    class="col-xs-12 col-sm-12 col-md-12"
                    v-model="details.variants[index].answer_text"
                    :label="$t('tables.education.textVariant')"
                    lazy-rules
                  />
                </td>
                <td>
                  <q-radio v-model="shape" :val="index" v-on:click.native="chooseRightAnswer()" />
                </td>
                <td>
                  <q-btn v-if="index>2" color="red" icon="delete" @click="removeElement(index)" />
                </td>
              </tr>
            </table>
          </div>

          <div class="row">
            <q-btn v-if="variantAmount<5" color="primary" icon="add" @click="addOneMoreVariant()" />
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

export default {
  data() {
    return {
      variantAmount: 0,
      counter: 0,
      levels: [
        {
          key: "Easy",
          value: 1
        },
        {
          key: "Average",
          value: 2
        },
        {
          key: "Hard",
          value: 3
        }
      ],
      shape: null,
      isPwd: true,
      isLoading: this.$store.getters["common/getLoading"],
      stateList: [
        { key: "Active", value: 1 },
        { key: "Passive", value: 0 }
      ],
      isValidated: true,
      topicList: this.$store.getters["dicts/getTestTopicList"],

      // !!! Dont change. Functions in dialogMixin depends on name "details"
      details: {
        id: null,
        topic_id: null,
        question_text: null,
        level: null,
        variants: [
          {
            id: null,
            question_id: null,
            answer_text: null,
            answer_status: 0
          }
        ]
      },
      customData: null
    };
  },
  validations: {
    details: {
      question_text: {
        required,
        minLength: minLength(3)
      },
      level: {
        required
      },
      topic_id: {
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
    for (
      this.counter = 0;
      this.counter < this.details.variants.length;
      this.counter++
    ) {
      if (this.details.variants[this.counter].answer_status != 0) {
        this.shape = this.counter;
      }
    }
    this.variantAmount = this.details.variants.length;
  },
  methods: {
    removeElement(index) {
      this.details.variants.splice(index, 1);
      this.variantAmount = this.details.variants.length;
    },
    addOneMoreVariant() {
      this.details.variants.push({
        id: null,
        question_id: null,
        answer_text: null,
        answer_status: null
      });
      this.variantAmount = this.details.variants.length;
    },
    chooseRightAnswer() {
      for (
        this.counter = 0;
        this.counter < this.details.variants.length;
        this.counter++
      ) {
        this.details.variants[this.counter].answer_status = 0;
      }
      this.details.variants[this.shape].answer_status = 1;
    }
  }
};
</script>

<style></style>
