<template>
<div class="creditConveyor">
  
  <router-view></router-view>

  <!-- Server error message -->
  <errorMessage></errorMessage>
</div>
</template>
<script>
import ErrorMessage from './ErrorMessage'

export default {
  name: "credit",
  computed: {
    error() {
      console.log('computed', this.$store.getters["credits/message"])
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
    errorMessage: ErrorMessage
  }
};
</script>
<style lang="scss" scoped>
  .creditMenu {
    margin: 15px;
  }

  .q-btn--rectangle {
    background: $blue;
    color: #fff;
    margin-right: 15px;
  }
  .ellipsis {
    font-size: 1rem
  }
</style>

<style>
  /* .subMenuCredit {
    border-radius: 3px;
  } */
</style>
