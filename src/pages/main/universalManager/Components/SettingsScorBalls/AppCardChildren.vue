<template>
  <div>
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">Количество детей</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(children, index) of settings.app_card_children"
      :key="children.id"
    >
      <div class="col-8">
        <q-input
          ref="сhildrenNumber"
          outlined
          v-model="children.childrenNumber"
          dense
          mask="#"
          :rules="[val => integerValid(val)]"
        />
      </div>
      <div class="col-4">
        <q-input
          class="scoreBall"
          ref="childrenScore"
          outlined
          v-model="children.score"
          dense
          :rules="[val => floatValid(val)]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import creditSettings from '../../mixins/creditSettings'

export default {
  mixins: [creditSettings],
  mounted() {
    setTimeout(() => {
			this.$store.commit("creditSettings/setRefs", this.$refs)
		}, 100)
  }, 
};
</script>

<style></style>
