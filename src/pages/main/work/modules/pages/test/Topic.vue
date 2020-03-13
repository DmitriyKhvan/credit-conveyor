<template>
  <div class="topicBlock">
    <div class="headTopic">
      <h2 class="titleTopic">{{ topicName }}</h2>
      <div class="timeBlock">
        <h3 class="titleTime">Оставшееся время</h3>
        <span class="time">{{ time }}</span>
      </div>
    </div>
    
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
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
          :class="{ answered: test.answered }"
        />
        
        <!-- <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" /> -->
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-for="(test, index) of topic.questions"
        :key="test.id"
        v-model="tab"
      >
        <q-tab-panel :name="index">
          <div class="text-h6">{{index + 1}}. {{ test.question_text }}</div>

          <!-- <q-form @submit="onSubmit(1)" class="q-gutter-md"> -->
          <q-item
            tag="label"
            v-for="variant of test.variants"
            :key="variant.id"
          >
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
                    (duration = 0)
                  )
                "
              />
            </q-item-section>
            <q-item-section class="variantBlock">
              <q-item-label caption>{{ variant.answer_text }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div> -->
          <!-- </q-form> -->
          <!-- {{ timeCurQuestion }} -->
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div class="answer_block">
      <div>
        <span class="typeAnswer blue"></span>
        <p class="typeAnswerText">Отмеченные вопросы</p>
        <span class="typeAnswer green"></span>
        <p class="typeAnswerText">Не отмеченные вопросы</p>
        <span class="typeAnswer white"></span>
        <p class="typeAnswerText">Не посещенные вопросы</p>
      </div>
    </div>

    <div class="button_block">
      <div>
        <q-btn
          icon="keyboard_arrow_left"
          label="Предыдущий"
          color="primary"
          @click="prevTest(1)"
          :disabled="prevDisabled"
          class="q-ml-sm"
        />
        
        <q-btn
          icon="how_to_reg"
          label="Сдать тест"
          color="primary"
          @click="completeTest()"
          class="q-ml-sm"
        />

        <q-btn
          icon-right="keyboard_arrow_right"
          label="Следующий"
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
import ApiService from "./../../../../../../services/api.service";

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
      answerTest: [],
      nextDisabled: false,
      prevDisabled: true,
      timer: null,
      time: "", // обратный отчет
      timeCurQuestion: 0,
      timerCurQuestion: null,
      duration: 0,
      target_date: null,
      queue: [0],
      //target_date: new Date().getTime() + (1000 * 3600), // установить дату обратного отсчета
      days: null,
      hours: null,
      minutes: null,
      seconds: null // переменные для единиц времени
    };
  },
  created() {
    //console.log(this.$router.currentRoute);

    this.getTests(this.id)
      .then(res => {
        console.log("ddd", res);

        this.data.session_id = "" + Math.round(Math.random() * 100000000);
        this.data.test_id = res.data.test_id;
        this.data.start_time = this.curDate();
        this.data.end_time = null;
        this.data.ques_amount = res.data.ques_amount;

        this.topic = res;
        this.target_date = new Date().getTime() + 1000 * res.data.duration;

        this.getCountdown();

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
    this.timer = setInterval(() => {
      this.getCountdown();
    }, 1000);
    this.getCountUp();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timerCurQuestion);
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

      this.countTimeCurQuestion(2);

      clearInterval(this.timerCurQuestion);
      this.getCountUp();

      console.log("watch", this.data.answers);
    }
  },
  computed: {
    topicName() {
      return this.$store.state.education.topicName;
    }
  },
  methods: {
    // onSubmit(count) {
    //   console.log(this.answerTest);
    //   this.tab = this.tab + count;
    //   this.answerTest = "";
    // },
    async getTests(id) {
      return (await ApiService.get(`/test/get?id=${id}`)).data;
    },
    async sentTestAnswers(data) {
      return (await ApiService.post("/test/answer", data)).data;
    },
    nextTest(count) {
      this.tab = this.tab + count;
    },
    prevTest(count) {
      this.tab = this.tab - count;
    },
    sentAnswer(
      index,
      question_id,
      topic_id,
      variant_id,
      variant_text,
      duration
    ) {
      console.log(this.answerTest);
      //clearInterval(this.timerCurQuestion)

      //const timeAnswer = this.answers[index].duration + this.timeCurQuestion

      const answer = {
        ques_id: question_id,
        topic_id,
        variant_id,
        duration: 0
      };
      this.data.answers = [
        ...this.data.answers.slice(0, index),
        answer,
        ...this.data.answers.slice(index + 1)
      ];

      const variantAnswer = {
        question_id,
        variant_text,
        answered: true
      };
      this.answerTest = [
        ...this.answerTest.slice(0, index),
        variantAnswer,
        ...this.answerTest.slice(index + 1)
      ];
    },
    completeTest() {
      this.countTimeCurQuestion(1);

      this.data.end_time = this.curDate();

      this.sentTestAnswers(this.data)
        .then(res => {
          console.log("ответ", res);
          const payload = {
            countTrueAnswers: res.message,
            quesAmount: this.data.ques_amount
          };
          this.$store.commit("sentAnswersTest", payload);
        })
        .catch(err => {
          console.log(err);
        });
      console.log("Answers", this.data);
      this.$router.push({ path: "/completeTest" });
    },
    getCountdown() {
      let current_date = new Date().getTime();
      let seconds_left = (this.target_date - current_date) / 1000;

      this.days = this.pad(parseInt(seconds_left / 86400));
      seconds_left = seconds_left % 86400;

      this.hours = this.pad(parseInt(seconds_left / 3600));
      seconds_left = seconds_left % 3600;

      this.minutes = this.pad(parseInt(seconds_left / 60));
      this.seconds = this.pad(parseInt(seconds_left % 60));

      // строка обратного отсчета  + значение тега

      //this.time = this.days + "</span><span>" + this.hours + "</span><span>" + this.minutes + "</span><span>" + this.seconds + "</span>";
      this.time = this.hours + ":" + this.minutes + ":" + this.seconds;
      if (this.time == "00:00:00") {
        this.completeTest();
      }
    },
    pad(n) {
      return (n < 10 ? "0" : "") + n;
    },
    getCountUp() {
      this.timeCurQuestion = 0;
      this.timerCurQuestion = setInterval(() => {
        this.timeCurQuestion = this.timeCurQuestion + 1;
      }, 1000);
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
      // нужно оптимизировать!!!
      const index = this.queue[this.queue.length - el];
      //
      const timeAnswer =
        this.data.answers[index].duration + this.timeCurQuestion;
      console.log("curtime", timeAnswer);
      const answer = {
        ...this.data.answers[index],
        duration: timeAnswer
      };
      this.data.answers = [
        ...this.data.answers.slice(0, index),
        answer,
        ...this.data.answers.slice(index + 1)
      ];
    }
  }
};
</script>
<style scoped>
.topicBlock {
  padding: 50px;
}

.headTopic {
  display: flex;
  justify-content: space-between;
}

.titleTopic {
  font-size: 22px;
  font-weight: 400;
  margin: 0;
}

.timeBlock {
  display: flex;
  align-items: center;
  border: 1px solid #bbbbbb;
  height: 40px;
  padding: 0 15px;
  font-size: 22px;
}

.titleTime {
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

.time {
  color: #ff0000
}

.testLi {
  list-style: none;
}
.testNav {
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

.answered {
  background: #00aeef;
  color: white !important;
}

.q-item__label {
  font-size: 22px;
  color: #000;
}

.button_block {
  margin: 20px 40px;
}

/* .q-tab-panels {
  padding: 30px 40px;
} */

.q-tab-panel {
  border: 1px solid #ccc;
  width: 95%;
  margin: 30px auto 0;
}

.q-tabs__content--align-justify .q-tab {
  flex: 0 0 auto;
  padding: 0;
  width: 26px;
  height: 26px;
  border: 1px solid #d7d7d7;
  border-radius: 50%;
  margin-right: 20px;
}

.q-tab {
  min-height: 26px;
}

.q-card {
  box-shadow: none;
}

.q-separator--horizontal {
  margin-top: 15px;
  background: #0e3475;
}

.q-radio__inner {
  border: 1px solid #ccc;
}

.radioBlock, .variantBlock {
  border: 1px solid #bcbcbc;
}

.radioBlock {
  padding: 0;
  border-right: none;
  min-width: auto;
}

.answer_block, .button_block {
  display: flex;
  justify-content: center;
  margin: 10px 0 40px 0;
}

.typeAnswer {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #d7d7d7;
}

.answer_block > div {
  display: flex;
  align-items: center;
  /* align-content: center; */
}

.typeAnswerText {
  margin: 0 20px 0 5px;
}

.blue {
  background: #00aeef;
}

.green {
  background: #12a39e;
}

.button_block button {
  margin: 0 10px;
}

</style>
