<template>
  <div class="col column OpenSans">
    <div
      class="row col"
      style="color:#273959;font-size:20px"
    >У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
    <div class="row no-wrap full-width">
      <div class="col column justify-between">
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="personal.email"
          type="email"
          label="Электронная почта"
          label-color="grey"
          hint="Введите электронную почту"
          stack-label
        ></q-input>
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="personal.phone"
          label="Сотовый номер"
          label-color="grey"
          mask="(##) ### ## ##"
          fill-mask
          hint="Введите номер сотового телефона"
          stack-label
        ></q-input>
      </div>
      <div class="col column justify-between">
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="personal.office"
          label="Ип телефон номер"
          label-color="grey"
          mask="##-##"
          fill-mask
          hint="Введите Ип телефон номер"
          stack-label
        ></q-input>
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="personal.work"
          label="Рабочий телефон"
          label-color="grey"
          mask="(##) ### ## ##"
          fill-mask
          hint="Введите рабочий телефон"
          stack-label
        ></q-input>
      </div>
    </div>
    <div class="full-width" style="margin-top: 50px">
      <q-btn class="q-py-sm q-px-md" color="primary" label="СОХРАНИТЬ" @click="getInit" />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import NotifyService from "@/services/notify.service";

export default {
  name: "Personal",
  data() {
    return {
      personal: {
        email: "",
        phone: "",
        office: "",
        work: ""
      },
      change: false,
      searchResults: null
    };
  },
  created() {
    this.$axios
      .get("settings/personal")
      .then(response => {
        this.searchResults = response.data;
        if (this.searchResults) {
          this.personal.email = this.searchResults.mail
            ? this.searchResults.mail
            : null;
          this.personal.phone = this.searchResults.mobile
            ? this.searchResults.mobile
            : null;
          this.personal.work = this.searchResults.phone
            ? this.searchResults.phone
            : null;
          this.personal.office = this.searchResults.ip
            ? this.searchResults.ip
            : null;
        }
      })
      .catch(error => {
        console.log("error");
      });
  },
  computed: {
    ...mapGetters({
      empId: "auth/empId"
    })
  },
  methods: {
    getInit() {
      let obj = {
        mail: this.personal.email,
        mobile: this.personal.phone,
        phone: this.personal.work,
        ip: this.personal.office
      };
      console.log({ obj });
      this.$axios
        .post("settings/personal", obj)
        .then(res => {
          console.log({ res });
          if (res.data.status == 1) {
            // success
            NotifyService.showSuccessMessage(res.data.message);

            this.onCloseDialog();
          } else {
            // fail
            NotifyService.showErrorMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log({ err });
        });
    }
  }
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
