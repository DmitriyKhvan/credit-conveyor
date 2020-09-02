<template>
  <div class="row">
    <right-block></right-block>
    <div class="col column q-my-lg q-mr-md">
      <div
        class="row justify-end"
        style="background-color: #EDF1FF; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249); border-radius: 5px;"
      >
        <div class="col column justify-center q-pa-lg Avant" style="color: #254EE6;">
          <div class="text-center" style="font-size: 20px">Мы рады вас видеть снова, {{cat(user)}}</div>
          <div class="text-center" style="font-size: 16px">
            <p>
              Вы закончили
              <span class="text-orange">12</span> задач в этом месяце!
            </p>
            <p>Продолжайте в том же духе!</p>
          </div>
        </div>
        <img src="~assets/proficon/top-cor.png" class="rounded-borders" />
      </div>
      <div class="bg-white rounded-borders q-mt-lg">
        <info v-if="menuId == 0"></info>
        <documents v-if="menuId == 1"></documents>
        <mywork v-if="menuId == 2"></mywork>
        <career v-if="menuId == 3"></career>
        <others v-if="menuId == 4"></others>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import RightBlock from "../components/Left";

import info from "./components/pMenu/info";
import documents from "./components/pMenu/documents";
import mywork from "./components/pMenu/myWork";
import career from "./components/pMenu/career";
import others from "./components/pMenu/others";

export default {
  name: "MyData",
  components: {
    RightBlock,
    info,
    documents,
    mywork,
    career,
    others
  },
  data() {
    return {};
  },
  computed: {
    menuId() {
      return this.$store.getters.getMenuId;
    },
    ...mapGetters({
      user: "auth/fullName"
    })
  },
  methods: {
    cat(e) {
      if (e.length > 0) {
        let a = this.user.split(" ");
        return a[0];
      }
      return a;
    }
  }
};
</script>
<style scoped>
@font-face {
  font-family: "Avant";
  src: url("~assets/fonts/avant.ttf") format("truetype");
}
@font-face {
  font-family: "OpenSansBold";
  src: url("~assets/fonts/OpenSans-Bold.ttf") format("truetype");
}
.OpenSansBold {
  font-family: "OpenSansBold";
  font-weight: 500;
}
.Avant {
  font-family: "Avant";
}
.sscroller {
  position: fixed;
  top: 20px;
  bottom: 20px;
}
</style>
