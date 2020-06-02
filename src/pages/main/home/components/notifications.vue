<template>
  <div class="row">
    <div class="col">
      <q-card square flat bordered>
        <q-card-section class="white">
          <div class="text-h6 goString">
            <marquee>{{message}}</marquee>
          </div>
        </q-card-section>
        <div class="row">
          <div class="col">
            <q-tabs
              v-model="tab"
              dense
              align="justify"
              inline-label
              class="bg-grey-3 q-mb-sm"
              active-bg-color="primary"
              indicator-color="primary"
              active-color="white"
              :breakpoint="0"
            >
              <q-tab name="tabOne" label="Сегодня" />
              <q-tab name="tabTwo" label="Завтра" />
              <q-tab name="tabThree" label="Послезавтра" />
            </q-tabs>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <s-carusel-card
              v-show="tab === 'tabOne'"
              v-if="slideToday"
              :users="todays"
              :slide="slideToday"
              datetime="today"
            />
            <s-carusel-card
              v-show="tab === 'tabTwo'"
              v-if="slideTomorrow"
              :users="tomorrow"
              :slide="slideTomorrow"
              datetime="tomorrow"
            />
            <s-carusel-card
              v-show="tab === 'tabThree'"
              v-if="slideAfterTomorrow"
              :users="afterTomorrow"
              :slide="slideAfterTomorrow"
              datetime="afterTomorrow"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import caruselCard from "./caruselCard";
export default {
  data() {
    return {
      tab: "tabOne",
      slideToday: "",
      slideTomorrow: "",
      slideAfterTomorrow: "",
      message: "Банк поздравляет Вас с днем рожения!"
    };
  },
  async created() {
    await this.$store.dispatch("setBirthdays").then(res => {
      const one = this.$store.getters.getTodays;
      this.slideToday = one[0].LAST_NAME;

      const two = this.$store.getters.getTomorrow;
      this.slideTomorrow = two[0].LAST_NAME;

      const three = this.$store.getters.getAfterTomorrow;
      this.slideAfterTomorrow = three[0].LAST_NAME;
    });
  },
  computed: {
    todays() {
      return this.$store.getters.getTodays;
    },
    tomorrow() {
      return this.$store.getters.getTomorrow;
    },
    afterTomorrow() {
      return this.$store.getters.getAfterTomorrow;
    }
  },
  methods: {},
  components: {
    SCaruselCard: caruselCard
  }
};
</script>

<style lang="sass" scoped>
    .redColor
        color: red    
</style>