<template>
  <div class="q-pa-md">
    <div class="row justify-center" style="height: 70vh">
      <div class="column self-center">
        <q-card class="my-card" style="width: 350px" flat>
          <q-form>
            <q-card-section>
              <q-input
                dense
                square
                outlined
                v-model="username"
                placeholder="Логин"
                v-on:keyup.enter="auth()"
              />
            </q-card-section>
            <q-card-section>
              <q-input
                dense
                square
                outlined
                v-model="password"
                placeholder="Пароль"
                v-on:keyup.enter="auth()"
                :type="showPass ? 'text' : 'password'"
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    :icon="showPass ? 'o_visibility' : 'o_visibility_off'"
                    @click="showPass = !showPass"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-btn
                class="full-width"
                color="primary"
                @click="auth()"
                v-on:keyup.enter="auth()"
                >Войти</q-btn
              >
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showPass: false,
      username: "",
      password: "",
      message: ""
    };
  },
  methods: {
    showNotif(t, color) {
      this.$q.notify({
        message: t,
        color: color,
        actions: [{ icon: "close", color: "white" }],
        timeout: 10000,
        position: "top"
      });
    },
    auth() {
      axios({
        method: "POST",
        url: "auth/login",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          this.$router.push({ path: "/", redirect: { name: "login" } });
        })
        // eslint-disable-next-line
        .catch(error => {
          this.showNotif(this.formCheck()[0], this.formCheck()[1]);
        });
    },
    formCheck() {
      if (!this.username && !this.password) {
        return ["Поля логин и пароль должны быт заполнены", "info"];
      } else if (!this.username) {
        return ["Поля логин должно быт заполнено", "info"];
      } else if (!this.password) {
        return ["Поля пароль должно быт заполнено", "info"];
      } else {
        return ["Проверти в правильности логина или паролья", "negative"];
      }
    }
  },
  beforeCreate: function() {
    localStorage.removeItem("access_token");
  }
};
</script>
<style lang="sass" scoped></style>
