<template>
  <div class="settingsCreditRoleActive" :id="title.id">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section> 
          <div 
            v-for="role of settings.APPSETTING_ROLE" 
            :key="role.id"
            class="row rowRole"
          >
            <div class="col-6">
              <p>{{ roleName[role.roleName] }}</p>
            </div>
            <div class="col-6">
              <q-toggle
                class="customeToggle"
                :false-value=0
                :label="options[role.applied]"
                :true-value=1
                v-model="role.applied"
              />
            </div>
          </div>

          <!-- <div class="row rowRole">
            <div class="col-6">
              <p>Начальник кредитного комитета</p>
            </div>
            <div class="col-6">
              <q-toggle
                class="customeToggle"
                :false-value="false"
                :label="options[blueModel2]"
                :true-value="true"
                v-model="blueModel2"
              />
            </div>
          </div> -->
          
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

import creditSettings from "../mixins/creditSettings"

export default {
  mixins: [creditSettings],
  data() {
    return {
      options: {
        1: 'Вкл',
        0: 'Выкл'
      },
      
      roleName: {
        ROLE_UrWr: "Андерайтер",
        ROLE_KM: "Кредитный менеджер",
        ROLE_CCC: "Начальник кредитного комитета",
        ROLE_CC: "Кредитный комитет",
        ROLE_LEGAL: "Юрист"
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 3000)
  },
  computed: {}
};
</script>
<style lang="scss">
  .settingsCreditRoleActive {
    .rowRole {
      padding: 10px 0;
      margin: 0 25px;
      border-bottom: 1px solid #E7E7E7;

      & > div {
        display: flex;
        align-items: center;
      }

      &:last-child {
        border: none;
      }
    }
  }
</style>
