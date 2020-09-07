<template>
    <div>
       <q-tabs
          v-model="tab"
          no-caps
          class="text-grey q-mx-lg OpenSansBold"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="bustrip" label="Командировки" />
          <q-tab name="medlist" label="Больнияный лист" />
          <q-tab name="vaca" label="Отпуска" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab">
          <q-tab-panel name="bustrip">
            <businesstrip></businesstrip>
          </q-tab-panel>

          <q-tab-panel name="medlist">
            <medicallist></medicallist>
          </q-tab-panel>

          <q-tab-panel name="vaca">
            <vacations></vacations>
          </q-tab-panel>
          
        </q-tab-panels>
    </div>
</template>
<script>
import businesstrip from '../businesstrip'
import medicallist from '../medicallist'
import vacations from '../vacations'

export default {
    data() {
        return {
            tab: 'bustrip'
        }
    },
    components: {
        businesstrip,
        medicallist,
        vacations
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