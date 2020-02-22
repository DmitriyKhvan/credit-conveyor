<template>
  <div>
    <h1>Topic id {{ id }}</h1>
    <h4>{{time}}</h4>
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
          v-for="(test, index) of topic.questions"
          :key="test.id"
          :name="index"
          :label="index + 1"
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
                  v-model="answerTest[index]" 
                  :val="variant.answer_text"  
                  @input="sentAnswer(
                                      index,
                                      test.id, 
                                      test.topic_id, 
                                      variant.id, 
                                      variant.answer_text,
                                      duration = 0)"
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
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-btn
      label="Назад"
      color="primary"
      @click="prevTest(1)"
      :disabled="prevDisabled"
    />
    <q-btn
      label="Вперед"
      color="primary"
      @click="nextTest(1)"
      :disabled="nextDisabled"
    />
    <q-btn
      label="Завершить тест"
      color="primary"
      @click="completeTest()"
    />
  </div>
</template>
<script>
import TestService from './test-service'

export default {
  data() {
    return {
      testService: new TestService(),
      id: this.$router.currentRoute.params["id"],
      data: {
        session_id: "",
        test_id: 4,
        start_time: new Date(),
        end_time: "timestamp"
      },
      answers: [],

      topic: {},
      
      tab: 0,
      answerTest: [],
      nextDisabled: false,
      prevDisabled: true,
      timer: null,
      time: '',
      duration: 0,
      target_date: null,
      //target_date: new Date().getTime() + (1000 * 3600), // установить дату обратного отсчета
      days: null, 
      hours: null, 
      minutes: null, 
      seconds: null, // переменные для единиц времени
    };
  },
  created() {
    //console.log(this.$router.currentRoute);
    this.testService.getTests(this.id)
    .then(res => {
      console.log('ddd', res)
      this.topic = res
      this.target_date = new Date().getTime() + (1000 * res.data.duration)

      this.getCountdown();  

      for (let question of this.topic.questions) {
      this.answers.push(
        {
          question_id: question.id,
          topic_id: question.topic_id,
          variant_id: null,
          duration: 0
        }
      )
    }
      
    })
    .catch(err => {
      console.log(err)
    })

  },
  mounted() {
    this.timer = setInterval(() => {this.getCountdown() }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {
    tab() {
      if (this.tab < this.answers.length - 1 && this.tab > -1) {
        this.nextDisabled = false;
        this.prevDisabled = false;
      } else if (this.tab === this.answers.length - 1) {
        this.nextDisabled = true;
      } else if (this.tab === 0) {
        this.prevDisabled = true;
      }
      console.log(this.tab)
    }
  },
  methods: {
    // onSubmit(count) {
    //   console.log(this.answerTest);
    //   this.tab = this.tab + count;
    //   this.answerTest = "";
    // },
    nextTest(count) {
      this.tab = this.tab + count;
    },
    prevTest(count) {
      this.tab = this.tab - count;
    },
    sentAnswer(index, question_id, topic_id, variant_id, variant_text, duration) {
      console.log(this.answerTest)
      const answer = {
        question_id,
        topic_id,
        variant_id,
        duration
      }
      this.answers = [
        ...this.answers.slice(0, index),
        answer,
        ...this.answers.slice(index + 1)
      ]

      this.answerTest = [
        ...this.answerTest.slice(0, index),
        variant_text, 
        ...this.answerTest.slice(index + 1)
      ]

      console.log(this.answers)
    },
    completeTest() {
      this.end_time = new Date()
      this.$router.push('/work/completeTest');
    },
    getCountdown() {
      let current_date = new Date().getTime();
      let seconds_left = (this.target_date - current_date) / 1000;
  
      this.days = this.pad( parseInt(seconds_left / 86400) );
      seconds_left = seconds_left % 86400;
            
      this.hours = this.pad( parseInt(seconds_left / 3600) );
      seconds_left = seconds_left % 3600;
            
      this.minutes = this.pad( parseInt(seconds_left / 60) );
      this.seconds = this.pad( parseInt( seconds_left % 60 ) );
  
      // строка обратного отсчета  + значение тега
      
      //this.time = this.days + "</span><span>" + this.hours + "</span><span>" + this.minutes + "</span><span>" + this.seconds + "</span>"; 
      this.time = this.hours + ":" + this.minutes + ":" + this.seconds; 
      if (this.time == '00:00:00') {
        this.completeTest()
      }
    },
    pad(n) {
        return (n < 10 ? '0' : '') + n;
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
</style>
