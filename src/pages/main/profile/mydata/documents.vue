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
          <q-tab name="passport" label="Мой паспорт" />
          <q-tab name="other_docs" label="Другие документы" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab">
          <q-tab-panel name="passport">
            <passport></passport>
          </q-tab-panel>

          <q-tab-panel name="other_docs">
            <otherdoc></otherdoc>
          </q-tab-panel>
          
        </q-tab-panels>
    </div>
</template>
<script>
import  passport  from './components/passport'
import  otherdoc  from './components/otherdoc'

export default {
    data() {
        return {
            tab: 'passport'
        }
    },
    components: {
      passport,
      otherdoc
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