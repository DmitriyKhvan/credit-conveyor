import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';
//import quasarStyle from '../../node_modules/quasar/dist/quasar.css';

const options = {
    name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes'
    ],
    styles: [
      '../../node_modules/quasar/dist/quasar.css'
    ]
  }


Vue.use(VueHtmlToPaper, options)