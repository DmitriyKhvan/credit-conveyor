<template>
  <div class="clientInfo">
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
        <!-- <q-tab name="gsz" label="ГСЗ" /> -->
        <q-tab name="scoring" label="Скоринг" />
        <q-tab name="deposits" label="Депозиты" />
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
                <q-tab name="innerContract" icon="mail" label="Договора" />
                <!-- <q-tab 
                  name="innerApplication" 
                  icon="alarm" 
                  label="Заявки" 
                /> -->
                <q-tab name="innerExpiration" icon="movie" label="Просрочки" />
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
                  <appContract 
                    :data="contracts" 
                    :status="StatusASOKI" 
                    :asokiExpenses="asokiExpenses"
                  />
                </q-tab-panel>

                <!-- <q-tab-panel name="innerApplication">
                  <appApplication :data="claims" :status="StatusASOKI" />
                </q-tab-panel> -->

                <q-tab-panel name="innerExpiration">
                  <appExpiration :data="overdue_payments" :status="StatusASOKI" />
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="gsz">
          <appGSZ :data="GRCInfo" :status="StatusGSZ" />
        </q-tab-panel>

        <q-tab-panel name="scoring">
          <appScoring 
            :data="scoring"
            :statusGSZ="StatusGSZ"
          />
        </q-tab-panel>

        <q-tab-panel name="deposits">
          <appDeposits :data="deposits" :status="StatusDeposits" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import Scoring from './Scoring/Scoring'
import Deposits from './Deposits'
import GSZ from './GSZ/listGSZ'
import Application from './ASOKI/Application'
import Contract from './ASOKI/Contract'
import Expiration from './ASOKI/Expiration'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    scoring: {
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
  created() {
    // console.log('data', JSON.stringify(this.data.output.find(i => i.name === 'asokiReport').data.claims_information.claims.items, null, 2))
    // console.log('data', JSON.stringify(this.scoring, null, 2))
  },
  computed: {
    ASOKI() {
      if (this.data.output.find(i => i.name === 'asokiReport')) {
        return this.data.output.find(i => i.name === 'asokiReport').data
      }

      return null
    },

    asokiExpenses() {
      if (this.data.output.find(i => i.name === 'asokiExpenses')) {
        return this.data.output.find(i => i.name === 'asokiExpenses').data.items
      }

      return []
    },

    claims() {
      if (this.ASOKI) {
        return this.ASOKI.claims_information.claims.items
      }

      return []
    },
    contracts() {
      if (this.ASOKI) {
        return this.ASOKI.contracts.contract.items
      } 

      return []
    },
    overdue_payments() {
      if (this.ASOKI) {
        return this.ASOKI.overdue_payments.overdue_contract.items
      }

      return []
    },

    // client() {
    //   if (this.ASOKI) {
    //     return this.ASOKI.client
    //   }
    // },

    GRCInfo() {
      if (this.data.output.find(i => i.name === 'GRCInfo')) {
        return this.data.output.find(i => i.name === 'GRCInfo').data.items
      }

      return []
    },

    deposits() {
      if (this.data.output.find(i => i.name === 'deposits')) {
        return this.data.output.find(i => i.name === 'deposits').data.items
      }

      return []
    },

    exceptions() {
      if (this.data.output.find(i => i.name === 'exceptions')) {
        return this.data.output.find(i => i.name === 'exceptions').data
      }

      return null
    },

    StatusASOKI() {
      if (this.exceptions) {
        return this.exceptions.items.find(i => i.name === 'ASOKI') 
                ? this.exceptions.items.find(i => i.name === 'ASOKI').value
                : ''
      } 

      return ''
    },

    StatusGSZ() {
      if (this.exceptions) {
        return this.exceptions.items.find(i => i.name === 'GSZ')
                ? this.exceptions.items.find(i => i.name === 'GSZ').value
                : ''
      } 

      return ''
    },

    StatusDeposits() {
      if (this.exceptions) {
        return this.exceptions.items.find(i => i.name === 'DEPOSITS')
                ? this.exceptions.items.find(i => i.name === 'DEPOSITS').value
                : ''
      } 

      return ''
    }
  }, 
  components: {
    appScoring: Scoring,
    appDeposits: Deposits,
    appGSZ: GSZ,
    appContract: Contract,
    appExpiration: Expiration,
    appApplication: Application,
  }
}
</script>

<style lang="scss">
  .clientInfo {
    max-width: auto;
    margin-bottom: 16px;

    .q-table--no-wrap th, .q-table--no-wrap td {
      white-space: normal;
    }

    .q-splitter--vertical > .q-splitter__panel {
      width: 130px !important;
    }

    .messageTitle {
      text-align: center;
    }
  }
</style>