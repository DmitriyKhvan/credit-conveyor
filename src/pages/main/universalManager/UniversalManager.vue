<template>
  <div class="universalMagerBlock q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-9">
        <form @submit.prevent.stop="onSubmit">
          <!-- <appSettingsProcess :title="titles[0]" /> -->
          <appSettingsScorModel :title="titles[1]" />
          <appSettingsScorBalls :title="titles[2]" />
          <appSettingsCreditProduct :title="titles[4]" />
          <div class="btnBlock">
            <q-btn type="submit" label="Одобрить" class="btnSucces" />
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { validItems, validFilter } from "@/shared/utils/valid_filter";

import SettingsCreditProduct from "./Components/SettingsCreditProduct";
import SettingsCreditRoleActive from "./Components/SettingsCreditRoleActive";
import SettingsProcess from "./Components/SettingsProcess";
import SettingsScorBalls from "./Components/SettingsScorBalls";
import SettingsScorModel from "./Components/SettingsScorModel";

export default {
  data() {
    return {
      titles: [
        "Настройка процесса",
        "Настройка скоринговой модели",
        "Настройка баллов скоркарты",
        "Участие роли в кредитном конвейeре",
        "Настройка кредитных продуктов"
      ]
    };
  },
  async created() {
    try {
      const settings = await this.$store.dispatch("creditSettings/getSettings")
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    ...mapState({
      settings: state => state.creditSettings.settings,
      refs: state => state.creditSettings.allRefs
    })
  },
  methods: {
    onSubmit() {
			// this.refs.moratory.validate()
      
      validFilter(this.refs, "scoreСoefficientMinScoreValid", "scoreСoefficientMinScore")
      validFilter(this.refs, "scoreСoefficientMaxScoreValid", "scoreСoefficientMaxScore")
      validFilter(this.refs, "scoreСoefficientCoefficientValid", "scoreСoefficientCoefficient")

      validFilter(this.refs, "ageMinAgeValid", "ageMinAge")
      validFilter(this.refs, "ageMaxAgeValid", "ageMaxAge")
      validFilter(this.refs, "ageScoreValid", "ageScore")
      
      validFilter(this.refs, "ratingCompanyRatingValid", "ratingCompanyRating")
      validFilter(this.refs, "ratingCompanyScoreValid", "ratingCompanyScore")

      validFilter(this.refs, "childrenNumberValid", "childrenNumber")
      validFilter(this.refs, "childrenScoreValid", "childrenScore")

      validFilter(this.refs, "lastJobPeriodMinPeriodValid", "lastJobPeriodMinPeriod")
      validFilter(this.refs, "lastJobPeriodMaxPeriodValid", "lastJobPeriodMaxPeriod")
      validFilter(this.refs, "lastJobPeriodScoreValid", "lastJobPeriodScore")

      validFilter(this.refs, "loanPeriodMinPeriodValid", "loanPeriodMinPeriod")
      validFilter(this.refs, "loanPeriodMaxPeriodValid", "loanPeriodMaxPeriod")
      validFilter(this.refs, "loanPeriodScoreValid", "loanPeriodScore")

      validFilter(this.refs, "locationNameValid", "locationName")
      validFilter(this.refs, "locationScoreValid", "locationScore")


      validFilter(this.refs, "maritalStatusValid", "maritalStatus")
      validFilter(this.refs, "maritalScoreValid", "maritalScore")

      validFilter(this.refs, "positiveNbuHistoryValid", "positiveNbuHistory")
      validFilter(this.refs, "positiveNbuHistoryScoreValid", "positiveNbuHistoryScore")

      validFilter(this.refs, "ratingCompanyRatingValid", "ratingCompanyRating")
      validFilter(this.refs, "ratingCompanyScoreValid", "ratingCompanyScore")

      validFilter(this.refs, "hasRealityValid", "hasReality")
      validFilter(this.refs, "realityScoreValid", "realityScore")

      validFilter(this.refs, "hasVehicleValid", "hasVehicle")
      validFilter(this.refs, "vehicleScoreValid", "vehicleScore")

      validFilter(this.refs, "minBillValid", "minBill")
      validFilter(this.refs, "maxBillValid", "maxBill")
      validFilter(this.refs, "billsScoreValid", "billsScore")
			if (
          // this.refs.moratory.hasError ||

          this.refs.scoreСoefficientMinScoreValid.hasError ||
          this.refs.scoreСoefficientMaxScoreValid.hasError ||
          this.refs.scoreСoefficientCoefficientValid.hasError ||
          
          this.refs.ageMinAgeValid.hasError ||
          this.refs.ageMaxAgeValid.hasError ||
          this.refs.ageScoreValid.hasError ||

          this.refs.ratingCompanyRatingValid.hasError ||
          this.refs.ratingCompanyScoreValid.hasError ||

          this.refs.lastJobPeriodMinPeriodValid.hasError ||
          this.refs.lastJobPeriodMaxPeriodValid.hasError ||
          this.refs.lastJobPeriodScoreValid.hasError ||

          this.refs.loanPeriodMinPeriodValid.hasError ||
          this.refs.loanPeriodMaxPeriodValid.hasError ||
          this.refs.loanPeriodScoreValid.hasError ||
          
          this.refs.locationNameValid.hasError ||
          this.refs.locationScoreValid.hasError ||

          this.refs.maritalStatusValid.hasError ||
          this.refs.maritalScoreValid.hasError ||

          this.refs.positiveNbuHistoryValid.hasError ||
          this.refs.positiveNbuHistoryScoreValid.hasError ||

          this.refs.ratingCompanyRatingValid.hasError ||
          this.refs.ratingCompanyScoreValid.hasError ||

          this.refs.hasRealityValid.hasError ||
          this.refs.realityScoreValid.hasError ||

          this.refs.hasVehicleValid.hasError ||
          this.refs.vehicleScoreValid.hasError ||

          this.refs.minBillValid.hasError ||
          this.refs.maxBillValid.hasError ||
          this.refs.billsScoreValid.hasError ||

          this.refs.childrenNumberValid.hasError ||
          this.refs.childrenScoreValid.hasError 
        ) {
				this.formHasError = true;
				console.log('validationError')
			} else {
        console.log("submit")
        // console.log(JSON.stringify(this.settings, null, 2))
			}
		},

		// setRefs(refs) {
    //   this.$refs = Object.assign({}, this.$refs, refs);
    //   console.log("currentRefs", refs);
    //   console.log("AllRefs", this.$refs);
    // },
  },
  components: {
    appSettingsCreditProduct: SettingsCreditProduct,
    appSettingsCreditRoleActive: SettingsCreditRoleActive,
    appSettingsProcess: SettingsProcess,
    appSettingsScorBalls: SettingsScorBalls,
    appSettingsScorModel: SettingsScorModel
  }
};
</script>
<style lang="scss">
.universalMagerBlock {
  .settingBlock {
    margin-bottom: 30px;
    background: #fff;
    box-shadow: 0px 3px 7px #ddd;

    .headerBlock {
      font-size: 24px;
      font-weight: bold;
      box-shadow: 0px 3px 7px #ddd;
      color: #282d30;
      margin-bottom: 7px;
    }

    .contentBlock {
      .titleSetting {
        margin: 0 0 15px 0;
        font-size: 20px;
      }
    }
  }

  .btnSucces {
		display: flex;
		justify-content: center;
		justify-items: center;
  }

  .q-field__bottom {
    padding: 0 12px;
  }
}
</style>
