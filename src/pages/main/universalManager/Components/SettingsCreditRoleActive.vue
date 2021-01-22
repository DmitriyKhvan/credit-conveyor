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
          <div class="row rowRole">
            <div class="col-6">
              <p>Юрист</p>
            </div>
            <div class="col-6">
              <q-toggle
                class="customeToggle"
                :false-value="false"
                :label="options[blueModel]"
                :true-value="true"
                v-model="blueModel"
              />
            </div>
          </div>

          <div class="row rowRole">
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
          </div>
          
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
      blueModel: true,
      blueModel2: true,
      options: {
        true: 'Вкл',
        false: 'Выкл'
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
