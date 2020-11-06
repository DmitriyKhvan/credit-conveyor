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
          <q-tab name="contract" label="Контракт" />
          <q-tab name="work" label="Турдовая деятельность" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab">
          <q-tab-panel name="contract">
            <contract></contract>
          </q-tab-panel>

          <q-tab-panel name="work">
            <work></work>
          </q-tab-panel>
          
        </q-tab-panels>
    </div>
</template>
<script>
import contract from '../contract'
import work from '../work'

export default {
    data() {
        return {
            tab: 'contract'
        }
    },
    components: {
        contract,
        work
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