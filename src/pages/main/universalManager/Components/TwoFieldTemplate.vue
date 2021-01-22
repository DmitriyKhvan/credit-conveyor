<template>
  <div class="TwoFieldTemplate">
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">{{subTitleScor}}</div>
      <div class="col-2 text-right">Балл</div>
      <div class="col-1"></div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(item, index) of sortItems"
      :key="item.id"
    >
      <div class="col-8">
        <q-input
          :ref="refsName.scoreName"
          :disable="fieldsSettings.scoreName.disable"
          outlined
          v-model="item[fieldsSettings.scoreName.name]"
          dense
          :mask="mask"
          :rules="[val => validFunc(val)]"
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
      <div v-if="!fieldsSettings.scoreName.disable" class="col-1 removeItem">
        <q-btn flat round icon="close" @click="removeItem(index)">
          <q-tooltip>Удалить</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div v-if="!fieldsSettings.scoreName.disable" class="btnBlockAdmin">
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
    },
    mask: {
      type: String, 
      default: ""
    }, 
    validFunc: {
      type: Function, 
      default(val) {
        return !!val || 'Введите данные'
      }
    }
  },
  mixins: [creditSettings],
  data() {
    return {
      // sortItems: sortData(this.settings[this.tableName], this.sortBy)
    }
  },
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
    }, 3000)

    // this.settings[this.tableName] = sortData(this.settings[this.tableName], this.sortBy)
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
      obj[this.fieldsSettings.scoreName.name] = null
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
  .TwoFieldTemplate {
    margin-bottom: 30px;
  }
</style>
