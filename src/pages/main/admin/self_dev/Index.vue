<template>
  <q-layout>
    <q-page-container>
      <q-tabs inline-label class="bg-primary text-white shadow-2">
        <!-- The tabs for panels-->
        <router-link to="/admin/selfdev/topicPage" style="text-decoration:none;color:white">
          <q-tab name="EditTopic" icon="play_for_work">{{$t('tables.education.addEditTopic')}}</q-tab>
        </router-link>

        <router-link to="/admin/selfdev/questionPage" style="text-decoration:none;color:white">
          <q-tab
            name="EditQuestions"
            icon="format_indent_increase"
          >{{$t('tables.education.addEditQuestion')}}</q-tab>
        </router-link>

        <router-link to="/admin/selfdev/testPage" style="text-decoration:none;color:white">
          <q-tab name="EditTest" icon="event">{{$t('tables.education.addEditTest')}}</q-tab>
        </router-link>

        <router-link to="/admin/selfdev/monitoringPage" style="text-decoration:none;color:white">
          <q-tab name="Monitoring" icon="show_chart">{{$t('tables.education.monitoring')}}</q-tab>
        </router-link>
      </q-tabs>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default [];
</script>
