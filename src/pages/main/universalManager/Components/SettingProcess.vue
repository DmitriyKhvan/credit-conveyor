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
            <div class="col-4">
              <q-input
                ref="moratory"
                outlined
                v-model="moratory"
                dense
                label="Срок моратория по отказанным клиентам"
                :rules="[val => !!val || 'Введите данные']"
              />
            </div>

						<div class="col-4">
              <q-input
                ref="periodLifeApp"
                outlined
                v-model="moratory"
                dense
                label="Срок жизни заявки"
                :rules="[val => !!val || 'Введите данные']"
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

export default {
  props: ["title"],
  data() {
    return {
      expanded: true,
      moratory: null
    };
  },
  mounted() {
    // console.log('refs', this.$refs)
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
