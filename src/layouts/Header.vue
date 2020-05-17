<template>
  <q-header elevated style="background:linear-gradient(145deg,#FDFEFE 20%,#014a88 75%);">
    <q-toolbar>
      <q-toolbar-title>
        <q-img src="~assets/statics/logo.svg" style="width:25px" class="titleLogo" />
        <span class="titleOrg">O'ZMILLIYBANK</span>
      </q-toolbar-title>

      <q-space />
      <q-input
        color="purple-12"
        class="col-1"
        v-model="emp_id"
        v-on:keyup.enter="remoteAccess()"
        label="uid"
      />

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

      <q-btn
        class="icon-color"
        flat
        dense
        icon="o_notifications"
        size="16px"
        @click="showNotification()"
      >
        <q-badge v-if="count>0" color="red" floating transparent>{{count}}</q-badge>
        <q-menu>
          <q-list>
            <div v-for="(msg, index) in inbox" :key="index">
              <q-item>
                <q-item-section>
                  <q-item-label>{{ msg.title }}</q-item-label>
                  <q-item-label caption>{{ msg.body }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>{{formattedDate(msg.sent_at)}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
            </div>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn class="icon-color" flat dense icon="o_email" size="16px">
        <q-badge color="red" floating transparent>12</q-badge>
      </q-btn>

      <q-btn flat class="icon-color" dense icon="exit_to_app" size="16px" @click="logout()" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { AuthService } from "@/services/auth.service";
import UserService from "@/services/user.service";
import ApiService from "@/services/api.service";
import { mapGetters } from "vuex";
import commonUtils from "@/shared/utils/CommonUtils";
import NotifyService from "../services/notify.service";

export default {
  name: "Header",
  data() {
    return {
      time: "",
      date: "",
      emp_id: ""
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
  computed: {
    ...mapGetters({
      fullName: "auth/fullName"
    }),
    ...mapGetters({
      empId: "auth/empId"
    }),
    ...mapGetters({
      inbox: "dicts/receivedNotifications"
    }),
    ...mapGetters({
      count: "dicts/getCountNotifications"
    })
  },
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
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    },
    showNotification() {
      //console.log("notification clicked");
      this.$store.dispatch("dicts/setCountNotifications", 0);
      this.$store.getters["dicts/receivedNotifications"].forEach(element => {
        if (element.status == 0) {
          let statusModel = {
            id: element.id,
            status: 1
          };
          ApiService.post("chat/noty/status", statusModel)
            .then(
              _ => {},
              err => {
                console.log("error");
              }
            )
            .catch(error => {
              console.log("error");
            });
        }
      });
    },
    formattedDate(date) {
      return commonUtils.formattedDate(date);
    },
    remoteAccess() {
      if (this.emp_id) {
        AuthService.remoteLogin(this.emp_id, isSuccess => {
          if (isSuccess) {
            this.$router.go();
          } else {
            NotifyService.showErrorMessage("not found");
          }
        });
      } else {
        NotifyService.showErrorMessage("error input");
      }
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

.q-breadcrumbs__el a,
.q-breadcrumbs__separator i {
  color: #fff !important;
  text-decoration: none;
}
</style>
