<template>
  <div class="TwoFieldTemplate">
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">{{subTitleScor}}</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="item of sortItems"
      :key="item.id"
    >
      <div class="col-8">
        <q-input
          :ref="refsName.scoreName"
          outlined
          v-model="item[fieldsName.scoreName]"
          dense
          :mask="mask"
          :rules="[val => validFunc(val)]"
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
    fieldsName: {
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
      obj[this.fieldsName.scoreName] = null
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
