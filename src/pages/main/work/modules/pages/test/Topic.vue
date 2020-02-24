<template>
  <div>
    <h1>{{ topicName }}</h1>
    <h4>{{ time }}</h4>
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
          <div class="text-h6">{{ test.question_text }}</div>

          <!-- <q-form @submit="onSubmit(1)" class="q-gutter-md"> -->
          <q-item
            tag="label"
            v-for="variant of test.variants"
            :key="variant.id"
          >
            <q-item-section avatar>
              <q-radio
                name="shape"
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
            <q-item-section>
              <q-item-label caption>{{ variant.answer_text }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div> -->
          <!-- </q-form> -->
          {{ timeCurQuestion }}
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div class="button_block">
      <q-btn
        label="Назад"
        color="primary"
        @click="prevTest(1)"
        :disabled="prevDisabled"
        class="q-ml-sm"
      />
      <q-btn
        label="Вперед"
        color="primary"
        @click="nextTest(1)"
        :disabled="nextDisabled"
        class="q-ml-sm"
      />
      <q-btn
        label="Завершить тест"
        color="primary"
        @click="completeTest()"
        class="q-ml-sm"
      />
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
<style>
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

.answered {
  background: #00800070;
  color: white !important;
}

.button_block {
  margin: 20px 40px;
}
</style>
