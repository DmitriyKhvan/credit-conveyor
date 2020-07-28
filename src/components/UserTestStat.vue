<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{data.test_name}}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-pa-lg q-col-gutter-lg topicBlock">
          <div class="col q-pa-lg bg-grey-3 completeBlockBg">
            <div class="row q-gutter-lg">
              <div class="col-lg-5 col-md-5 bg-white q-pa-md text-center">
                <q-circular-progress
                  show-value
                  font-size="11px"
                  :value="data.result"
                  size="130px"
                  :thickness="0.22"
                  color="green-6"
                  track-color="grey-4"
                  class="q-ma-md"
                >
                  {{$t('tables.education.test.completed.your_result')}}
                  <span
                    class="resultText text-green-6"
                  >{{ data.result }}%</span>
                </q-circular-progress>
              </div>

              <div class="col-lg-5 col-md-5 bg-white q-pa-md text-center">
                <q-circular-progress
                  show-value
                  font-size="11px"
                  :value="data.efficiency"
                  size="130px"
                  :thickness="0.22"
                  color="green-6"
                  track-color="grey-4"
                  class="q-ma-md"
                >
                  {{$t('tables.education.test.completed.efficiency')}}
                  <span
                    class="resultText text-green-6"
                  >{{ data.efficiency }}%</span>
                </q-circular-progress>
              </div>
            </div>
            <div class="row q-gutter-lg">
              <div class="col bg-white q-pa-md">
                <div class="row">
                  <div class="col-6">
                    <div
                      class="text-subtitle1 text-weight-bold"
                    >{{$t('tables.education.test.completed.total_time')}}</div>
                    <div>
                      <span class="text-subtitle1 text-weight-bold text-green-6">{{hours}}</span>
                      {{$t('tables.education.test.completed.hours')}}
                    </div>
                    <div>
                      <span class="text-subtitle1 text-weight-bold text-green-6">{{minutes}}</span>
                      {{$t('tables.education.test.completed.minutes')}}
                    </div>
                    <div>
                      <span class="text-subtitle1 text-weight-bold text-green-6">{{seconds}}</span>
                      {{$t('tables.education.test.completed.seconds')}}
                    </div>
                  </div>
                  <div class="col-6">
                    <q-circular-progress
                      show-value
                      font-size="11px"
                      :value="data.avg_time"
                      size="100px"
                      :thickness="0.22"
                      color="orange-6"
                      track-color="grey-4"
                      class="q-ma-md"
                    >
                      <span class="resultText">{{ data.avg_time }} s</span>
                    </q-circular-progress>
                    <div
                      class="lineHeightNormal text-caption text-center"
                    >{{$t('tables.education.test.completed.avg_time_for_one_question')}}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col bg-white">
                <div class="row q-pa-md">
                  <div class="col">
                    <div v-for="(e, index) in data.answers" :key="index" :class="resClass(e)"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-pl-md">
                    {{$t('tables.education.test.completed.right_answers')}}:
                    <b>{{resRight}}</b>
                    <br />
                    {{$t('tables.education.test.completed.wrong_answers')}}:
                    <b>{{resWrong}}</b>
                    <br />
                    {{$t('tables.education.test.completed.not_answered')}}:
                    <b>{{resNotMarked}}</b>
                  </div>
                  <div class="col-6">
                    <MyGraf :tables="chartData"></MyGraf>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import MyGraf from "../pages/main/home/components/graf";

export default {
  created() {
    let totalSeconds = this.data.total_time;
    this.hours = Math.floor(totalSeconds / 3600);
    this.minutes = Math.floor(totalSeconds / 60);
    this.seconds = totalSeconds % 60;
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  components: {
    MyGraf
  },
  computed: {
    resRight() {
      return this.data.answers.filter(e => e === true).length;
    },
    resWrong() {
      return this.data.answers.filter(e => e === false).length;
    },
    resNotMarked() {
      return this.data.answers.filter(e => e === null).length;
    },
    chartData() {
      return {
        graf: [[this.resRight, this.resWrong, this.resNotMarked]],
        // names: ['Правильно', 'Не верно', 'Не отмечано'],
        heightGlobalBlock: 100
      };
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },

    onOKClick() {
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },
    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    },
    resClass(i) {
      if (i === true) {
        return "resultCircle q-mr-sm q-mb-sm";
      } else if (i === false) {
        return "resultCircleWrong q-mr-sm q-mb-sm";
      } else if (i === null) {
        return "resultCircleNot q-mr-sm q-mb-sm";
      }
    }
  }
};
</script>

<style>
.topicBlock .completeBlockBg {
  border: 1px #ccc solid;
}
.topicBlock .resultText {
  font-weight: bold;
  font-size: 32px;
  display: block;
  width: 70px;
}
.topicBlock .resultCircle,
.topicBlock .resultCircleWrong,
.topicBlock .resultCircleNot {
  float: left;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: green;
}
.topicBlock .resultCircleWrong {
  background: red;
}
.topicBlock .resultCircleNot {
  background: grey;
}
.topicBlock .lineHeightNormal {
  line-height: normal;
}
</style>