<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log("App is created: ");
    console.log(process.env);
  }
};
</script>
