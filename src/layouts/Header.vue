<template>
  <q-header elevated style="background:linear-gradient(145deg,#FDFEFE 20%,#014a88 75%);">
    <q-toolbar>
      <q-toolbar-title>
        <q-img src="./../assets/statics/logo.svg" style="width:25px" class="titleLogo" />
        <span class="titleOrg">O'ZMILLIYBANK</span>
      </q-toolbar-title>

      <q-space />
      <!-- <span id="time" class="text-h4">00:00:00</span> -->
      <div id="clock">
        <!-- <p class="date">{{ date }}</p> -->
        <p class="time">{{ time }}</p>
      </div>
      <q-space />

      <q-avatar class="avatar1">
        <img :src="getPhotoUrl(empId)" />
      </q-avatar>
      <span class="titleName">{{ fullName}}</span>

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
import { AuthService } from "./../services/auth.service";
import { date } from "quasar";
import UserService from "../services/user.service";

export default {
  name: "Header",
  data() {
    return {
      time: "",
      date: "",
      fullName: this.$store.getters["auth/fullName"],
      empId: this.$store.getters["auth/empId"]
    };
  },
  created() {
    setInterval(() => {
      let cd = new Date();
      // get current time
      let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      // get time
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      // get current date
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    }, 1000);
  },
  computed: {},
  methods: {
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    logout() {
      AuthService.logout();
      console.log("logged out");
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    }
  },
  watch: {
    time: function(newq, oldq) {},
    date: function(newq, oldq) {}
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

#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;
  .time {
    font-size: 20px;
    margin: 10%;
  }
  .date {
    font-size: 10px;
  }
}
</style>
