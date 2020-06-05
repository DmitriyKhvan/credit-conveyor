<template>
  <div class="q-pa-md">
    <form @submit.prevent.stop="onSubmit">
      <q-input
        ref="headerColor"
        filled
        v-model="themes.headerColor"
        label="Выберите цвет header"
        class="my-input"
        :rules="[val => !!val || 'Поле обязательно для заполнения']"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color
                v-model="themes.headerColor"
                no-footer
                default-view="palette"
                :palette="[
                  '#019A9D',
                  '#D9B801',
                  '#E8045A',
                  '#B2028A',
                  '#2A0449',
                  '#FFFFFF',
                  '#019A9D'
                ]"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        ref="footerColor"
        filled
        v-model="themes.footerColor"
        label="Выберите цвет footer"
        class="my-input"
        :rules="[val => !!val || 'Поле обязательно для заполнения']"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color
                v-model="themes.footerColor"
                no-footer
                default-view="palette"
                :palette="[
                  '#019A9D',
                  '#D9B801',
                  '#E8045A',
                  '#B2028A',
                  '#2A0449',
                  '#019A9D'
                ]"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        ref="buttonColor"
        filled
        v-model="themes.buttonColor"
        label="Выберите цвет кнопки"
        class="my-input"
        :rules="[val => !!val || 'Поле обязательно для заполнения']"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color
                v-model="themes.buttonColor"
                no-footer
                default-view="palette"
                :palette="[
                  '#019A9D',
                  '#D9B801',
                  '#E8045A',
                  '#B2028A',
                  '#2A0449',
                  '#019A9D'
                ]"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn type="submit" color="primary" label="Применить" class="q-ml-sm" />
      <!-- <q-btn
        color="primary"
        label="Отмена"
        class="q-ml-sm"
        @click="onCancel"
      /> -->
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    themes() {
      return this.$store.getters["themes/themes"];
    }
  },
  methods: {
    onSubmit() {
      this.$refs.headerColor.validate()
      this.$refs.footerColor.validate()
      this.$refs.buttonColor.validate()

      if ( 
            this.$refs.headerColor.hasError ||
            this.$refs.footerColor.hasError ||
            this.$refs.buttonColor.hasError
      ) {
        this.formHasError = true
      } else {
        this.$q
          .dialog({
            title: "Применить",
            message: "Вы действительно хотите применить",
            cancel: true,
            persistent: true
          })
          .onOk(async () => {
            const settings = {
              id: 0,
              emp_id: this.$store.getters["auth/empId"],
              header: this.themes.headerColor,
              footer: this.themes.footerColor,
              button: this.themes.buttonColor,
              timeout: 0
            };
            const response = await this.$store.dispatch("themes/editThemes", settings);
            console.log('response', response)
            // if (response.status == 1) {
            //   this.$q.notify({
            //     icon: 'done',
            //     position: 'top',
            //     color: 'positive',
            //     message: 'Изменения применены'
            //   })
            // } else {
            //   this.$q.notify({
            //     icon: 'done',
            //     position: 'top',
            //     color: 'negative',
            //     message: 'Изменения не применены'
            //   })
            // }
          })
          .onOk(() => {
            //console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            console.log(">>>> Cancel");
          })
          .onDismiss(() => {
            //console.log('I am triggered on both OK and Cancel')
          });
      }
    }
  }
};
</script>
<style lang="scss">
.my-input {
  max-width: 250px;
}
</style>
