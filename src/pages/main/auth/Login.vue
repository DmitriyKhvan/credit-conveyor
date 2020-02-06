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
      <div v-if="!drawer">
        <div class="block">
          <q-img src="./../../../assets/statics/logoNew.png" style="color:red; width: 100px" />
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
                      v-model="credentials.username"
                      placeholder="Логин"
                      v-on:keyup.enter="handleSubmit()"
                    />
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      dense
                      square
                      outlined
                      v-model="credentials.password"
                      placeholder="Пароль"
                      v-on:keyup.enter="handleSubmit()"
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
                      @click="handleSubmit()"
                      v-on:keyup.enter="handleSubmit()"
                    >Войти</q-btn>
                  </q-card-section>
                </q-form>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <q-page-sticky position="bottom-right" :offset="[-15, 55]">
        <q-btn fab color="blue" style="width: 30px; height: 30px;" @click="drawer = !drawer">
          <q-icon
            :name="drawer ? 'keyboard_arrow_left' : 'keyboard_arrow_right'"
            class="absolute-center"
          />
        </q-btn>
      </q-page-sticky>
    </q-drawer>

    <q-page-container>
      <q-img
        src="http://imkoniyat.uz/wp-content/uploads/2014/11/tashkent.jpg"
        style="width: 100%; height: 100vh; filter: blur(5px);"
      />
    </q-page-container>
  </q-layout>
</template>
<script>
import axios from "axios";
import { AuthService } from "../../../services/auth.service";
export default {
  name: "names",
  data() {
    return {
      drawer: false,
      leftDrawerOpen: false,
      showPass: false,
      credentials: { username: null, password: null },
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
    handleSubmit() {
      // Perform a simple validation that email and password have been typed in
      if (!!this.credentials.username && !!this.credentials.password) {
        AuthService.login(this.credentials, res => {
          if (res) {
            this.clearForm();
            this.showNotif("Successfully logged in", "green");
          } else return;
        });
      } else {
        this.showNotif("Enter credentials correctly", "red");
      }
    },
    clearForm() {
      this.credentials.username = "";
      this.credentials.password = "";
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
