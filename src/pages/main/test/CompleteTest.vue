<template>
  <div class="q-pa-lg q-col-gutter-lg topicBlock">
    <div class="row">
      <div class="col text-h5">{{topicName}}</div>
      <div class="col"></div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-10 q-pa-lg bg-grey-3 completeBlockBg">
        <div class="row">
          <div class="col-2 text-center">
            <q-avatar size="100px">
              <img :src="getPhotoUrl(empId)" />
            </q-avatar>
            <div class="text-subtitle1 text-weight-bold lineHeightNormal q-pb-md">{{ fullName}}</div>
          </div>
          <div class="col-10 q-pb-lg text-center text-h5">
            <div class="q-pb-md">{{$t('tables.education.test.completed.end1')}}</div>
            {{$t('tables.education.test.completed.end2')}}
            <br />
            {{$t('tables.education.test.completed.end3')}}
          </div>
        </div>
        <div class="row q-gutter-lg">
          <div class="col-lg-2 col-md-5 bg-white q-pa-md text-center">
            <q-circular-progress
              show-value
              font-size="11px"
              :value="resRightProcentCount()"
              size="130px"
              :thickness="0.22"
              color="green-6"
              track-color="grey-4"
              class="q-ma-md"
            >
              {{$t('tables.education.test.completed.your_result')}}
              <span
                class="resultText text-green-6"
              >{{ resRightProcentCount() }}%</span>
            </q-circular-progress>
          </div>
          <div class="col-lg-2 col-md-5 bg-white q-pa-md text-center">
            <q-circular-progress
              show-value
              font-size="11px"
              :value="effect"
              size="130px"
              :thickness="0.22"
              color="green-6"
              track-color="grey-4"
              class="q-ma-md"
            >
              {{$t('tables.education.test.completed.efficiency')}}
              <span
                class="resultText text-green-6"
              >{{ effect }}%</span>
            </q-circular-progress>
          </div>
          <div class="col-lg-4 col-md-6 bg-white">
            <div class="row q-pa-md">
              <div class="col">
                <div v-for="(e, index) in resResult" :key="index" :class="resClass(e)"></div>
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
          <div class="col-lg-3 col-md-5 bg-white q-pa-md">
            <div class="row">
              <div class="col-6">
                <div
                  class="text-subtitle1 text-weight-bold"
                >{{$t('tables.education.test.completed.total_time')}}</div>
                <div>
                  <span class="text-subtitle1 text-weight-bold text-green-6">0</span>
                  {{$t('tables.education.test.completed.hours')}}
                </div>
                <div>
                  <span class="text-subtitle1 text-weight-bold text-green-6">42</span>
                  {{$t('tables.education.test.completed.minutes')}}
                </div>
                <div>
                  <span class="text-subtitle1 text-weight-bold text-green-6">15</span>
                  {{$t('tables.education.test.completed.seconds')}}
                </div>
              </div>
              <div class="col-6">
                <q-circular-progress
                  show-value
                  font-size="11px"
                  :value="effect"
                  size="100px"
                  :thickness="0.22"
                  color="orange-6"
                  track-color="grey-4"
                  class="q-ma-md"
                >
                  <span class="resultText">{{ avarageTime }}</span>
                </q-circular-progress>
                <div
                  class="lineHeightNormal text-caption text-center"
                >{{$t('tables.education.test.completed.avg_time_for_one_question')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col q-gutter-md text-center">
        <q-btn color="primary" icon="save" :label="$t('actions.save')" />
        <q-btn color="primary" icon="print" :label="$t('actions.print')" />
        <q-btn color="primary" icon="mail" :label="$t('actions.send')" />
      </div>
    </div>
  </div>
</template>
<script>

import MyGraf from "../home/components/graf";
import UserService from "../../../services/user.service";

export default {
  data() {
    return {
      result: 83,
      effect: 65,
      tab: 0,
      fullName: this.$store.getters["auth/fullName"],
      empId: this.$store.getters["auth/empId"],

      chartOptions: {
        ars: "horizontal",
        height: 130,
        legend: { position: "none" }
      }
    };
  },
  computed: {
    topicName() {
      return this.$store.getters["education/getTopicState"].topicName;
    },
    resResult() {
      return this.$store.getters["education/getTopicState"].res;
    },
    resRight() {
      return this.resResult.filter(e => e === true).length;
    },
    resWrong() {
      return this.resResult.filter(e => e === false).length;
    },
    resNotMarked() {
      return this.resResult.filter(e => e === null).length;
    },
    chartData() {
      return {
         graf:[
          [this.resRight, this.resWrong, this.resNotMarked]
        ],
        // names: ['Правильно', 'Не верно', 'Не отмечано'],
        heightGlobalBlock: 100,
      }
    },
    avarageTime() {
      
      //return this.$store.getters.topicData.answers.filter(i => i.)
    }
  },
  methods: {
    resClass(i) {
      if (i === true) {
        return "resultCircle q-mr-sm q-mb-sm";
      } else if (i === false) {
        return "resultCircleWrong q-mr-sm q-mb-sm";
      } else if (i === null) {
        return "resultCircleNot q-mr-sm q-mb-sm";
      }
    },
    resRightProcentCount() {
      const procent = this.resResult.length / 100;
      
      return Math.round(this.resRight / procent);
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    }
  },
  mounted() {
    //console.log("store", this.$store.state.education);
  },
  components: {
    MyGraf
  }
};
</script>

<style>
/* .topicBlock .cardVisible {
  border-bottom: 1px blue solid;
  padding-bottom: 10px;
} */
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
