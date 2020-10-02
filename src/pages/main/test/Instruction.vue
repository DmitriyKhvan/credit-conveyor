<template>
    <div class="q-mx-lg q-mt-xl col column" >
        <top-panel :tabs="tabs"></top-panel>
        <div class="row no-wrap q-mt-lg">
            <left></left>
            <right-area :tabs="tabs"></right-area>
        </div>
    </div>
</template>
<script>
// import { mapState, mapGetters } from 'vuex'

import TopPanel from './components/TopPanel'
import Left from './components/LeftFilter'
import RightArea from './components/RightArea'

export default {
  components: {
    TopPanel,
    Left,
    RightArea
  },
  data () {
    return {
      isSearching: false,
      tabs: ['Все файлы', 'Документы', 'Видео файлы', 'Фото']
    }
  }
}
</script>
