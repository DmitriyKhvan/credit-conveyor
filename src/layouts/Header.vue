<template>
<div class="header">
  <!-- <q-header elevated style="background:linear-gradient(145deg,#FDFEFE 20%,#014a88 75%);"> -->
  <q-header elevated :style="'background:' + themes.headerColor">
    <q-toolbar>
      <div class="header__parts">
      <bread-crumb :list="list()" />
      <!-- <q-space />
      <q-input
        color="purple-12"
        class="col-1"
        v-model="emp_id"
        v-on:keyup.enter="remoteAccess()"
        label="uid"
      />

      <q-space /> -->
      <!-- <span id="time" class="text-h4">00:00:00</span> -->
      <div id="clock">
        
        <p class="time">{{ time }},&nbsp;</p>
        <p class="date"> {{ date }}</p>
      </div>

      <div class="avatar__block">
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
      </div>
      </div>
    </q-toolbar>
  </q-header>
  </div>
</template>

<script>
import { AuthService } from "@/services/auth.service";
import UserService from "@/services/user.service";
import ApiService from "@/services/api.service";
import { mapGetters } from "vuex";
import commonUtils from "@/shared/utils/CommonUtils";
import NotifyService from "../services/notify.service";
import BreadCrumb from "@/components/BreadCrumb";

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
      // let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      let week = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
      let month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",];
      // get time
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      // get current date
      // this.date =
      //   this.zeroPadding(cd.getFullYear(), 4) +
      //   "-" +
      //   this.zeroPadding(cd.getMonth() + 1, 2) +
      //   "-" +
      //   this.zeroPadding(cd.getDate(), 2) +
      //   " " +
      //   week[cd.getDay()];

      this.date =
        week[cd.getDay()] + 
        " " +
        this.zeroPadding(cd.getDate(), 2) +
        " " + 
        month[cd.getMonth()] 
        // +
        // " " +
        // this.zeroPadding(cd.getFullYear(), 4);
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
    }),
    ...mapGetters({
      themes: "themes/themes"
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
    },
    list() {
      //console.log('route', this.$route);
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  },
  watch: {
    time: function(newq, oldq) {},
    date: function(newq, oldq) {}
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss">
.header {
  .q-toolbar {
    min-height: 70px;
  }

  .q-layout__section--marginal {
    background: #fff;
  }

  .header__parts {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
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
    
  }
  .titleName {
    color: #282D30;;
    font-weight: bold;
    margin: 0 40px 0 8px;
  }
  .icon-color {
    color: #A0A5BA;
  }

  #clock {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-grow: 1;
    font-weight: bold;
    color: #A0A5BA;;
    .time {
    }
    .date {
     
    }
  }
}
</style>
