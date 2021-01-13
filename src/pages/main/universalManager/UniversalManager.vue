<template>
  <div class="universalMagerBlock q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-9">
        <form @submit.prevent.stop="onSubmit">
          <!-- <appSettingsProcess :title="titles[0]" /> -->
          <appSettingsScorModel :title="titles[1]" />
          <appSettingsScorBalls :title="titles[2]" />
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
      refs: state => state.creditSettings.allRefs
    })
  },
  methods: {
    onSubmit() {
			// this.refs.moratory.validate()
      
      validFilter(this.refs, "scoreСoefficientMinScoreValid", "scoreСoefficientMinScore")
      validFilter(this.refs, "scoreСoefficientMaxScoreValid", "scoreСoefficientMaxScore")
      validFilter(this.refs, "scoreСoefficientCoefficientValid", "scoreСoefficientCoefficient")

      validFilter(this.refs, "cardAgeMinAgeValid", "cardAgeMinAge")
      validFilter(this.refs, "cardAgeMaxAgeValid", "cardAgeMaxAge")
      validFilter(this.refs, "cardAgeScoreValid", "cardAgeScore")
      
      validFilter(this.refs, "ratingCompanyRatingValid", "ratingCompanyRating")
      validFilter(this.refs, "ratingCompanyScoreValid", "ratingCompanyScore")

      validFilter(this.refs, "сhildrenNumberValid", "сhildrenNumber")
      validFilter(this.refs, "childrenScoreValid", "childrenScore")
			if (
          // this.refs.moratory.hasError ||
          this.refs.scoreСoefficientMinScoreValid.hasError ||
          this.refs.scoreСoefficientMaxScoreValid.hasError ||
          this.refs.scoreСoefficientCoefficientValid.hasError ||
          
          this.refs.cardAgeMinAgeValid.hasError ||
          this.refs.cardAgeMaxAgeValid.hasError ||
          this.refs.cardAgeScoreValid.hasError ||

          this.refs.ratingCompanyRatingValid.hasError ||
          this.refs.ratingCompanyScoreValid.hasError ||

          this.refs.сhildrenNumberValid.hasError ||
          this.refs.childrenScoreValid.hasError 
        ) {
				this.formHasError = true;
				console.log('validationError')
			} else {
				console.log("submit")
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
