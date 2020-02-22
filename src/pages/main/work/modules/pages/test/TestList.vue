<template>
  <div class="row justify-center">
    <div>
      <h4>Веберите тему</h4>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <ul>
            <li 
              ref="topicLi"
              v-for="topic of topics" 
              :key="topic.id" 
              @click="getIdTopic(topic.id, $event.target)"
              class="topic"
            >
              {{ topic.name }}
            </li>
          </ul>
        </div>
        <!-- <div class="col-6"></div> -->
      </div>
      <!-- <router-link v-if="topicId" :to="'topic/' + topicId">
        <q-btn color="green" label="Начать тест"></q-btn>
      </router-link> -->
      <q-btn 
        color="green" 
        label="Начать тест"
        :disabled="disabled"
        @click="() => this.$router.push('topic/' + topicId)"
      >
      </q-btn>
    </div>
  </div>
</template>
<script>
import TestService from './test-service'

export default {
  data() {
    return {
      topicId: null,
      disabled: true,
      isActive: false,
      testService: new TestService(),
      topics: []
    };
  },
  created() {
    //console.log(this.testService)
    this.testService.getTopics()
      .then(res => {
        console.log(res)
        this.topics = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    getIdTopic(id, event) {
      for (let li of this.$refs.topicLi) {
        li.classList.remove("selectedTopic")
      }

      event.classList.add("selectedTopic");
      this.isActive=true;

      this.topicId = id;
      // this.selectedTopic = "selectedTopic"
      this.disabled = false;
    }
  }
};
</script>
<style scoped>
  .topic {
    list-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 5px;
    padding: 5px 10px;
  }

  .selectedTopic {
    background: blue;
    color: white;
  }
</style>
