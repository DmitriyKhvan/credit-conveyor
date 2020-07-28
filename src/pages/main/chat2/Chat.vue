<template>
  <q-card class="row q-ma-lg" style="height: 80vh">
    <div class="col-8">
      <div class="row justify-between header q-pa-md">
        <div class="col headerDiv">
          <div class="text-h6">title</div>
        </div>
      </div>
      <q-scroll-area :visible="false" style="height: 80%">
        <div v-for="n in 100" :key="n">asads</div>
      </q-scroll-area>
      <div class="sendMesage">
        <q-form @submit.prevent="sendMessage" class="row">
          <div class="col">
            <q-input ref="inputMessage" outlined dense v-model="form.message" label="Сообщение" />
          </div>
          <div class="actionWidth self-center">
            <q-btn type="submit" icon="send" outline />
          </div>
        </q-form>
      </div>
    </div>

    <div class="col-4">
      <div class="row q-mb-md">
        <div class="col q-py-sm q-px-md text-h6 rightTitle">Чаты</div>
      </div>
      <q-scroll-area :visible="false" style="height: 80%">
        <div v-for="n in 100" :key="n">
          <q-card class="row my-card">
            <div class="col-8">name</div>
            <div class="col-2">
              <q-btn icon="edit" style="height: 100%;" />
            </div>
            <div class="col-2">
              <q-btn icon="delete" style="height: 100%;" />
            </div>
          </q-card>
        </div>
      </q-scroll-area>
      <q-btn
        class="q-mt-md full-width"
        color="green-6"
        label="Создать группу"
        @click="createGroup"
      />
    </div>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        message: ""
      }
    };
  },
  methods: {
    createGroup() {
      console.log("create ");
    }
  }
};
</script>
<style scoped>
.my-card {
  width: 100%;
  height: 50px;
}
.full-height {
  height: 100%;
}
</style>