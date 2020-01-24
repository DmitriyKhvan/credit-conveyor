<template>
  <q-layout view="hHh Lpr lff">
    <q-drawer
      side="right"
      v-model="leftDrawerOpen"
      show-if-above
      :mini="drawer"
      :width="400"
      :breakpoint="500"
      bordered
    >
      <!-- <div class="row justify-center">
        <div class="column self-center" v-if="!drawer">
          <q-card class="my-card" style="width: 360px" flat>
            <q-card-section class="row justify-center">
              <span>ВХОД В ПРОГРАММУ</span>
            </q-card-section>
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
      </div> -->
      <div v-if="!drawer">
        <div class="block">
          <q-img src="statics/logoNew.png" style="color:red; width: 100px" />
        </div>
        <div class="block2">
          <div class="row justify-center">
            <div class="column self-center">
              <q-card class="my-card" style="width: 360px" flat>
                <q-card-section class="row justify-center">
                  <span>ВХОД В ПРОГРАММУ</span>
                </q-card-section>
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
        <!-- <div class="block3">
          <div class="item">
            1
          </div>
          <div class="item">
            2
          </div>
          <div class="item">
            3
          </div>
        </div> -->
      </div>

      <q-page-sticky position="bottom-right" :offset="[-15, 55]">
        <q-btn
          fab
          color="blue"
          style="width: 30px; height: 30px;"
          @click="drawer = !drawer"
        >
          <q-icon
            :name="drawer ? 'keyboard_arrow_left' : 'keyboard_arrow_right'"
            class="absolute-center"
          />
        </q-btn>
      </q-page-sticky>
    </q-drawer>

    <q-page-container
      ><q-img
        src="http://imkoniyat.uz/wp-content/uploads/2014/11/tashkent.jpg"
        style="width: 100%; height: 100vh; filter: blur(5px);"
    /></q-page-container>
  </q-layout>
</template>
<script>
import axios from "axios";
export default {
  name: "names",
  data() {
    return {
      drawer: false,
      leftDrawerOpen: false,
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
          this.$router.push({ path: "/home", redirect: { name: "login" } });
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
<style lang="scss">
.block {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5em;
  width: 8em;
}
.block2 {
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  width: 8em;
  font-family: "Open Sans", sans-serif;
}
.block3 {
  margin-left: 10px;
  margin-right: 10px;
  display: grid;
  grid-template-columns: 30% 30% 30%;

  grid-gap: 10px;
  background-color: red;
}
.item {
  border: 1px solid #ccc;
  align-self: center;
}
</style>
