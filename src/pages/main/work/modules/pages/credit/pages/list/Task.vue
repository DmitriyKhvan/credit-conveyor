<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-btn
          type="submit"
          color="green"
          label="Одобрить"
          class="q-ml-sm full-width"
        />
      </div>
      <div class="col-3">
        <q-btn
          color="red"
          label="Отклонить"
          class="q-ml-sm full-width"
          @click="taskFailure"
        />
      </div>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Выберите причину отказа</span>
        </q-card-section>
        <form @submit.prevent.stop="submitHandler">
          <q-select
            ref="reson"
            square
            outlined
            v-model="reason"
            :options="options.reason"
            dense
            label="Причина отказа"
            lazy-rules
            :rules="[val => !!val || 'Выберите причину отказа']"
            class="q-pb-sm"
          />

          <div
            v-if="reason === options.reason[3]"
            class="q-pa-md"
            style="max-width: 100%"
          >
            <q-input 
              ref="comment"
              square
              outlined 
              dense
              v-model="text" 
              label="Комментарий"
              type="textarea" 
              lazy-rules
              :rules="[val => !!val || 'Напишите комментарий']"
              class="q-pb-sm"
            />
          </div>

          <q-card-actions align="right">
            <q-btn label="Отмена" color="red" v-close-popup />
            <q-btn type="submit" label="Отправить" color="green"/>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      confirm: false,
      reason: "",
      text: "",
      options: {
        reason: [
          'причина 1',
          'причина 2',
          'причина 3',
          'другое'
        ]
      }
    };
  },
  computed: {
    personalData() {
      return this.$store.state.profile.personalData;
    },
  },
  methods: {
    taskFailure() {
      this.confirm = true;
    },

    submitHandler(event) {
      console.log(this.$refs)
      this.$refs.reson.validate();
  
      if (this.reason === this.options.reason[3]) {
        this.$refs.comment.validate();
      } else {
        this.validItems("comment");
      }

      if (this.$refs.reson.hasError || this.$refs.comment.hasError) {
        this.formHasError = true;
      } else {
        alert("Success")
        this.confirm = false
      }
    },

    validItems(itemsValid, itemValid = true) {
      if (!itemValid) {
        this.$refs[itemsValid] = {
          hasError: true //не валидный
        };
      } else {
        this.$refs[itemsValid] = {
          hasError: false //валидный
        };
      }
    },
  }
};
</script>
