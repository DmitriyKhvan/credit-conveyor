<template>
  <div class="bg-white rounded-borders q-mt-lg q-mx-lg" >
    <q-tabs
        v-model="tab"
        no-caps
        class="text-grey-8 q-mx-lg OpenSansBold text-weight-bolder text-body1"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="pers" label="Персональные" />
        <q-tab name="auth" label="Авторизация" />
        <q-tab name="syst" label="Система" />
        <q-tab name="soci" label="Социальные сети" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
          <q-tab-panel name="pers">
              <s-personal></s-personal>
          </q-tab-panel>

          <q-tab-panel name="auth">
              <s-authorize></s-authorize>
          </q-tab-panel>

          <q-tab-panel name="syst">
              <s-system></s-system>
          </q-tab-panel>

          <q-tab-panel name="soci">
              <s-social></s-social>
          </q-tab-panel>

          
      </q-tab-panels>
  </div>
</template>
<script>
import personal from './subcomp/personal'
import authorize from './subcomp/authorize'
import system from './subcomp/system'
import social from './subcomp/social'

export default {
  data () {
    return {
      tab: 'pers'
    }
  },
  components: {
      sPersonal: personal,
      sAuthorize: authorize,
      sSystem: system,
      sSocial: social
  }
}
</script>
<style scoped>
@font-face {
    font-family: 'OpenSansXB';
    src: url('~assets/fonts/OpenSans-ExtraBold.ttf') format('truetype');
}
@font-face {
    font-family: 'OpenSansB';
    src: url('~assets/fonts/OpenSans-Bold.ttf') format('truetype');
}
@font-face {
    font-family: 'OpenSans';
    src: url('~assets/fonts/OpenSans-Regular.ttf') format('truetype');
}

.OpenSansXBold {
    font-family: 'OpenSansXB';
}
.OpenSansBold {
    font-family: 'OpenSansB';
}
.OpenSans {
    font-family: 'OpenSans';
}

</style>