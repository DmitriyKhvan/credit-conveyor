<template>
  <div class="wrap column">
    <div class="col">
      <s-carusel-card
        v-show="tab.val === 'tabOne'"
        v-if="slideToday"
        :users="todays"
        :slide="slideToday"
        datetime="today"
      />
      <s-carusel-card
        v-show="tab.val === 'tabTwo'"
        v-if="slideTomorrow"
        :users="tomorrow"
        :slide="slideTomorrow"
        datetime="tomorrow"
      />
      <s-carusel-card
        v-show="tab.val === 'tabThree'"
        v-if="slideAfterTomorrow"
        :users="afterTomorrow"
        :slide="slideAfterTomorrow"
        datetime="afterTomorrow"
      />
    </div>
    <div class="row justify-center nav">
      <div :class="tab.id === 0 ? 'round active' : 'round'"></div>
      <div :class="tab.id === 1 ? 'round active' : 'round'"></div>
      <div :class="tab.id === 2 ? 'round active' : 'round'"></div>

      <div class="navLeft" @click="tabSelect('prew')"><q-icon name="keyboard_arrow_left" size="sm" /></div>
      <div class="navRight" @click="tabSelect('next')"><q-icon name="keyboard_arrow_right" size="sm" /></div>
    </div>
  </div>
  <!-- <div class="row">
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
  </div> -->
</template>

<script>
import caruselCard from "./caruselCard";
export default {
  data() {
    return {
      tab: {id: 0, val: "tabOne"},
      slideToday: "",
      slideTomorrow: "",
      slideAfterTomorrow: "",
      message: "Банк поздравляет Вас с днем рожения!",
      navigation: [
        {id: 0, val: 'tabOne'},
        {id: 1, val: 'tabTwo'},
        {id: 2, val: 'tabThree'},

      ]
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
  methods: {
    tabSelect(nav){
      let ids = this.tab.id

      if(nav === 'next') {
        if(ids < 2) {
          ++ids
          this.tab = this.navigation.find(el => el.id === ids)
        } else {
          this.tab = this.navigation.find(el => el.id === 0)
        }

      } else {
          if(ids > 0) {
            --ids
            this.tab = this.navigation.find(el => el.id === ids)
          } else {
            this.tab = this.navigation.find(el => el.id === 2)
          }
      }
    }
  },
  components: {
    SCaruselCard: caruselCard
  }
};
</script>

<style scoped>
  .wrap {
    height: 295px;
  }
  .round {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #E3E8EB;
    margin: 3px;
  }
  .nav {
    position: relative;
    margin-top: 18px;
  }
  .nav .active {
    background: #FD5080;
  }
  .navLeft, .navRight {
    position: absolute;
    color:#ccc;
    top: -5px;
    cursor: pointer;
  }
  .navLeft {left: 0}
  .navRight {right: 0}
</style>
