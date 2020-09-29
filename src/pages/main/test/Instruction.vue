<template>
    <div class="q-mx-lg q-mt-xl col column" >
        <top-panel></top-panel>
        <div class="row no-wrap">
            all
        </div>
    </div>
</template>
<script>
import TopPanel from './components/TopPanel'

export default {
  components: {
    TopPanel
  },
  data () {
    return {
      isSearching: false
    }
  }
}
</script>
