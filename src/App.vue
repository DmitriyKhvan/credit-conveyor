<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { AuthService } from "@/services/auth.service";
export default {
  name: "App",
  onIdle() {
    if (this.isUserLogged) {
      AuthService.logout();
    }
  },
  onActive() {},
  created() {},
  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    },
    isUserLogged() {
      return this.$store.getters["auth/loggedIn"];
    }
  },
  methods: {}
};
</script>
