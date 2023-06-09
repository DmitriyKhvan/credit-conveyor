import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/assets/i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru',
  //formatter: new CustomFormatter(/* here the constructor options */),
  fallbackLocale: 'ru',
  silentFallbackWarn: true,
  messages
})

export default ({
  app
}) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export {
  i18n
};
