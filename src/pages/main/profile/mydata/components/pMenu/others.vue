<template>
  <trips></trips>
</template>
<script>
import trips from '../trips'

export default {
    data() {
        return {
            tab: 'trips'
        }
    },
    components: {
        trips
    }
}
</script>
<style scoped>
  @font-face {
    font-family: 'Avant';
    src: url('~assets/fonts/avant.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansBold';
    src: url('~assets/fonts/OpenSans-Bold.ttf') format('truetype');
  }
  .OpenSansBold {
    font-family: 'OpenSansBold';
    font-weight: 500;
  }
  .Avant {
    font-family: 'Avant';
  }
</style>