<template>
  <div class="TreeFieldTemplate">
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">{{subTitleScor}}</div>
      <div class="col-2 text-right">Балл</div>
      <div class="col-1"></div>
    </div>
    <!-- :key="refsName.score + index" -->
    <div
      class="row q-col-gutter-md"
      v-for="(item, index) of sortItems"
      :key="item.id"
    >
      <div class="col-4">
        <q-input
          :ref="refsName.periodMin"
          outlined
          v-model="item[fieldsSettings.periodFrom]"
          dense
          label="от"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          :ref="refsName.periodMax"
          outlined
          v-model="item[fieldsSettings.periodTo]"
          dense
          label="до"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-3">
        <q-input
          class="scoreBall"
          :ref="refsName.score"
          outlined
          v-model="item.score"
          dense
          :rules="[val => floatValid(val)]"
        />
      </div>
      <div class="col-1 removeItem">
        <q-btn flat round icon="close" @click="removeItem(index)">
          <q-tooltip>Удалить</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="btnBlockAdmin">
      <q-btn unelevated label="Добавить параметр" class="addItem" @click="addItem"/>
    </div>
  </div>
</template>

<script>
import creditSettings from '../mixins/creditSettings'

import AlertMessage from '../Components/AlertMessage'

// import sortData from '../filters/sortData'

export default {
  props: {
    subTitleScor: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    tableName: {
      type: String,
      default: ""
    },
    fieldsSettings: {
      type: Object,
      default() {
        return {}
      }
    },
    sortBy: {
      type: String,
      default: ""
    },
    refsName: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mixins: [creditSettings],
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 3000)
  }, 
	computed: {
    sortItems() {
      // return this.sortData(this.settings[this.tableName], this.sortBy)
      return this.sortData(this.settings[this.tableName], "")
    }
  }, 
  methods: {
    addItem() {
      const obj = {}
      obj.id = null
      obj[this.fieldsSettings.periodFrom] = null
      obj[this.fieldsSettings.periodTo] = null
      obj.score = null

      this.settings[this.tableName].push(obj)
    },

    removeItem(idx) {
      const rowId = this.settings[this.tableName][idx].id
      if (rowId) {
        this.$q.dialog({
          component: AlertMessage,
          parent: this,
          data: {
            tableName: this.tableName,
            rowId
          }
          // persistent: true
        })
      } else {
        this.settings[this.tableName].splice(idx, 1)
      }
    }
  }
};
</script>

<style lang="scss">
  .TreeFieldTemplate {
    margin-bottom: 30px;
  }
</style>
