<template>
  <div class="settingsScorModel" :id="title.id">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>

          <appSettingsModel />
          <appSettingsScoreKoefficient />

        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from '../mixins/creditSettings'

import SettingsModel from '../Components/SettingsScorModel/SettingsModel'
import SettingsScoreKoefficient from '../Components/SettingsScorModel/SettingsScoreKefficient'
// import AlertMessage from '../Components/AlertMessage'

export default {
  mixins: [creditSettings],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 3000)
  }, 
  computed: {},
  methods: {},

  components: {
    appSettingsModel: SettingsModel,
    appSettingsScoreKoefficient: SettingsScoreKoefficient
  }
};
</script>
<style lang="scss">
  .settingsScorModel{
    .titleScor {
      font-size: 14px;
    }

    .scoreСoefficientСlass > div {
      background: #F5F6FA;
    }

    .scoreСoefficient {
      float: right;
      width: 70%;
    }
  }
</style>
