<template>
<div class="creditConveyor">
  <!-- {{$route.fullPath + Math.random(1)}} -->
  <appSubHeader :path="path" />
  <router-view></router-view>

  <!-- Server error message -->
  <errorMessage />
  <!-- <appScoring /> -->
</div>
</template>
<script>
import SubHeader from '@/components/SubHeaderTab'
import ErrorMessage from './Components/ErrorMessage'
import Scoring from './Components/ClientInfo'

export default {
  name: "credit",
  created() {
    this.$store.commit("credits/resetMessageBar")
  },
  computed: {
    error() {
      return this.$store.getters["credits/messageBlock"].id
    },
    path() {
      //console.log(this.$route.path);
      return this.$route.path;
    }
  },
  watch: {
    error(serverError) {   
      this.$store.commit("credits/toggleMessageBar", true)
      console.log('watch', this.$store.getters["credits/messageBar"])
    }
  },

  components: {
    appSubHeader: SubHeader,
    errorMessage: ErrorMessage,
    appScoring: Scoring
  }
};
</script>
<style lang="scss">
  .creditConveyor {
    // background: #fff;
    .creditMenu {
      margin: 15px;
    }

    .q-btn--rectangle {
      background: $blue;
      color: #fff;
      // margin-right: 15px;
      margin: 0 7px;
    }
    .ellipsis {
      // font-size: 1rem
    }

    .queryDataBtn {
      background: #4AB8FF;
      margin: 0;

      .q-btn__content {
        padding: 7px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
  
  .loaderForm {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  .INPSblock {
    max-width: 90% !important;

    thead tr {
      text-align: center;
      background: #e8edff;
      color: #093475;
    }

    tr:nth-child(2n) {
      background: #e8edff;
    }

    .btnBlock {
      display: flex;
      justify-content: flex-end;
      margin: 15px 0;
    }
  }
</style>
