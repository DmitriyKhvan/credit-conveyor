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
              <div
                v-for="(item, index) of settingsScorList"
                :key="'settingsScorList' + index"
              >
                <appTreeFieldTemplate
                  v-if="item.typeTemplate == 1"
                  :subTitleScor="item.subTitleScor"
                  :items="item.items"
                  :fieldsName="item.fieldsName"
                  :sortBy="item.sortBy"
                  :refsName="item.refsName"
                />

                <appTwoFieldTemplate
                  v-else-if="item.typeTemplate == 2"
                  :subTitleScor="item.subTitleScor"
                  :items="item.items"
                  :fieldsName="item.fieldsName"
                  :sortBy="item.sortBy"
                  :refsName="item.refsName"
                  :mask="item.mask"
                  :validFunc="item.validFunc"
                />

              </div>
              
              <!-- <appTreeFieldTemplate
                :subTitleScor="'Возраст заемщика'"
                :items="settings.app_card_age"
                :fieldsName="{
                  periodFrom: 'minAge',
                  periodTo: 'maxAge'
                }"
                :sortBy="'minAge'"
                :refsName="{
                  periodMin: 'ageMinAge',
                  periodMax: 'ageMaxAge',
                  score: 'ageScore'
                }"
              /> -->
              <!-- <appTreeFieldTemplate
                :subTitleScor="'Стаж на последнем месте работы'"
                :items="settings.app_card_last_job_period"
                :fieldsName="{
                  periodFrom: 'minPeriod',
                  periodTo: 'maxPeriod'
                }"
                :sortBy="'minPeriod'"
                :refsName="{
                  periodMin: 'lastJobPeriodMinPeriod',
                  periodMax: 'lastJobPeriodMaxPeriod',
                  score: 'lastJobPeriodScore'
                }"
              /> -->

              <!-- <appTwoFieldTemplate
                :subTitleScor="'Компания с рейтингом'"
                :items="settings.app_card_rating_company"
                :fieldsName="{
                  scoreName: 'rating'
                }"
                :refsName="{
                  scoreName: 'ratingCompanyRating',
                  score: 'ratingCompanyScore'
                }"
              /> -->
              <!-- <AppCardChildren />
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
import creditSettings from "../mixins/creditSettings";

import TreeFieldTemplate from "./TreeFieldTemplate";
import TwoFieldTemplate from "./TwoFieldTemplate";

import sortData from '../filters/sortData'
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
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 100);
  },
  computed: {
    settingsScorList() {
      return sortData([
        //TreeFieldTemplate
        {
          subTitleScor: "Возраст заемщика",
          items: this.settings.app_card_age,
          fieldsName: {
            periodFrom: "minAge",
            periodTo: "maxAge"
          },
          sortBy: "minAge",
          refsName: {
            periodMin: "ageMinAge",
            periodMax: "ageMaxAge",
            score: "ageScore"
          }, 
          typeTemplate: 1,
          order: 0
        },
        {
          subTitleScor:"Количество детей",
          items: this.settings.app_card_children,
          fieldsName: {
            scoreName: "childrenNumber"
          },
          sortBy: "childrenNumber",
          refsName: {
            scoreName: "childrenNumber",
            score: "childrenScore"
          },
          mask: '##',
          validFunc: this.integerValid,
          typeTemplate: 2,
          order: 0
        },
        
        {
          subTitleScor: "Стаж на последнем месте работы",
          items: this.settings.app_card_last_job_period,
          fieldsName: {
            periodFrom: "minPeriod",
            periodTo: "maxPeriod"
          },
          sortBy: "minPeriod",
          refsName: {
            periodMin: "lastJobPeriodMinPeriod",
            periodMax: "lastJobPeriodMaxPeriod",
            score: "lastJobPeriodScore"
          },
          typeTemplate: 1,
          order: 2
        },
        {
          subTitleScor: "Период, на который оформляется кредит ",
          items: this.settings.app_card_loan_period,
          fieldsName: {
            periodFrom: "minPeriod",
            periodTo: "maxPeriod"
          },
          sortBy: "minPeriod",
          refsName: {
            periodMin: "loanPeriodMinPeriod",
            periodMax: "loanPeriodMaxPeriod",
            score: "loanPeriodScore"
          },
          typeTemplate: 1,
          order: 2
        },
        //TwoFieldTemplate
        {
          subTitleScor:"Компания с рейтингом",
          items: this.settings.app_card_rating_company,
          fieldsName: {
            scoreName: "rating"
          },
          sortBy: "rating",
          refsName: {
            scoreName: "ratingCompanyRating",
            score: "ratingCompanyScore"
          },
          mask: 'A',
          typeTemplate: 2,
          order: 1
        },
        {
          subTitleScor:"Бал по локации клиента ",
          items: this.settings.app_card_location,
          fieldsName: {
            scoreName: "name"
          },
          sortBy: "name",
          refsName: {
            scoreName: "locationName",
            score: "locationScore"
          },
          typeTemplate: 2,
          order: 1
        }
      ], 'order');
    }
  },
  methods: {},
  components: {
    appTreeFieldTemplate: TreeFieldTemplate,
    appTwoFieldTemplate: TwoFieldTemplate
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
