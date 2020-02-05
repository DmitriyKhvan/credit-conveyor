<template>
  <q-header elevated style="background:linear-gradient(145deg,#FDFEFE 20%,#014a88 75%);">
    <q-toolbar>
      <q-toolbar-title>
        <q-img src="./../assets/statics/logo.svg" style="width:25px" class="titleLogo" />
        <span class="titleOrg">O'ZMILLIYBANK</span>
      </q-toolbar-title>

      <q-space />
      <span id="time" class="text-h4">00:00:00</span>
      <q-space />

      <q-avatar class="avatar1">
        <img :src="imageUrl + emps.emp_id" />
      </q-avatar>
      <span class="titleName">{{ emps.full_name }}</span>

      <q-btn class="icon-color" flat dense icon="o_notifications" size="16px">
        <q-badge color="red" floating transparent>12</q-badge>
      </q-btn>

      <q-btn class="icon-color" flat dense icon="o_email" size="16px">
        <q-badge color="red" floating transparent>4</q-badge>
      </q-btn>

      <q-btn flat class="icon-color" dense icon="exit_to_app" size="16px" @click="logout()" />
    </q-toolbar>
  </q-header>
</template>

<script>
import jwt from "jsonwebtoken";
import { AuthService } from "./../services/auth.service";
import TokenService from "./../services/storage.service";

export default {
  name: "Header",
  data() {
    return {
      imageUrl:
        "http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=",
      emps: jwt.decode(TokenService.getToken()),
      url2: "https://www.svgrepo.com/show/275245/man-profile.svg"
    };
  },
  methods: {
    logout() {
      AuthService.logout();
    }
  },
  beforeCreate: function() {
    let date = "";
    let h = "";
    let m = "";
    let s = "";
    setInterval(function() {
      (date = new Date()),
        (h = date.getHours()),
        (m = date.getMinutes()),
        (s = date.getSeconds()),
        (h = h < 10 ? "0" + h : h),
        (m = m < 10 ? "0" + m : m),
        (s = s < 10 ? "0" + s : s),
        (document.getElementById("time").innerHTML =
          h + ":" + m + ":" + '<span class="text-red">' + s + "</span>");
    }, 1000);
  }
};
</script>

<style lang="scss">
.titleLogo {
  position: relative;
  left: 5px;
}
.titleOrg {
  color: #093475;
  font-family: "Open Sans", sans-serif;
  line-height: 1.35;
  font-size: 21px;
  position: relative;
  left: 20px;
  top: 5px;
}
.avatar1 {
  position: relative;
  right: 60px;
}
.titleName {
  color: white;
  font-family: "Open Sans", sans-serif;
  line-height: 1.35;
  font-size: 16px;
  position: relative;
  right: 50px;
}
.icon-color {
  color: white;
}
</style>
