<template>
  <div class="topicBlock">
    <div class="headTopic">
      <h2 class="titleTopic">{{ topicName }}</h2>
      <appTimer />
    </div>

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey cardVisible"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="(test, index) of answerTest"
          :key="test.question_id"
          :name="index"
          :label="index + 1"
          icon="accessibility_new"
          class="cardVisible"
          :class="tabColor(index, test.answered)"
          @click="setColorView(index)"
        />

        <!-- <q-tab name="alarms" label="Alarms" />
        <q-tab name="movies" label="Movies" />-->
      </q-tabs>

      <q-separator />

      <q-tab-panels v-for="(test, index) of topic.questions" :key="test.id" v-model="tab">
        <q-tab-panel :name="index">
          <div class="text-h6">{{index + 1}}. {{ test.question_text }}</div>

          <!-- <q-form @submit="onSubmit(1)" class="q-gutter-md"> -->
          <q-item tag="label" v-for="(variant, i) of test.variants" :key="variant.id">
            <q-item-section avatar class="radioBlock">
              <q-radio
                v-model="answerTest[index].variant_text"
                :val="variant.answer_text"
                @input="
                  sentAnswer(
                    index,
                    test.id,
                    test.topic_id,
                    variant.id,
                    variant.answer_text,
                  )
                "
              />
            </q-item-section>
            <q-item-section :class="varActive(variant.id)">
              <q-item-label caption class="varContainer">
                <span class="abc">{{ abc[i] }}</span>
                {{ variant.answer_text }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <!-- <div>
              <q-btn label="Submit" type="submit" color="primary" />
          </div>-->
          <!-- </q-form> -->
          <!-- {{ timeCurQuestion }} -->
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div class="answer_block">
      <div>
        <span class="typeAnswer blue"></span>
        <p class="typeAnswerText">{{$t('tables.education.test.marked_questions')}}</p>
        <span class="typeAnswer green"></span>
        <p class="typeAnswerText">{{$t('tables.education.test.not_marked_questions')}}</p>
        <span class="typeAnswer white"></span>
        <p class="typeAnswerText">{{$t('tables.education.test.not_visited_questions')}}</p>
      </div>
    </div>

    <div class="button_block">
      <div>
        <q-btn
          icon="keyboard_arrow_left"
          :label="$t('tables.education.test.previous')"
          color="primary"
          @click="prevTest(1)"
          :disabled="prevDisabled"
          class="q-ml-sm"
        />

        <q-btn
          icon="how_to_reg"
          :label="$t('tables.education.test.end_test')"
          color="primary"
          @click="completeTest()"
          class="q-ml-sm"
        />

        <q-btn
          icon-right="keyboard_arrow_right"
          :label="$t('tables.education.test.next')"
          color="primary"
          @click="nextTest(1)"
          :disabled="nextDisabled"
          class="q-ml-sm"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ApiService from "@/services/api.service";
import Timer from "./components/Timer";

export default {
  data() {
    return {
      id: this.$router.currentRoute.params["id"],
      data: {
        session_id: null,
        test_id: null,
        start_time: null,
        end_time: null,
        answers: []
      },

      topic: {},

      tab: 0,
      tabView: [0],
      answerTest: [],
      nextDisabled: false,
      prevDisabled: true,
      timeCurQuestion: Date.now(),
      target_date: null,
      queue: [0],
      abc: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]
    };
  },
  created() {
    this.getTests(this.id)
      .then(res => {
        this.data.session_id = "" + Math.round(Math.random() * 100000000);
        this.data.test_id = res.data.test_id;
        this.data.start_time = this.curDate();
        this.data.end_time = null;
        this.data.ques_amount = res.data.ques_amount;

        this.topic = res;
        //Timer
        const targetDate = new Date().getTime() + 1000 * res.data.duration;

        this.$store.commit("setTargetDate", targetDate);

        for (let question of this.topic.questions) {
          this.data.answers.push({
            ques_id: question.id,
            topic_id: question.topic_id,
            variant_id: null,
            duration: 0
          });

          this.answerTest.push({
            question_id: question.id,
            variant_text: "",
            answered: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    const tabover = document.getElementsByClassName("q-tabs__content");
    tabover[1].style.cssText = "overflow: visible";
  },
  updated() {
    console.log("updated");
  },
  watch: {
    tab() {
      // const el = document.querySelector('.q-tab--active')
      // const icon = '<i class="material-icons">accessibility_new</i>'

      // el.append(innerHtml);

      if (this.tab < this.data.answers.length - 1 && this.tab > 0) {
        this.nextDisabled = false;
        this.prevDisabled = false;
      } else if (this.tab === this.data.answers.length - 1) {
        this.nextDisabled = true;
        this.prevDisabled = false;
      } else if (this.tab === 0) {
        this.prevDisabled = true;
        this.nextDisabled = false;
      }

      this.queue.push(this.tab);

      this.countTimeCurQuestion(2); // 2 - предпоследний элемент
    }
  },
  updated() {
    // this.data.answers.forEach(element => {
    //   console.log(element.variant_id)
    // });
    // if(this.data.answers.variant_id) console.log('вопросы', this.data.answers.variant_id)
  },
  computed: {
    topicName() {
      return this.$store.state.education.topicName;
    }
  },
  methods: {
    tabColor(i, answer) {
      const start = this.tabView.length;
      const view = this.tabView.find(e => e === i);
      if (answer) {
        return "answered";
      } else if (view || i === 0) {
        return "tabView";
      }
    },
    setColorView(i) {
      if (!this.tabView.find(e => e === i)) this.tabView.push(i);
    },
    varActive(id) {
      console.log("varActive");
      if (this.data.answers.find(e => e.variant_id === id)) return "varActive";
    },
    async getTests(id) {
      return (await ApiService.get(`/test/get?id=${id}`)).data;
    },
    async sentTestAnswers(data) {
      return (await ApiService.post("/test/answer", data)).data;
    },
    nextTest(count) {
      this.tab = this.tab + count;
      this.setColorView(this.tab);
    },
    prevTest(count) {
      this.tab = this.tab - count;
      this.setColorView(this.tab);
    },
    sentAnswer(index, question_id, topic_id, variant_id, variant_text) {
      const answer = {
        ques_id: question_id,
        topic_id,
        variant_id
      };

      this.data.answers = [
        ...this.data.answers.slice(0, index),
        {
          ...this.data.answers.slice(index, index + 1)[0],
          ...answer
        },
        ...this.data.answers.slice(index + 1)
      ];

      const variantAnswer = {
        question_id,
        variant_text,
        variant_id,
        answered: true
      };
      this.answerTest = [
        ...this.answerTest.slice(0, index),
        variantAnswer,
        ...this.answerTest.slice(index + 1)
      ];
    },
    completeTest() {
      console.log("data", this.data);
      this.countTimeCurQuestion(1); // 1 последний элемент

      this.data.end_time = this.curDate();

      this.sentTestAnswers(this.data)
        .then(res => {
          const payload = {
            countTrueAnswers: res.message,
            quesAmount: this.data.ques_amount
          };
          this.$store.commit("sentAnswersTest", payload);
          this.$store.commit("setResTest", res.message);

          this.$router.push({ path: "/completeTest" });
        })
        .catch(err => {
          console.log(err);
        });
    },

    curDate() {
      var date = new Date();
      var aaaa = date.getFullYear();
      var gg = date.getDate();
      var mm = date.getMonth() + 1;

      if (gg < 10) gg = "0" + gg;

      if (mm < 10) mm = "0" + mm;

      var cur_day = aaaa + "-" + mm + "-" + gg;

      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      if (hours < 10) hours = "0" + hours;

      if (minutes < 10) minutes = "0" + minutes;

      if (seconds < 10) seconds = "0" + seconds;

      return cur_day + " " + hours + ":" + minutes + ":" + seconds;
    },

    countTimeCurQuestion(el) {
      this.timeCurQuestion = Math.round(
        (Date.now() - this.timeCurQuestion) / 1000
      ); // количество секунд

      const index = this.queue[this.queue.length - el];

      const timeAnswer =
        this.data.answers[index].duration + this.timeCurQuestion;

      const answer = {
        ...this.data.answers[index],
        duration: timeAnswer
      };
      this.data.answers = [
        ...this.data.answers.slice(0, index),
        answer,
        ...this.data.answers.slice(index + 1)
      ];

      this.timeCurQuestion = Date.now(); // время прошедшее от 1970г. в секундах
    }
  },
  components: {
    appTimer: Timer
  }
};
</script>
<style>
.topicBlock {
  padding: 50px;
}

.topicBlock .headTopic {
  display: flex;
  justify-content: space-between;
}

.topicBlock .titleTopic {
  font-size: 22px;
  font-weight: 400;
  margin: 0;
}

.topicBlock .timeBlock {
  display: flex;
  align-items: center;
  border: 1px solid #bbbbbb;
  height: 40px;
  padding: 0 15px;
  font-size: 22px;
}

.topicBlock .titleTime {
  position: relative;
  margin: 0;
  font-size: 22px;
  margin-right: 20px;
}

/* .titleTime::before {
  position: absolute;
  content: "";
  display: block;
  height: 1px;
  width: 20px;
  background: #8e9fbe;
  transform: rotate(90deg);
  top: 0;
  right: 0;
} */

.topicBlock .time {
  color: #ff0000;
}

.topicBlock .testLi {
  list-style: none;
}
.topicBlock .testNav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-left: 15px;
}

.q-tab--active {
}

.topicBlock .answered,
.topicBlock .tabView {
  background: #00aeef;
  color: white !important;
}
.topicBlock .tabView {
  background: #12a39e;
}

.topicBlock .q-item__label {
  font-size: 22px;
  color: #000;
}

.topicBlock .button_block {
  margin: 20px 40px;
}

/* .q-tab-panels {
  padding: 30px 40px;
} */

.topicBlock .q-tab-panel {
  border: 1px solid #ccc;
  width: 95%;
  margin: 30px auto 0;
}

/* .topicBlock .q-tabs__content--align-justify .q-tab {
  flex: 0 0 auto;
  padding: 0;
  width: 26px;
  height: 26px;
  border: 1px solid #d7d7d7;
  border-radius: 50%;
  margin-right: 20px;
} */

.topicBlock .q-tab {
  min-height: 26px;
  flex: 0 0 auto;
  padding: 0;
  width: 26px;
  height: 26px;
  border: 1px solid #d7d7d7;
  border-radius: 50%;
  margin-right: 20px;
}

.topicBlock .q-card {
  box-shadow: none;
}

.topicBlock .q-separator--horizontal {
  margin-top: 15px;
  background: #0e3475;
}

.topicBlock .q-radio__inner {
  border: 1px solid #ccc;
}

.topicBlock .radioBlock {
  display: none;
}

.topicBlock .answer_block,
.topicBlock .button_block {
  display: flex;
  justify-content: center;
  margin: 10px 0 40px 0;
}

.topicBlock .varContainer {
  display: flex;
  padding: 0;
  border: 1px solid #bcbcbc;
  align-items: center;
}
.topicBlock .abc {
  display: flex;
  border-right: 1px solid #bcbcbc;
  width: 40px;
  height: 40px;
  background: #ccc;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.topicBlock .typeAnswer {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #d7d7d7;
}

.topicBlock .answer_block > div {
  display: flex;
  align-items: center;
  /* align-content: center; */
}

.topicBlock .typeAnswerText {
  margin: 0 20px 0 5px;
}

.topicBlock .blue {
  background: #00aeef;
}

.topicBlock .green {
  background: #12a39e;
}

.topicBlock .button_block button {
  margin: 0 10px;
}
.radioBlock[data-v-353b6ad8],
.variantBlock[data-v-353b6ad8] {
  border: none;
}

.topicBlock .varActive {
  border: 1px #3d5afe solid;
}
.topicBlock .varActive span {
  background: #3d5afe;
  color: #fff;
}

.topicBlock .cardVisible i.q-tab__icon {
  position: absolute;
  top: -25px;
}

.topicBlock div.q-tab i {
  display: none;
  color: #3d5afe;
}
.topicBlock div.q-tab--active i {
  display: block !important;
  color: #3d5afe;
}
.topicBlock .q-tab__indicator {
  display: none;
}
.topicBlock .q-card {
  margin-top: 20px;
}
</style>
