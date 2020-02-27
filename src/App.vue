<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    //console.log(this.$i18n.locale);
    // let menus = "JSON.stringify(store.getters['dicts/getMenuList']);";
    // let b64EncodedMenus = btoa(menus);
    // console.log(b64EncodedMenus);
    // console.log(atob(b64EncodedMenus));
    //menus = JSON.parse(Buffer.from(TokenService.getKey('menus'), 'base64').toString());
  }
};
</script>
