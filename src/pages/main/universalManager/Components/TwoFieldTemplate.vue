<template>
  <div class="TwoFieldTemplate">
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">{{subTitleScor}}</div>
      <div class="col-2 text-right">Балл</div>
      <div class="col-1"></div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="item of sortItems"
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
        <q-btn flat round icon="close" @click="removeItem(index)"/>
      </div>
    </div>
    <div v-if="!fieldsSettings.scoreName.disable" class="btnBlock">
      <q-btn unelevated label="Добавить параметр" class="addItem" @click="addItem"/>
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
      obj[this.fieldsSettings.scoreName] = null
      obj.score = null

      this.items.push(obj)
    }
  }
};
</script>

<style lang="scss">
  .TwoFieldTemplate {
    margin-bottom: 30px;
  }
</style>
