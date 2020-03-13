<template>
    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Сообщение</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>{{errorMessage}}</p>
          <p>Попробуйте снова</p>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import message from '../../../../../../shared/utils/messages'
export default {
  data() {
    return {
      icon: true
    }
  },
  computed: {
    errorMessage() {
      return message[this.$store.getters.error] || 'Что-то пошло не так'
    }
  }
}
</script>