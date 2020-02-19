<template>
  <q-layout>
    <q-page-container>
      <q-tabs inline-label class="bg-primary text-white shadow-2">
        <!-- The tabs for panels-->
        <router-link to="topicPage" style="text-decoration:none;color:white">
          <q-tab name="EditTopic" icon="play_for_work" label="Edit Topic" />
        </router-link>
        <router-link to="questionPage" style="text-decoration:none;color:white">
          <q-tab name="EditQuestions" icon="format_indent_increase" label="Edit Questions" />
        </router-link>
        <router-link to="testPage" style="text-decoration:none;color:white">
          <q-tab name="EditTest" icon="event" label="Edit Test" />
        </router-link>
        <router-link to="monitoringPage" style="text-decoration:none;color:white">
          <q-tab name="Monitoring" icon="show_chart" label="Monitoring" />
        </router-link>
      </q-tabs>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default [];
</script>
