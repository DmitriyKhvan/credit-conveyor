<template>
  
    <q-btn
      v-if="scannerSerialNumber"
      :loading="submitting"
      color="primary"
      label="Получить данные автоматически"
      @click="autoCompleate"
      class="full-width"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
  
</template>
<script>
export default {
  computed: {
    scannerSerialNumber() {
      return this.$store.state.credits.scannerSerialNumber;
    },
    submitting() {
      return this.$store.state.credits.submitting;
    },
    DigID() {
      return this.$store.state.profile.Customer.DigID;
    }
  },
  methods: {
    autoCompleate() {
      this.$store.commit('toggleSubmitting', true);
      this.$store.commit('toggleDisableBtn', true);
      this.$store.commit('toggleDisableInput', true);
      this.$store.commit('loadMessageChange', "Данные загружаются");

      this.$store.dispatch('getUserDataFromService')
        .then(res => {
          console.log("Данные: ", res)

          let data = {};
          if (!res.Additional) {
            data = {
              personData: res.modelPersonPassport.PersonPassport,
              personPhoto: res.Photo.PersonPhoto
            }
          } else {
            data = {
              personData: res.modelPersonPassport.PersonPassport,
              Inn: res.Additional.Inn,
              Patronym: res.Person.PatronymL,
              personPhoto: res.Photo.PersonPhoto
            }
          }

          this.getDataSuccess(data);
          this.DigID = true
        })
        .catch(error => {
          console.log('Нет данных', error);

          const data = {
            flag: true,
            loader: false,
            message: "Возникла проблема. Не удалось считать данные. Введите данные вручную"
          }
          this.$store.commit('errorLoadData', data);

          this.$store.commit('toggleSubmitting', false);
          this.$store.commit('toggleDisableInput', false);
          this.$store.commit('toggleScannerSerialNumber', false);
          this.$store.commit('toggleDisableBtn', false);
          this.$store.commit('loadMessageChange', "Ошибка сети. Введите данные вручную");

          // const data = {
          //   flag: true,
          //   loader: true,
          //   message: "Сервис не доступен и сейчас произойдет только сканирование чипа паспорта"
          // }
          // this.$store.commit('errorLoadData', data);

          // this.$store.dispatch('getUserDataFromReader')
            // .then(res => {
              
            //   const data = {
            //     personData: res.modelPersonPassport.PersonPassport
            //   }

            //   this.getDataSuccess(data);

            //   const dataErr = {
            //     flag: false,
            //     loader: false,
            //     message: ""
            //   }
            //   this.$store.commit('errorLoadData', dataErr);

            // })
            // .catch(error => {
            //   console.log(error);
            //   const data = {
            //     flag: true,
            //     loader: false,
            //     message: "Возникла проблема. Не удалось считать данные с чипа. Введите данные вручную"
            //   }
            //   this.$store.commit('errorLoadData', data);

            //   //this.$store.commit('toggleSubmitting', false);
            //   this.$store.commit('toggleDisableInput', false);
            //   this.$store.commit('toggleScannerSerialNumber', false);
            //   this.$store.commit('toggleDisableBtn', false);
            //   this.$store.commit('loadMessageChange', "Ошибка сети. Введите данные вручную");
            // })

        });
    }, 

    getDataSuccess(data) {
      this.$store.commit('sentPersonData', data);
      this.$store.commit('toggleSubmitting', false); //loader on button
      this.$store.commit('toggleDisableBtn', false);
      this.$store.commit('loadMessageChange', "");
      this.$store.commit('sentScannerSerialNumber', null); //close button auto compleate
    }
  }
};
</script>
<style lang="scss" scoped>
  .q-btn--rectangle {
    border-radius: 0;
  }

  .full-width {
    margin-bottom: 16px;
  }
</style>
