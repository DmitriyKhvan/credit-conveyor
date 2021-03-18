<template>
  <div class="topicsBlock">
    <h4 class="titleAllTest">{{ $t("tables.education.test.choose_test") }}</h4>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <ul class="topicList">
          <li
            ref="topicLi"
            v-for="topic of topics"
            :key="topic.id"
            @click="getIdTopic(topic.id, topic.name, $event.target)"
            class="topic"
          >
            {{ topic.name }}
          </li>
        </ul>
      </div>
      <div class="col-6"></div>
    </div>
    <!-- <router-link v-if="topicId" :to="'topic/' + topicId">
        <q-btn color="green" label="Начать тест"></q-btn>
    </router-link>-->
    <q-btn
      class="startTopic"
      color="green"
      :label="$t('tables.education.test.begin_test')"
      :disabled="disabled"
      @click="() => this.$router.push('topic/' + topicId)"
    ></q-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topicId: null,
      disabled: true,
      isActive: false,
      topics: []
    };
  },
  async created() {
    try {
      this.topics = await this.$store.dispatch("education/getTopics");
    } catch (error) {}

    // Promise.all([this.getTopics()])
    //   .then(
    //     res => {
    //       console.log(res[0]);
    //       this.topics = res[0];
    //     },
    //     err => {
    //       console.error(err);
    //     }
    //   )
    //   .catch(err => {
    //     console.error(err);
    //     throw err;
    //   });
  },
  methods: {
    getIdTopic(id, name, event) {
      for (let li of this.$refs.topicLi) {
        li.classList.remove("selectedTopic");
      }

      event.classList.add("selectedTopic");
      this.isActive = true;

      this.topicId = id;
      // this.selectedTopic = "selectedTopic"
      this.disabled = false;

      this.$store.commit("education/setTopicName", name);
    }
  }
};
</script>
<style lang="scss" scoped>
.topicsBlock {
  /* display: flex;
  flex-direction: column; */

  .topicList {
    height: 75vh;
    overflow-y: scroll;
  }
}

.titleAllTest {
  text-align: center;
  font-size: 28px;
  color: #0e3475;
  margin: 20px 0 10px 0;
}

.topic {
  font-size: 20px;
  color: #2b2b2b;
  list-style: none;
  border: 1px solid #bbd1e7;
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.2s linear;
}

.topic:hover {
  background: #0073e3;
  color: white;
}

.selectedTopic {
  background: #0073e3;
  color: white;
}

.startTopic {
  display: block;
  margin: 0 auto;
  font-size: 20px;
  padding: 0 50px;
}
</style>
