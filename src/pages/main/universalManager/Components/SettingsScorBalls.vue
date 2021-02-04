<template>
  <div class="settingsScorBalls" :id="title.id"> 
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
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
                  :tableName="item.tableName"
                  :fieldsSettings="item.fieldsSettings"
                  :sortBy="item.sortBy"
                  :refsName="item.refsName"
                />

                <appTwoFieldTemplate
                  v-else-if="item.typeTemplate == 2"
                  :subTitleScor="item.subTitleScor"
                  :tableName="item.tableName"
                  :fieldsSettings="item.fieldsSettings"
                  :sortBy="item.sortBy"
                  :refsName="item.refsName"
                  :mask="item.mask"
                  :validFunc="item.validFunc"
                />

              </div>

              <p class="maxSumScorCardBall">Сумма баллов: <span>{{ maxSumScorCardBall }}</span></p>
              
              <p class="warning" v-if="maxSumScorCardBall > 100">Сумма максимального балла не равна 100</p>
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

export default {
  mixins: [creditSettings],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 3000);
  },
  computed: {
    settingsScorList() {
      return sortData([
        //TreeFieldTemplate
        {
          subTitleScor: "Возраст заемщика",
          tableName: 'APPCARD_AGE',
          fieldsSettings: {
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
          // items: this.settings.app_card_children,
          tableName:'APPCARD_CHILDREN',
          fieldsSettings: {
            scoreName: {
              name: "childrenNumber"
            }
          },
          sortBy: "childrenNumber",
          refsName: {
            scoreName: "childrenNumber",
            score: "childrenScore"
          },
          mask: '##',
          validFunc: this.integerValid,
          typeTemplate: 2,
          order: 1
        },
        
        {
          subTitleScor: "Стаж на последнем месте работы",
          // items: this.settings.app_card_last_job_period,
          tableName: 'APPCARD_LASTJOBPERIOD',
          fieldsSettings: {
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
          // items: this.settings.app_card_loan_period,
          tableName: 'APPCARD_LOANPERIOD',
          fieldsSettings: {
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
          order: 3
        },
        //TwoFieldTemplate
        {
          subTitleScor:"Бал по локации клиента ",
          // items: this.settings.app_card_location,
          tableName: 'APPCARD_LOCATION',
          fieldsSettings: {
            scoreName: {
              name: "name"
            }
          },
          // sortBy: "name",
          refsName: {
            scoreName: "locationName",
            score: "locationScore"
          },
          typeTemplate: 2,
          order: 4
        },
        {
          subTitleScor:"Семейное положение",
          // items: this.settings.app_card_marital,
          tableName: 'APPCARD_MARITAL',
          fieldsSettings: {
            scoreName: {
              name: "status",
              disable: true
            }
          },
          refsName: {
            scoreName: "maritalStatus",
            score: "maritalScore"
          },
          typeTemplate: 2,
          order: 5
        },
        {
          subTitleScor:"Внутренняя кредитная история",
          // items: this.settings.app_card_positive_nbu_history,
          tableName: 'APPCARD_POSITIVENBUHISTORY',
          fieldsSettings: {
            scoreName: {
              name: "hasPositiveNbuHistory",
              disable: true
            }
          },
          refsName: {
            scoreName: "positiveNbuHistory",
            score: "positiveNbuHistoryScore"
          },
          validFunc: this.integerValid,
          typeTemplate: 2,
          order: 6
        },
        {
          subTitleScor:"Рейтинг Работодателя",
          // items: this.settings.app_card_rating_company,
          tableName: 'APPCARD_RATINGCOMPANY',
          fieldsSettings: {
            scoreName: {
              name: "rating"
            }
          },
          sortBy: "rating",
          refsName: {
            scoreName: "ratingCompanyRating",
            score: "ratingCompanyScore"
          },
          mask: 'A',
          typeTemplate: 2,
          order: 7
        },
        {
          subTitleScor:"Недвижимость в имуществе",
          // items: this.settings.app_card_reality,
          tableName: 'APPCARD_REALTY',
          fieldsSettings: {
            scoreName: {
              name: "hasReality",
              disable: true
            }
          },
          refsName: {
            scoreName: "hasReality",
            score: "realityScore"
          },
          validFunc: this.integerValid,
          typeTemplate: 2,
          order: 8
        },
        {
          subTitleScor:"Автотранспорт в имуществе",
          // items: this.settings.app_card_vehicle,
          tableName: 'APPCARD_VEHICLE',
          fieldsSettings: {
            scoreName: {
              name: "hasVehicle",
              disable: true
            }
          },
          refsName: {
            scoreName: "hasVehicle",
            score: "vehicleScore"
          },
          validFunc: this.integerValid,
          typeTemplate: 2,
          order: 9
        },
        {
          subTitleScor: "Депозит в банке",
          // items: this.settings.app_card_bills,
          tableName: 'APPCARD_BILLS',
          fieldsSettings: {
            periodFrom: "minBill",
            periodTo: "maxBill"
          },
          sortBy: "minBill",
          refsName: {
            periodMin: "minBill",
            periodMax: "maxBill",
            score: "billsScore"
          }, 
          typeTemplate: 1,
          order: 10
        },
      ], 'order');
    }
  },
  methods: {},
  components: {
    appTreeFieldTemplate: TreeFieldTemplate,
    appTwoFieldTemplate: TwoFieldTemplate
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
  .maxSumScorCardBall {
    float: right;
    margin: 0 35px 35px 0;
    font-weight: bold;
    span {
      background: #F5F6FA;
      border: 1px solid #E7E7E7;
      border-radius: 5px;
      margin-left: 5px;
      padding: 14px 20px 14px 38px;
    }
  }

  .warning {
    clear: both;
    font-weight: bold;
    color: rgb(221, 19, 19);

  }
}
</style>
