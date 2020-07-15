<template>
  <q-dialog v-model="messageBar" persistent>
    <q-card>
      <q-bar>
        <div>{{$t('common.message')}}</div>

        <q-space />

        <q-btn dense flat icon="close" @click="closeBtn">
          <q-tooltip>{{$t('actions.close')}}</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <p>{{ message }}</p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <p>{{$t('tables.work.credit.try_again')}}</p> -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import message from "@/shared/utils/messages";
export default {
  methods: {
    closeBtn() {
      this.$store.commit("credits/toggleMessageBar", false);
      // this.$router.push("/work/credit");
    }
  },
  computed: {
    messageBar() {
      return this.$store.getters["credits/messageBar"]
    },
    message() {
      return message[this.$store.getters["credits/message"]] || this.$store.getters["credits/message"];
      //return this.$store.getters["credits/message"]
    }
  }
};
</script>
