<template>
  <div>
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-8">
              <div class="row q-col-gutter-md titleScor">
                <div class="col-9">Возраст заемщика</div>
                <div class="col-3 text-right">Балл</div>
              </div>

              <div
                class="row q-col-gutter-md"
                v-for="(cardAge, index) of settings.app_card_age"
                :key="'score_coefficient' + index"
              >
                <div class="col-4">
                  <q-input
                    ref="cardAgeMinAge"
                    outlined
                    v-model="cardAge.minAge"
                    dense
                    label="от"
                    :rules="[
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="cardAgeMaxAge"
                    outlined
                    v-model="cardAge.maxAge"
                    dense
                    label="до"
                    :rules="[
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="cardAgeScore"
                    outlined
                    v-model="cardAge.score"
                    dense
                    :rules="[
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
                    ]"
                  />
                </div>
              </div>

							<div class="row q-col-gutter-md titleScor">
                <div class="col-9">Компания с рейтингом</div>
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
                    :rules="[
                      val => String(val).match(/^[A-Z]+$/) || 'Неверные данные'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="ratingCompanyScore"
                    outlined
                    v-model="ratingCompany.score"
                    dense
                    :rules="[
                      val => String(val).match(/^[0-9]+$/) || 'Неверные данные'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: ["title"],
  data() {
    return {
      expanded: true
    };
  },
  mounted() {
    this.$emit("set-refs", this.$refs);
  },
  computed: {
    ...mapState({
      settings: state => state.creditSettings.settings
    })
  }
};
</script>
<style lang="scss"></style>
