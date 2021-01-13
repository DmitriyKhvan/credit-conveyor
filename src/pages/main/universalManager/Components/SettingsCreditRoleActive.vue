<template>
  <div>
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section> </q-card-section>
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
