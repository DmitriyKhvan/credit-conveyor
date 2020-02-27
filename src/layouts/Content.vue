<template>
  <div>
    <q-page-container>
      <q-toolbar style="display: block;">
        <q-breadcrumbs active-color="black" style="font-size: 16px">
          <q-breadcrumbs-el label="Home" icon="home" />
          <q-breadcrumbs-el label="Components" icon="widgets" />
          <q-breadcrumbs-el label="Toolbar" />
        </q-breadcrumbs>
      </q-toolbar>
      <router-view />
    </q-page-container>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      data: null
    };
  }
};
</script>

<style></style>
