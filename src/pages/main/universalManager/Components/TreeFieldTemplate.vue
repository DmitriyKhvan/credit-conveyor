<template>
  <div class="TreeFieldTemplate">
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">{{subTitleScor}}</div>
      <div class="col-3 text-right">Балл</div>
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
      <div class="col-4">
        <q-input
          class="scoreBall"
          :ref="refsName.score"
          outlined
          v-model="item.score"
          dense
          :rules="[val => floatValid(val)]"
        />
      </div>
    </div>
    <div class="btnBlock">
      <q-btn label="Добавить параметр" class="addItem" @click="addItem"/>
    </div>
  </div>
</template>

<script>
import creditSettings from '../mixins/creditSettings'
import sortData from '../filters/sortData'

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
		}, 100)
  }, 
	computed: {
    sortItems() {
      return sortData(this.items, this.sortBy)
    }
  }, 
  methods: {
    addItem() {
      const obj = {}
      obj.id = null
      obj[this.fieldsSettings.periodFrom] = null
      obj[this.fieldsSettings.periodTo] = null
      obj.score = null

      this.items.push(obj)
    }
  }
};
</script>

<style lang="scss">
  .TreeFieldTemplate {
    margin-bottom: 30px;
  }
</style>
