<template>
  <q-card>
    <q-card-section>
      <h4>User: {{ user }}</h4>
      <q-separator inset />

      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 200px; max-width: 100%;"
      >
        <div v-for="(msg, index) in inbox" :key="index">
          <p>{{ msg.title }}</p>
          <p>{{ msg.body }}</p>
          <p>
            Sent by: {{ msg.sender_name }} at:
            {{ formattedDate(msg.sent_at) }}
          </p>
          <q-separator inset />
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section>
      <q-form @submit.prevent="sendMessage">
        <label>Title:</label>
        <q-input type="text" v-model="form.title" class="form-control" />

        <label for="body">Message:</label>
        <q-input type="textarea" v-model="form.body" class="form-control" />
        <label>Users:</label>
        <q-select
          outlined
          v-model="form.user_ids"
          multiple
          :options="userList"
          use-chips
          stack-label
          option-value="value"
          option-label="text"
          emit-value
          map-options
        />
        <q-btn label="Send" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </q-form>

      <q-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
import commonUtils from "@/shared/utils/CommonUtils";

export default {
  mounted() {
    this.socket.on("notify", data => {
      console.log(data);
      this.$store.dispatch("dicts/addNotification", data);
      this.$q.notify({
        message: data.title,
        color: "purple",
        position: "bottom-right"
      });
    });
  },
  data() {
    return {
      message: "",
      form: {
        id: null,
        title: null,
        body: null,
        user_ids: [],
        name: null,
        emp_id: null
      },
      contentStyle: {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555"
      },

      contentActiveStyle: {
        backgroundColor: "#eee",
        color: "black"
      },

      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },
      test: [
        {
          title: "1",
          body: "111",
          sender_name: "me",
          sent_at: new Date()
        },
        {
          title: "1",
          body: "111",
          sender_name: "me",
          sent_at: new Date()
        },
        {
          title: "1",
          body: "111",
          sender_name: "me",
          sent_at: new Date()
        },
        {
          title: "1",
          body: "111",
          sender_name: "me",
          sent_at: new Date()
        }
      ]
    };
  },
  created() {
    // this.$store.watch(
    //   (state, getters) => getters["dicts/receivedNotifications"],
    //   (newValue, oldValue) => {
    //     this.inbox = this.$store.getters["dicts/receivedNotifications"];
    //   }
    // );
    //console.log(this.inbox);
  },
  computed: {
    ...mapGetters({
      user: "auth/fullName"
    }),
    ...mapGetters({
      emp_id: "auth/empId"
    }),
    ...mapGetters({
      inbox: "dicts/receivedNotifications"
    }),
    ...mapGetters({
      socket: "socket/getSocket"
    }),
    ...mapGetters({
      userList: "dicts/getUserList"
    })
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.form.name = this.user;
      this.form.emp_id = this.emp_id;
      this.socket.emit("SEND_NOTIFICATION", this.form);

      this.form.id = null;
      this.form.title = null;
      this.form.body = null;
      this.form.user_ids = [];
    },
    formattedDate(date) {
      return commonUtils.formattedDate(date);
    }
  },
  watch: {},
  beforeDestroy() {}
};
</script>

<style></style>
