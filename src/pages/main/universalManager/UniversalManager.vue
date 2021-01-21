<template>
  <div class="universalMagerBlock q-pa-md">
    <appLoaderFullScreen v-if="loader" />
    <!-- <appLoader v-if="loader" /> -->
    <div v-else class="row q-col-gutter-md">
      <div class="col-9">
        <form @submit.prevent.stop="onSubmit">
          <appSettingsProcess v-if="settingsProcess" :title="settingsProcess" />
          <appSettingsScorModel v-if="settingsScorModel" :title="settingsScorModel" />
          <appSettingsScorBalls v-if="settingsScorBalls" :title="settingsScorBalls" />
          <appSettingsCreditRoleActive v-if="settingsCreditRoleActive" :title="settingsCreditRoleActive" />
          <appSettingsCreditProduct v-if="settingsCreditProduct" :title="settingsCreditProduct" />
          <div class="submitBtn">
            <q-btn unelevated type="submit" label="Сохранить" class="btnSucces" />
          </div>
        </form>
      </div>
      <div class="col-3">
        <ul class="navMenu">
          <li v-for="(title, index) of titles" :key="title.id">
            <a 
              :class="index == 0 ? 'active' : ''" 
              :href="title.id" 
              @click.prevent.stop="goToBlock"
            >
              {{title.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { validItems, validFilter } from "@/shared/utils/valid_filter";

import creditSettings from "./mixins/creditSettings";

import SettingsCreditProduct from "./Components/SettingsCreditProduct";
import SettingsCreditRoleActive from "./Components/SettingsCreditRoleActive";
import SettingsProcess from "./Components/SettingsProcess";
import SettingsScorBalls from "./Components/SettingsScorBalls";
import SettingsScorModel from "./Components/SettingsScorModel";
import MessagePopup from "./Components/MessagePopup"
import LoaderFullScreen from "@/components/LoaderFullScreen"
// import Loader from "@/components/Loader"

export default {
  mixins: [creditSettings],
  data() {
    return {
      // titles: [
      //   "Настройка процесса",
      //   "Настройка скоринговой модели",
      //   "Настройка баллов скоркарты",
      //   "Участие роли в кредитном конвейeре",
      //   "Настройка кредитных продуктов"
      // ],
      titles: [
        {
          name: "Настройка процесса",
          id: "settingsProcess",
          disable: false
        },
        {
          name: "Настройка скоринговой модели",
          id: "settingsScorModel",
          disable: false
        },
        {
          name: "Настройка баллов скоркарты",
          id: "settingsScorBalls",
          disable: false
        },
        {
          name: "Участие роли в кредитном конвейeре",
          id: "settingsCreditRoleActive",
          disable: false
        },
        {
          name: "Настройка кредитных продуктов",
          id: "settingsCreditProduct",
          disable: false
        }
      ].filter(i => i.disable == false),
      loader: true
    };
  },
  async created() {
    this.loader = true
    try {
      const settings = await this.$store.dispatch("creditSettings/getSettings")
      this.loader = false
    } catch (error) {
      console.log(error)
      this.loader = false
    }
  },
  mounted() {
    setTimeout(() => {
      document
          .querySelectorAll(".scroll")[1]
          .addEventListener("scroll", this.handleScroll);
    }, 1000)
  },
  beforeDestroy() {
    if(!!document.querySelectorAll(".scroll")[1]) {
      document
        .querySelectorAll(".scroll")[1]
        .removeEventListener("scroll", this.handleScroll);
    }
  },
  computed: {
    settingsProcess() {
      return this.titles.find(i => i.id == 'settingsProcess' && i.disable == false)
    },
    settingsScorBalls() {
      return this.titles.find(i => i.id == 'settingsScorBalls' && i.disable == false)
    },
    settingsScorModel() {
      return this.titles.find(i => i.id == 'settingsScorModel' && i.disable == false)
    },
    settingsCreditRoleActive() {
      return this.titles.find(i => i.id == 'settingsCreditRoleActive' && i.disable == false)
    },
    settingsCreditProduct() {
      return this.titles.find(i => i.id == 'settingsCreditProduct' && i.disable == false)
    }
    
  },
  methods: {
    async onSubmit() {
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

      // loan product char
      if (this.creditSettings.loanProductId) {
        this.refs.loanProductCharProductId.validate()
        this.refs.loanProductCharMaxSum.validate()
        this.refs.loanProductCharMinTerm.validate()
        this.refs.loanProductCharMaxTerm.validate()
        this.refs.loanProductCharGracePeriodMin.validate()
        this.refs.loanProductCharGracePeriodMax.validate()
        this.refs.loanProductCharInterestRateMax.validate()
        this.refs.loanProductCharExpiredInterestRateMax.validate()
        this.refs.loanProductCharFirstPayPercentMin.validate()
        this.refs.loanProductCharFirstPayPercentMax.validate()
      } else {
        validItems(this.refs, "loanProductCharProductId");
        validItems(this.refs, "loanProductCharMaxSum");
        validItems(this.refs, "loanProductCharMinTerm");
        validItems(this.refs, "loanProductCharMaxTerm");
        validItems(this.refs, "loanProductCharGracePeriodMin");
        validItems(this.refs, "loanProductCharGracePeriodMax");
        validItems(this.refs, "loanProductCharInterestRateMax");
        validItems(this.refs, "loanProductCharExpiredInterestRateMax");
        validItems(this.refs, "loanProductCharFirstPayPercentMin");
        validItems(this.refs, "loanProductCharFirstPayPercentMax");
      }
      
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
          this.refs.childrenScoreValid.hasError ||

          // loan product char
          this.refs.loanProductCharProductId.hasError ||
          this.refs.loanProductCharMaxSum.hasError ||
          this.refs.loanProductCharMinTerm.hasError ||
          this.refs.loanProductCharMaxTerm.hasError ||
          this.refs.loanProductCharGracePeriodMin.hasError ||
          this.refs.loanProductCharGracePeriodMax.hasError ||
          this.refs.loanProductCharInterestRateMax.hasError ||
          this.refs.loanProductCharExpiredInterestRateMax.hasError ||
          this.refs.loanProductCharFirstPayPercentMin.hasError ||
          this.refs.loanProductCharFirstPayPercentMax.hasError
        ) {
				this.formHasError = true;
        console.log('validationError')
        this.$q.dialog({
          component: MessagePopup,
          parent: this,
          data: {
            message: "Некорректные данные.",
            code: 99
          }
          // persistent: true
        })
			} else {
        console.log("submit")
        // console.log(JSON.stringify(this.settings, null, 2))
        try {
          const responce = await this.$store.dispatch("creditSettings/updateSettings", this.settings)

          this.$q.dialog({
            component: MessagePopup,
            parent: this,
            data: {
              message: responce.message,
              code: responce.code
            }
            // persistent: true
          })
        } catch(error) {
          this.$q.dialog({
            component: MessagePopup,
            parent: this,
            data: {
              message: error.message,
              code: error.code
            }
            // persistent: true
          })
        }
			}
		},
    goToBlock(event) {
      // event.preventDefault()
      console.log(event.target)
      let link = event.target.getAttribute("href")
      document.getElementById(link).scrollIntoView({ behavior: "smooth", block: "start" })
    },

    handleScroll(event) {
      let scrollTop = event.target.scrollTop;

      document.querySelectorAll(".navMenu a").forEach(node => {
        let selector = node.getAttribute("href");
        // debugger
        let blockTop = document.getElementById(selector).offsetTop - 100;
        
        let blockBottom =
          document.getElementById(selector).offsetTop +
          document.getElementById(selector).getBoundingClientRect().height;

        if (scrollTop >= blockTop && scrollTop <= blockBottom) {
          document
            .querySelector(".navMenu a.active")
            .classList.remove("active");
          node.classList.add("active");
        }
      });
    },
  },
  components: {
    appSettingsCreditProduct: SettingsCreditProduct,
    appSettingsCreditRoleActive: SettingsCreditRoleActive,
    appSettingsProcess: SettingsProcess,
    appSettingsScorBalls: SettingsScorBalls,
    appSettingsScorModel: SettingsScorModel,
    appLoaderFullScreen: LoaderFullScreen,
    // appLoader: Loader,
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

  .submitBtn {
    display: flex;
    justify-content: center;

    button {
    background: #47B881;

    .q-btn__content {
      width: 227px;
      height: 47px;
      font-size: 14px;
      color: #fff
    }
  }
  }

  .navMenu {
    position: fixed;
    margin: 0;
    padding-left: 14px;
    li {
      list-style: none;
      margin: 7px 0;
      a {
        display: block;
        text-decoration: none;
        color: #999a9b;
        padding: 5px 10px;
        border-radius: 5px;

        &.active, &:hover {
          color: #1976d2;
          background: #e6f1fc;
        }
      }
    }
  }
}

.btnBlock {
  button {
    background: #4AB8FF;

    .q-btn__content {
      width: 350px;
      height: 47px;
      font-size: 14px;
      color: #fff
    }

    .q-btn__wrapper {
      padding: 0;
    }
  }
}

.removeItem {
    padding-left: 0;
    .q-btn .q-icon, .q-btn .q-spinner {
      font-size: 15px;
    }
  }

  .blueBtn .q-btn__content,  .redBtn .q-btn__content{
      width: 173px;
      height: 47px;
      font-size: 14px;
      color: #fff;
    }

    .blueBtn {
      background: #4AB8FF;
    }

    .redBtn {
      background: #FF4A4A;
      margin-left: 24px!important;
    }
</style>
