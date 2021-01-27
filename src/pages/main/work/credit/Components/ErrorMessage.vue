<template>
  <q-dialog v-model="messageBar" persistent>
    <q-card>
      <q-btn flat round icon="close" class="closeBtn" @click="closeBtn">
        <q-tooltip>{{ $t("actions.close") }}</q-tooltip>
      </q-btn>

      <!-- <q-card-section>
        <p>{{ message }}</p>
      </q-card-section> -->

      <div class="message">
        <q-icon
          v-if="code == 1"
          name="check_circle"
          class="text-green"
          style="font-size: 4rem;"
        />
        <q-icon
          v-else-if="code == 0"
          name="error"
          class="text-red"
          style="font-size: 4rem;"
        />
        <q-icon
          v-else
          name="warning"
          class="text-orange"
          style="font-size: 4rem;"
        />
        <p>{{ message }}</p>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import message from "@/shared/utils/messages";
export default {
  methods: {
    closeBtn() {
      this.$store.commit("credits/toggleMessageBar", false);
    }
  },
  computed: {
    messageBar() {
      return this.$store.getters["credits/messageBar"];
    },
    message() {
      return (
        message[this.$store.getters["credits/messageBlock"].message] ||
        this.$store.getters["credits/messageBlock"].message
      );
      //return this.$store.getters["credits/message"]
    },

    code() {
      return this.$store.getters["credits/messageBlock"].code;
    }
  }
};
</script>

<style lang="scss">
.message {
  text-align: center;
  padding: 20px;
  font-size: 20px;
}

.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  color: #a0a5ba;
}
</style>
