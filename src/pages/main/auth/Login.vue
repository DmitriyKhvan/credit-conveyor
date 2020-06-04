<template>
  <div class="bg">
    <div class="wrap">
      <div class="leftBlock">
        <div class="loginBlock">
          <div class="title">ВОЙДИТЕ В АККАУНТ</div>

          <q-form>
            <div class="input">
              <q-input
                outlined
                label="Введите логин"
                v-model.trim="credentials.username"
                :placeholder="$t('auth.username')"
                v-on:keyup.enter="handleSubmit()"
                @input="$v.credentials.username.$touch()"
                :rules="[
                  val =>
                    $v.credentials.username.required ||
                    $t('auth.usernameError'),
                  val =>
                    $v.credentials.username.minLength ||
                    $t('auth.usernameMinError')
                ]"
                lazy-rules
              />
            </div>
            <div class="input">
              <q-input
                outlined
                label="Введите пароль"
                v-model="credentials.password"
                :placeholder="$t('auth.password')"
                v-on:keyup.enter="handleSubmit()"
                :type="showPass ? 'text' : 'password'"
                @input="$v.credentials.password.$touch()"
                :rules="[
                  val =>
                    $v.credentials.password.required ||
                    $t('auth.passwordError'),
                  val =>
                    $v.credentials.password.minLength ||
                    $t('auth.passwordMinError')
                ]"
                lazy-rules
              />
            </div>
            <div class="checksBlock">
              <div class="checkElement">
                <q-checkbox v-model="teal" label="Запомнить меня" />
              </div>
              <div class="text-right">Забыли пароль?</div>
            </div>
            <q-btn
              color="primary"
              label="Войти"
              size="lg"
              class="full-width btnPad"
              :disable="$v.credentials.$invalid"
              @click="handleSubmit()"
              v-on:keyup.enter="handleSubmit()"
            />
            <div class="lang">
              <div>Ўзб</div>
              <div>O’zb</div>
              <div class="active">Ру</div>
              <div>Eng</div>
            </div>
            <div v-if="loginError" class="alert">
              <div><q-icon name="error" size="md" class="text-red" /></div>
              <div>Проверьте логин, правильность пароля и срок его действия</div>
            </div>

          </q-form>

        </div>
      </div>
      <!-- правый блок -->
      <div class="rightBlock">
          <div class="press">
            <div class="title">Новости и анонсы</div>
            <q-scroll-area class="scrollBlock">
              <div class="pressBlock" v-for="p in 10" :key="p">
                <div class="img"><img src="./assets/photo.png"></div>
                <div class="text">
                  В УЗБЕКИСТАНЕ ОТМЕНЯТ СТИКЕРЫ И РАЗРЕШАТ ПОЛЬЗОВАТЬСЯ АВТОМОБИЛЕМ БЕЗ ОГРАНИЧЕНИЙ
                  <div>16.05.2020 <q-icon class="more" name="keyboard_arrow_down" size="md" /></div>
                </div>
              </div>
            </q-scroll-area>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AuthService } from "@/services/auth.service";
import { required, minLength, between } from "vuelidate/lib/validators";
import NotifyService from "@/services/notify.service";
import TokenService from "@/services/storage.service";
import LoadingService from "@/services/loading.service";

export default {
  name: "names",
  data() {
    return {
      showPass: false,
      credentials: {
        username: null,
        password: null,
        lang: { text: "Русский", value: "ru" }
      },
      message: "",
      langsList: [
        { text: "Русский", value: "ru" }, // uz, ru, en
        { text: "Узбек крилл", value: "uzkr" },
        { text: "English", value: "en" },
        { text: "O'zbek Lotin", value: "uz" }
      ],
      loginError: false,

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
      },
      lang: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      //Perform a simple validation that email and password have been typed in
      if (!!this.credentials.username && !!this.credentials.password) {
        LoadingService.showLoadingHourGlass();

        AuthService.login(this.credentials, res => {
          if (res) {
            LoadingService.hideLoading();
            this.clearForm();
            NotifyService.showSuccessMessage("Successfully logged in");
          } else {
            LoadingService.hideLoading();
            NotifyService.showErrorMessage("Error in login");
            this.loginError = true
          }
        });
      } else {
        LoadingService.hideLoading();
        this.loginError = true
        // NotifyService.showErrorMessage("Enter credentials correctly");
      }
    },
    clearForm() {
      this.credentials.username = "";
      this.credentials.password = "";
      this.$v.credentials.$reset(); // TODO resetting validation
    },
    onLangChange(lang) {
      this.$i18n.locale = lang;
    }
  },
  beforeCreate: function() {
    //TokenService.removeKey();
  }
};
</script>
<style scoped>
  @font-face {
    font-family: 'OpenSans';
    src: url(./assets/fonts/OpenSans-Regular.ttf);
  }

  .bg {
    width: 100%;
    height: 100vh;
    background: url('./assets/bg.png') 100% 100% no-repeat;
    background-size: cover;
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #787E8C;
    display: flex;
    align-items: center;
  }
  .wrap {
    display: flex;
    width: 100%;
  }
  .leftBlock {
    width: 50%;

  }
  .loginBlock {
    width: 412px;
    margin: 0 auto;
    padding: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.8));
    border-radius: 5px;
    box-shadow: 0 0 10px #888888;
  }
  .title {
    text-align: center;
    padding-bottom: 35px;
    font-size: 20px;
    text-transform: uppercase;
  }
  .input {

  }
  .checksBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .checkElement {
    margin-left: -10px;
  }
  .lang {
    padding: 0 40px;
    display: flex;
    justify-content: space-around;
  }
  .lang .active, .lang div:hover {
    color: #6BA7DE;
    cursor: pointer;
  }
  .alert {
    display: flex;
    align-items: center;
    border-left: 4px #CB3535 solid;
    border-radius: 5px;
    padding: 20px 20px 20px 10px;
    background: #fff;
    line-height: 19px;
    font-size: 14px;
    margin-top: 35px;
  }
  .alert div + div {
    padding-left: 10px;
  }
  .rightBlock {
    width: 50%;
  }
  .pressBlock {
    display: flex;
  }
  .press {
    background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.8));
    border-radius: 5px;
    box-shadow: 0 0 10px #888888;
    margin-right: 50px;
    padding: 40px 30px 0 30px;
    color: #44494D;
  }
  .scrollBlock {
    height: 475px;
  }
  .pressBlock {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(208, 208, 208, 0.5);
    cursor: pointer;
  }
  .img {
    width: 130px;
  }
  .img img {
    width: 100%;
    height: auto;
    border-radius: 2px;
  }
  .text {
    text-transform: uppercase;
    padding-left: 20px;
    font-weight: bold;
  }
  .text div {
    color: #44494D;
    font-size: 12px;
    font-weight: normal;
    padding-top: 10px;
    position: relative;
  }
  .more {
    display: none;
    position: absolute;
    left: 50%;
    bottom: -10px;
    margin-left: -10px;
  }
  .text:hover .more, .text div:hover .more, .pressBlock:hover .more {display: block;}

</style>
<style>
  .btnPad {
    margin: 35px 0;
    padding: 8px;
    font-size: 16px;
  }
  .btnPad div {
    font-size: 16px;
  }
  .input .q-field--outlined .q-field__control {
    background: #F2F2F2;
  }
</style>
