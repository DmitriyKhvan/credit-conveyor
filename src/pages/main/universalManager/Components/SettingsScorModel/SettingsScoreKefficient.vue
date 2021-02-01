<template>
  <div>
    <h4 class="titleSetting">Коэффициент корректировки</h4>
    <div class="row q-col-gutter-md">
      <div class="col-9">
        <div class="row q-col-gutter-md titleScor">
          <div class="col-3">Класс кредитоспособности</div>
          <div class="col-6">Диапазон баллов</div>
          <div class="col-2 text-right">Коэффицент корректировки</div>
          <div class="col-1"></div>
        </div>

        <div
          class="row q-col-gutter-md"
          v-for="(scoreСoefficient, index) of settings.APPCARD_SCOREKOEFFICIENT"
          :key="scoreСoefficient.id"
        >
          <div class="col-3">
            <q-input
              :disable="scoreСoefficient.id ? true : false"
              ref="scoreСoefficientСlass"
              outlined
              v-model="scoreСoefficient.class"
              dense
              mask="A"
              :rules="[val => !!val || 'Введите данные']"
            />
          </div>
          <div class="col-3">
            <q-input
              ref="scoreСoefficientMinScore"
              outlined
              v-model="scoreСoefficient.minScore"
              dense
              :rules="[val => floatValid(val)]"
            />
          </div>
          <div class="col-3">
            <q-input
              ref="scoreСoefficientMaxScore"
              outlined
              v-model="scoreСoefficient.maxScore"
              dense
              :rules="[val => floatValid(val)]"
            />
          </div>
          <div class="col-2 text-right">
            <q-input
              class="scoreСoefficient"
              ref="scoreСoefficientCoefficient"
              outlined
              v-model="scoreСoefficient.coefficient"
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
          <q-btn
            unelevated
            label="Добавить параметр"
            class="addItem"
            @click="addItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import creditSettings from "../../mixins/creditSettings";
import AlertMessage from '../../Components/AlertMessage'

export default {
  mixins: [creditSettings],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 3000);
  },
  computed: {},
  methods: {
    addItem() {
      this.settings.APPCARD_SCOREKOEFFICIENT.push({
        id: null,
        class: "",
        coefficient: null,
        minScore: null,
        maxScore: null
      })
    },

    removeItem(idx) {
      
      const rowId = this.settings.APPCARD_SCOREKOEFFICIENT[idx].id
      if (rowId) {
        this.$q.dialog({
          component: AlertMessage,
          parent: this,
          data: {
            tableName: 'APPCARD_SCOREKOEFFICIENT',
            rowId
          }
        })
      } else {
        this.settings.APPCARD_SCOREKOEFFICIENT.splice(idx, 1)
      }
    }
  }
};
</script>
<style lang="scss"></style>
