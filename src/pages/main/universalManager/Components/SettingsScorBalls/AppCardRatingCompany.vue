<template>
  <div>
    <div class="row q-col-gutter-md titleScor">
      <div class="col-9 subTitleScor">Компания с рейтингом</div>
      <div class="col-3 text-right">Балл</div>
    </div>

    <div
      class="row q-col-gutter-md"
      v-for="(ratingCompany, index) of settings.app_card_rating_company"
      :key="ratingCompany.id"
    >
      <div class="col-8">
        <q-input
          ref="ratingCompanyRating"
          outlined
          v-model="ratingCompany.rating"
          dense
          mask="A"
          :rules="[val => !!val || 'Введите данные']"
        />
      </div>
      <div class="col-4">
        <q-input
          class="scoreBall"
          ref="ratingCompanyScore"
          outlined
          v-model="ratingCompany.score"
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
