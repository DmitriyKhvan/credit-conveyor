<template>
<div class="OpenSans">
    <q-btn @click="tDialog = true" class="row no-wrap justify-start items-center bg-white rounded-borders no-shadow q-py-xs" flat :ripple="{ color: 'green' }">
        <q-avatar icon="add" color="light-green-1" text-color="green" size="20px" />
        <b class="q-ml-sm text-caption">Новая задача</b>
    </q-btn>
    <q-dialog v-model="tDialog">
        <q-card class="q-pa-md col-9 bg-grey-2" style="width: 60vw">
            <q-tabs
                v-model="taskTab"
                class="bg-grey-8 text-grey-4"
                active-color="white"
                indicator-color="white"
                align="left"
                narrow-indicator
                >
            <q-tab name="new_task" label="Новая задача" class="col-4 f16" />
            <q-tab name="new_request" label="Новая заявка" class="col-4 f16" />
            </q-tabs>

            <q-tab-panels v-model="taskTab" class=" bg-grey-2 text-grey-8">
                <q-tab-panel name="new_task">
                    <new-task></new-task>
                </q-tab-panel>

                <q-tab-panel name="new_request">
                    <new-request></new-request>
                </q-tab-panel>

            </q-tab-panels>
        </q-card>
    </q-dialog>
</div>
</template>
<script>
import NewTask from './subcomponents/NewTask'
import NewRequest from './subcomponents/NewRequest'
export default {
  data () {
    return {
      taskTab: 'new_task',
      tDialog: false
    }
  },
  components: {
    NewTask,
    NewRequest
  }
}
</script>
<style scoped>
@font-face {
  font-family: "OpenSans";
  src: url("~assets/fonts/OpenSans-Regular.ttf") format("truetype");
}
.OpenSans {
  font-family: "OpenSans";
  font-weight: 500;
  font-style: normal;
}
.j-grey {
  color: #A0A5BA;
}
.f20 {
  font-size: 20px;
}
.f16 {
  font-size: 16px;
}
.f14 {
  font-size: 14px;
}
.f13 {
  font-size: 13px;
}
.textarea {
    min-height: 4rem;
    max-height: 8rem;
}
.bordered {
    border: .5px solid grey;
}
.activeb {
    border: .5px solid transparent;
    background-color: #1976d2;
    color: white;
}
</style>
