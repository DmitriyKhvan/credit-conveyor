<template>
  <div class="" style="max-width: auto">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="asoki" label="АСОКИ" />
        <q-tab name="gsz" label="ГСЗ" />
        <q-tab name="scoring" label="Скоринг" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="asoki" class="q-pa-none">

          <q-splitter
            v-model="splitterModel"
            style="height: auto"
          >

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal"
              >
                <q-tab name="innerContract" icon="mail" label="Contract" />
                <q-tab name="innerApplication" icon="alarm" label="Application" />
                <q-tab name="innerExpiration" icon="movie" label="Expiration" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="innerContract">
                  <appContract />
                </q-tab-panel>

                <q-tab-panel name="innerApplication">
                  <appApplication />
                </q-tab-panel>

                <q-tab-panel name="innerExpiration">
                  <appExpiration />
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="gsz">
          <appGSZ />
        </q-tab-panel>

        <q-tab-panel name="scoring">
          <appScoring />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import Scoring from './Scoring/Scoring'
import GSZ from './GSZ/listGSZ'
import Application from './ASOKI/Application'
import Contract from './ASOKI/Contract'
import Expiration from './ASOKI/Expiration'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      tab: 'asoki',
      innerTab: 'innerMails',
      splitterModel: 20
    }
  },
  components: {
    appScoring: Scoring,
    appGSZ: GSZ,
    appContract: Contract,
    appExpiration: Expiration,
    appApplication: Application,
  }
}
</script>
