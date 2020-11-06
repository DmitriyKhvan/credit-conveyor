<template>
  <div class="col column OpenSans">
    <div class="row col" style="color:#273959;font-size:20px">
      У вас есть доступ для смены персональных данных (логин, пароль,
      электронная почта, др.)
    </div>
    <div class="row no-wrap full-width">
      <div class="col column justify-between">
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="social.facebook"
          label="Facebook"
          label-color="grey"
          stack-label
        >
        </q-input>
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="social.instagram"
          label="Instagram"
          label-color="grey"
          stack-label
        >
        </q-input>
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="social.linkedln"
          label="LinkedIn"
          label-color="grey"
          stack-label
        >
        </q-input>
        <div class="full-width OpenSansXB text-h5 q-mt-xl text-weight-bolder">
          <b>Персональные страницы</b>
        </div>
        <q-select
          v-model="web"
          class="q-mt-xl input-text"
          style="margin-top: 30px"
          :options="social.websites"
          :display-value="web ? web : 'none'"
          label="Персональный веб-сайт"
          stack-label
        />
      </div>
      <div class="col column justify-start">
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="social.twitter"
          label="Twitter"
          label-color="grey"
          stack-label
        >
        </q-input>
        <q-input
          class="q-mt-xl input-text"
          input-class="inputs"
          v-model="social.telegram"
          label="Telegram"
          label-color="grey"
          stack-label
        >
        </q-input>
      </div>
    </div>
    <div class="full-width" style="margin-top: 50px">
      <q-btn
        class="q-py-sm q-px-md"
        color="primary"
        label="СОХРАНИТЬ"
        @click="onSave"
      />
    </div>
  </div>
</template>
<script>
import NotifyService from "@/services/notify.service";

export default {
  name: "Social",
  data() {
    return {
      social: {
        facebook: null,
        instagram: null,
        linkedln: null,
        twitter: null,
        telegram: null,
        websites: []
      },
      web: null
    };
  },
  created() {
    this.$axios
      .get("settings/social")
      .then(resp => {
        //console.log(resp.data);
        this.social = resp.data;
      })
      .catch(err => {
        console.log({ err });
      });
  },
  methods: {
    onSave() {
      this.$axios
        .post("settings/social", this.social)
        .then(resp => {
          NotifyService.showSuccessMessage("Saved");
        })
        .catch(err => {
          NotifyService.showErrorMessage("Failed");
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
