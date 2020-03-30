<template>
  <div class="timeBlock">
    <h3 class="titleTime">Оставшееся время</h3>
    <span class="time">{{ time }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: this.targetDate,
      timer: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null // переменные для единиц времени
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getCountdown();
    }, 1000);
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    clearInterval(this.timer);
    clearInterval(this.timerCurQuestion);
  },
  computed: {
    targetDate() {
      return this.$store.state.education.targetDate;
    }
  },
  methods: {
    getCountdown() {
      let current_date = new Date().getTime();
      let seconds_left = (this.targetDate - current_date) / 1000;

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
  }
};
</script>

<style></style>
