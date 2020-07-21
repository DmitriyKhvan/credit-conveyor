<template>
  <div class="tabsCol">
    <div class="row">
      <div class="col-12 q-pa-lg">
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3 text-black"
          active-color="text-white"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          inline-label
        >
          <q-tab name="topics" icon="personal_video">{{$t('tables.education.addEditTopic')}}</q-tab>
          <q-tab name="questions" icon="layers">{{$t('tables.education.addEditQuestion')}}</q-tab>
          <q-tab name="tests" icon="dvr">{{$t('tables.education.addEditTest')}}</q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="topics">
            <topics />
          </q-tab-panel>

          <q-tab-panel name="questions">
            <questions />
          </q-tab-panel>

          <q-tab-panel name="tests">
            <tests />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import Topics from "./topics/Topics";
import Tests from "./tests/Tests";
import Questions from "./questions/Questions";

export default {
  components: {
    Topics,
    Tests,
    Questions
  },
  data() {
    return {
      tab: "topics"
    };
  }
};
</script>

<style scoped>
.tabsCol .q-field {
  border: 1px #ccc solid;
  padding-left: 10px;
}
.tabsCol .q-tab--active {
  background: #2196f3;
  color: #fff;
}
.tabsCol .sortable {
  color: #2196f3;
}
.tabsCol .q-table {
  border-top: 1px #2196f3 solid;
}
</style>
