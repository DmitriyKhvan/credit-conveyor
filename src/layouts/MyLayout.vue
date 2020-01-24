<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="250"
    >
      <q-list>
        <q-item-label header>Меню по доступу</q-item-label>
        <div v-for="(menus, index) in menu" :key="index">
          <q-expansion-item
            expand-separator
            :icon="menus.icon"
            :label="menus.name"
            caption="Описание"
            group="somegroup"
            :to="menus.url"
            exact-active-class="icon-style"
          >
            <div
              v-for="(menuss, index) in menus.children"
              :key="index"
              style="background-color:#D6DBDF;"
            >
              <q-item clickable :to="menuss.url">
                <q-item-section avatar>
                  <q-icon :name="menuss.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ menuss.name }}</q-item-label>
                  <q-item-label caption>Описание</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <s-content />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "MyLayout",
  components: {
    SContent: () => import("pages/Index.vue")
  },
  data() {
    return {
      leftDrawerOpen: false,
      menu: null
    };
  },
  beforeCreate: function() {
    //console.log(decoded)
    axios({
      method: "GET",
      url: "menus/list?lang=2",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    }).then(res => {
      this.menu = res.data[0].items;
      // eslint-disable-next-line
      //console.log(this.menu)
    });
  }
};
</script>
<style>
.icon-style {
  background-color: #aed6f1;
}
</style>
