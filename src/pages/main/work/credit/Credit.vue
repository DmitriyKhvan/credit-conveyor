<template>
<div class="creditConveyor">
  
  <router-view></router-view>

  <!-- Server error message -->
  <errorMessage />
  <!-- <appListGSZ /> -->
</div>
</template>
<script>
import ErrorMessage from './Components/ErrorMessage'
import listGSZ from './Components/GSZ/listGSZ'

export default {
  name: "credit",
  created() {
    this.$store.commit("credits/resetMessageBar")
  },
  computed: {
    error() {
      return this.$store.getters["credits/messageId"]
    }
  },
  watch: {
    error(serverError) {   
      this.$store.commit("credits/toggleMessageBar", true)
      console.log('watch', this.$store.getters["credits/messageBar"])
    }
  },

  components: {
    errorMessage: ErrorMessage,
    appListGSZ: listGSZ
  }
};
</script>
<style lang="scss">
  .creditConveyor {
    background: #fff;
    .creditMenu {
      margin: 15px;
    }

    .q-btn--rectangle {
      background: $blue;
      color: #fff;
      margin-right: 15px;
    }
    .ellipsis {
      // font-size: 1rem
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
