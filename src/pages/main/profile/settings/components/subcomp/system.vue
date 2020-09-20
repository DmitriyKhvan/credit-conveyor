<template>
  <div class="col column OpenSans">
    <div
      class="row col"
      style="color:#273959;font-size:20px"
    >У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
    <div class="full-width OpenSansXB text-h5 q-mt-xl text-weight-bolder">
      <b>Таймаут для авто выхода из системы</b>
    </div>
    <div class="row no-wrap full-width">
      <div class="col column justify-between">
        <q-select
          v-model="timeout"
          class="q-mt-xl input-text"
          style="margin-top: 30px"
          :options="timeoutOptions"
          label="Время для авто выхода из системы"
          hint="Через какое количество времени нужно перезайти в систему"
          stack-label
          @input="onSelectTimeout"
        />
      </div>
      <div class="col column justify-between"></div>
    </div>
    <div class="full-width OpenSansXB text-h5 q-mt-xl text-weight-bolder">
      <b>Тема системы Personal</b>
    </div>
    <div class="row no-wrap full-width">
      <div class="col column justify-between">
        <q-select
          v-model="theme"
          class="q-mt-xl input-text"
          style="margin-top: 30px"
          :options="Toptions"
          label="Тема Personal"
          hint="Выберите подходящую тему для работы в системе"
          stack-label
        />
      </div>
      <div class="col column justify-between"></div>
    </div>
    <div class="full-width" style="margin-top: 50px">
      <q-btn class="q-py-sm q-px-md" color="primary" label="СОХРАНИТЬ" />
    </div>
  </div>
</template>
<script>
import NotifyService from "@/services/notify.service";
export default {
  name: "System",
  data() {
    return {
      timeout: null,
      theme: "Стандартная тема",
      timeoutOptions: [
        {
          label: `${60 / 60} минут`,
          value: 60,
        },
        {
          label: `${120 / 60} минут`,
          value: 120,
        },
        {
          label: `${300 / 60} минут`,
          value: 300,
        },
        {
          label: `${600 / 60} минут`,
          value: 600,
        },
        {
          label: `${900 / 60} минут`,
          value: 900,
        },
        {
          label: `${1200 / 60} минут`,
          value: 1200,
        },
        {
          label: `${1800 / 60} минут`,
          value: 1800,
        },
        {
          label: `${3600 / 60} минут`,
          value: 3600,
        },
      ],
      Toptions: ["Стандартная тема"],
    };
  },
  created() {
    let timeout = this.$store.getters["auth/logoutTime"];
    this.timeout = {
      label: `${timeout / 1000 / 60} минут`,
      value: timeout / 1000,
    };
  },
  methods: {
    onSelectTimeout(option) {
      //console.log({ option });
      this.$axios
        .post(`settings/timeout`, { timeout: option.value })
        .then((resp) => {
          if (resp.data.status == 1) {
            // change local timeout in store
            this.$store.dispatch("auth/setLogoutTime", option.value);
            NotifyService.showSuccessMessage(resp.data.message);
          } else NotifyService.showErrorMessage(resp.data.message);
        })
        .catch((err) => {
          console.error({ err });
        });
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
