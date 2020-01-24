import Vue from 'vue'

import './styles/quasar.sass'
import lang from 'quasar/lang/ru.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import { Quasar, Notify} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: { },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
    Notify
  },
  lang: lang
 })