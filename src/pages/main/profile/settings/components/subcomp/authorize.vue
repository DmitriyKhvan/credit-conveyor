<template>
  <div class="col column OpenSans">
    <div
      class="row col"
      style="color:#273959;font-size:20px"
    >У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
    <div class="row no-wrap full-width">
      <q-input
        class="q-mt-xl input-text"
        input-class="inputs"
        v-model="username"
        type="login"
        label="Логин"
        label-color="grey"
        hint="Введите логин"
        stack-label
      ></q-input>
    </div>
    <div class="full-width OpenSansXB text-h6 q-mt-xl text-weight-bolder">Смена пароля</div>
    <div class="row no-wrap full-width">
      <div class="col-6 justify-between">
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="newpwd"
          label="Новый пароль"
          label-color="grey"
          stack-label
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-6 justify-between">
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="repwd"
          label="Повторите новый пароль"
          label-color="grey"
          stack-label
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="full-width" style="margin-top: 50px">
      <q-btn class="q-py-sm q-px-md" color="primary" label="СОХРАНИТЬ" @click="saveAuthSettings" />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import NotifyService from "@/services/notify.service";
export default {
  name: "Authorize",
  data() {
    return {
      username: null,
      newpwd: null,
      repwd: null,
      isPwd: true,
    };
  },
  created() {
    this.$axios
      .get("settings/auth")
      .then((resp) => {
        //console.log({ resp });
        if (!!resp.data) {
          this.username = resp.data.authdata.username;
        }
      })
      .catch((err) => {
        console.log({ err });
        throw err;
      });
  },
  methods: {
    saveAuthSettings() {
      if (!!this.username) {
        if (!!this.newpwd && !!this.repwd) {
          if (this.newpwd == this.repwd) {
            this.$axios
              .post("settings/auth", {
                username: this.username,
                password: this.newpwd,
              })
              .then((resp) => {
                if (resp.data.status == 1) {
                  // success
                  NotifyService.showSuccessMessage(resp.data.message);
                } else {
                  // fail
                  NotifyService.showErrorMessage(resp.data.message);
                }
              })
              .catch((err) => {
                NotifyService.showErrorMessage(err.toString());
                throw err;
              });
          } else {
            NotifyService.showErrorMessage("Passwords dont match");
          }
        } else {
          this.$axios
            .post("settings/auth", {
              username: this.username,
            })
            .then((resp) => {
              if (resp.data.status == 1) {
                // success
                NotifyService.showSuccessMessage(resp.data.message);
              } else {
                // fail
                NotifyService.showErrorMessage(resp.data.message);
              }
            })
            .catch((err) => {
              console.log({ err });
              NotifyService.showErrorMessage(err.toString());
              throw err;
            });
        }
      }
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: "OpenSansXB";
  src: url("~assets/fonts/OpenSans-ExtraBold.ttf") format("truetype");
}
@font-face {
  font-family: "OpenSansB";
  src: url("~assets/fonts/OpenSans-Bold.ttf") format("truetype");
}
@font-face {
  font-family: "OpenSans";
  src: url("~assets/fonts/OpenSans-Regular.ttf") format("truetype");
}

.OpenSansXBold {
  font-family: "OpenSansXB";
}
.OpenSansBold {
  font-family: "OpenSansB";
}
.OpenSans {
  font-family: "OpenSans";
}
.input-text {
  margin-top: 10vh;
  margin-right: 10vw;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}
.input-label {
  font-size: 16px;
  line-height: 22px;
  color: #787e8c;
}
</style>
