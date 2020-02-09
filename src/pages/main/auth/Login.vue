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
                      clearable
                      v-model.trim="credentials.username"
                      placeholder="Username"
                      v-on:keyup.enter="handleSubmit()"
                      @input="$v.credentials.username.$touch()"
                      :rules="[
                      val => $v.credentials.username.required || 'Username is required',
                      val => $v.credentials.username.minLength || 'Length should be at least 3 chars'
                      ]"
                      lazy-rules
                    />
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      dense
                      square
                      outlined
                      clearable
                      v-model="credentials.password"
                      placeholder="Password"
                      v-on:keyup.enter="handleSubmit()"
                      :type="showPass ? 'text' : 'password'"
                      @input="$v.credentials.password.$touch()"
                      :rules="[
                      val => $v.credentials.password.required || 'Password is required',
                      val => $v.credentials.password.minLength || 'Length should be at least 3 chars'
                      ]"
                      lazy-rules
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
                      :disable="$v.credentials.$invalid"
                      @click="handleSubmit()"
                      v-on:keyup.enter="handleSubmit()"
                    >Login</q-btn>
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
import { required, minLength, between } from "vuelidate/lib/validators";
import NotifyService from "../../../services/notify.service";
import TokenService from "../../../services/storage.service";

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
  validations: {
    credentials: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    handleSubmit() {
      //Perform a simple validation that email and password have been typed in
      if (!!this.credentials.username && !!this.credentials.password) {
        AuthService.login(this.credentials, res => {
          if (res) {
            this.clearForm();
            NotifyService.showSuccessMessage("Successfully logged in");
          } else {
            NotifyService.showErrorMessage("Error in login");
          }
        });
      } else {
        NotifyService.showErrorMessage("Enter credentials correctly");
      }
    },
    clearForm() {
      this.credentials.username = "";
      this.credentials.password = "";
      this.$v.credentials.$reset(); // TODO resetting validation
    }
  },
  beforeCreate: function() {
    //TokenService.removeKey();
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
