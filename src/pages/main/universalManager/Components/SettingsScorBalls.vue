<template>
  <div class="settingsScorBalls">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-8">
              <appTreeFieldTemplate 
                :subTitleScor="'Возраст заемщика'"
                :items="settings.appCardAge"
                :periodFrom="'minAge'"
                :periodTo="'maxAge'"
              />
              <!-- <AppCardAge />
              <AppCardRatingCompany />
              <AppCardChildren />
              <AppCardLastJobPeriod />
              <AppCardLoanPeriod /> -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from '../mixins/creditSettings'

import TreeFieldTemplate from './TreeFieldTemplate'
// import AppCardAge from './SettingsScorBalls/AppCardAge'
// import AppCardRatingCompany from './SettingsScorBalls/AppCardRatingCompany'
// import AppCardChildren from './SettingsScorBalls/AppCardChildren'
// import AppCardLastJobPeriod from './SettingsScorBalls/AppCardLastJobPeriod'
// import AppCardLoanPeriod from './SettingsScorBalls/AppCardLoanPeriod'

export default {
  mixins: [creditSettings],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 100)
  },
  computed: {}, 
  methods: {},
  components: {
    appTreeFieldTemplate: TreeFieldTemplate
    // AppCardAge,
    // AppCardRatingCompany,
    // AppCardChildren,
    // AppCardLastJobPeriod,
    // AppCardLoanPeriod
  }
};
</script>
<style lang="scss">
  .settingsScorBalls {
    .subTitleScor {
      font-size: 20px;
    }
    .scoreBall {
      float: right;
      width: 60%;
    }
  }
</style>
