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
          <q-tab name="info" label="Мои данные" />
          <q-tab name="edu" label="Оброзование" />
          <q-tab name="relative" label="Родственники" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab">
          <q-tab-panel name="info">
              <my></my>
          </q-tab-panel>

          <q-tab-panel name="edu">
            <education></education>
          </q-tab-panel>

          <q-tab-panel name="relative">
            <relatives></relatives>
          </q-tab-panel>
        </q-tab-panels>
    </div>
</template>
<script>
import { component } from 'vuedraggable'
import my from './components/my'
import education from './components/education'
import relatives from './components/relatives'
export default {
    data () {
        return {
            tab: 'info'
        }
    },
    components: {
        my,
        education,
        relatives
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