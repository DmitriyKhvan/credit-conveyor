<template>
  <div>
    <q-btn @click="getFormat()">get</q-btn>
    <br />

    <div>
      <q-card class="my-card">
        <q-card-section>
          {{ drawerState }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    drawerState: {
      get() {
        return this.$store.state.example.formats;
      },
      set(val) {
        this.$store.commit("example/updateFormat", val);
      }
    }
  },
  data() {
    return {
      test: null
    };
  },
  methods: {
    test1(val) {
      this.drawerState = val;
    },
    getAct() {
      this.$store.dispatch("example/getFormat");
    },
    ...mapActions({
      getFormat: "example/getFormat"
    })
  }
};
</script>

<style></style>
