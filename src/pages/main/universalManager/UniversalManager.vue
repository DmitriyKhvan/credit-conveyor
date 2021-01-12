<template>
  <div class="universalMagerBlock q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-9">
        <form @submit.prevent.stop="onSubmit">
          <appSettingProcess @set-refs="setRefs" :title="titles[0]" />
          <appSettingScorModel @set-refs="setRefs" :title="titles[1]" />
          <appSettingScorBalls @set-refs="setRefs" :title="titles[2]" />
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
import { validItems, validFilter } from "@/shared/utils/valid_filter";

import SettingCreditProduct from "./Components/SettingCreditProduct";
import SettingCreditRoleActive from "./Components/SettingCreditRoleActive";
import SettingProcess from "./Components/SettingProcess";
import SettingScorBalls from "./Components/SettingScorBalls";
import SettingScorModel from "./Components/SettingScorModel";

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
  methods: {
    onSubmit() {
			this.$refs.moratory.validate()
      
      validFilter(this.$refs, "scoreСoefficientMinScoreValid", "scoreСoefficientMinScore")
      validFilter(this.$refs, "scoreСoefficientMaxScoreValid", "scoreСoefficientMaxScore")
      validFilter(this.$refs, "scoreСoefficientCoefficientValid", "scoreСoefficientCoefficient")
			if (
          this.$refs.moratory.hasError ||
          this.$refs.scoreСoefficientMinScoreValid.hasError ||
          this.$refs.scoreСoefficientMaxScoreValid.hasError ||
          this.$refs.scoreСoefficientCoefficientValid.hasError
        ) {
				this.formHasError = true;
				console.log('validationError')
			} else {
				console.log("submit")
			}
		},

		setRefs(refs) {
      this.$refs = Object.assign({}, this.$refs, refs);
      console.log("currentRefs", refs);
      console.log("AllRefs", this.$refs);
    },
  },
  components: {
    appSettingCreditProduct: SettingCreditProduct,
    appSettingCreditRoleActive: SettingCreditRoleActive,
    appSettingProcess: SettingProcess,
    appSettingScorBalls: SettingScorBalls,
    appSettingScorModel: SettingScorModel
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
