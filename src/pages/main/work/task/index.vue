<template>
  <div class="q-pa-md">
    <q-toolbar class="shadow-2 rounded-borders">
      <q-tabs v-model="tab" inline-label stretch>
        <q-tab name="tab1" :label="$t('tables.work.tasks.new')" icon="new_releases">
          <q-badge color="red" floating>2</q-badge>
        </q-tab>
        <q-tab name="tab2" :label="$t('tables.work.tasks.accepted')" icon="drafts">
          <q-badge color="red" floating>12</q-badge>
        </q-tab>
        <q-tab name="tab3" :label="$t('tables.work.tasks.working')" icon="settings_applications"></q-tab>
        <q-tab name="tab4" :label="$t('tables.work.tasks.finished')" icon="check_circle"></q-tab>
      </q-tabs>
    </q-toolbar>

    <div class="sub_menu">
      <div class="filterBlock">
        <q-select
          dense
          filled
          v-model="model"
          :options="optionsFilter"
          :label="$t('tables.work.tasks.actions')"
        />
      </div>
      <div>{{$t('tables.work.tasks.redirect')}}</div>
      <div>{{$t('tables.work.tasks.sort')}}</div>
      <div>{{$t('actions.delete')}}</div>
    </div>

    <div v-for="(b, i) in 2" :key="i" class="row docBlock">
      <div class="col-1 check">
        <div class="check_div">
          <q-checkbox v-model="val" />
        </div>
      </div>
      <div class="col content">
        <div class="row">
          <div
            class="col text"
          >Поручение по письму Министерства РУз также призвал глав муниципалитетов разъяснить пожилым гражданам необходимость оставаться дома и исключить ...</div>
        </div>
        <div class="row">
          <div class="col despBlock">
            <div>
              <q-icon name="skip_previous" />
            </div>
            <div>
              <span>Исх.№</span> 36-44/29
              <br />
              <span>от:</span> 2019.12.24
            </div>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="skip_next" />
            </div>
            <div>
              <span>Вх.№</span> 36-44/29
              <br />
              <span>от:</span> 2019.12.24
            </div>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="description" />
            </div>
            <div>
              <span>1 лист / бумажное</span>
              <br />
              <i>622 кб</i>
            </div>
          </div>

          <div class="col despBlock">
            <q-btn
              color="white text-black"
              icon="person"
              size="sm"
              :label="$t('tables.work.tasks.responsibles')"
              @click="usersPopup = true"
            />
            <q-dialog v-model="usersPopup">
              <q-hierarchy></q-hierarchy>
            </q-dialog>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="person" />
            </div>
            <div>
              <span>{{$t('tables.work.tasks.from')}}:</span>
              <strong>Мирсаитов А.С.</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 text-right actions">
        <q-btn
          class="white text-black q-mb-sm"
          :label="$t('actions.open')"
          @click="taskPopup = true"
        />
        <br />
        <q-dialog v-model="taskPopup" full-width full-height>
          <q-task></q-task>
        </q-dialog>
        <q-btn flat size="sm" icon="print" />
        <q-btn flat size="sm" icon="cloud_download" />
      </div>
    </div>
  </div>

  <!-- <div class="q-pa-md">
    <router-view />
  </div>-->
</template>

<script>
import QHierarchy from "./dialog-hierarchy.vue";
import QTask from "./dialog-task.vue";

export default {
  data() {
    return {
      taskPopup: false,
      tab: "tab1",
      val: false,
      fixed: false,
      model: null,
      group: "op1",
      optionsSel: [
        {
          label: "Хамдамов А.А.",
          value: "op1"
        },
        {
          label: "Касимов Ю.Д.",
          value: "op2"
        },
        {
          label: "Петров Ф.В",
          value: "op3"
        }
      ],
      shape: [],
      usersPopup: false,
      optionsFilter: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  components: {
    QHierarchy,
    QTask
  }
};
</script>

<style lang="scss" scoped>
.sub_menu {
  padding: 10px 0;
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.sub_menu div {
  padding-left: 10px;
  margin-right: 10px;
  color: #8b8b8b;
  cursor: pointer;
  font-size: 12px;
}
.sub_menu div + div {
  border-left: 1px #c2c2c2 solid;
}
.docBlock {
  border-top: 1px #c2c2c2 solid;
  padding: 30px 15px;
  color: #8b8b8b;
}
.docBlock:hover {
  background: #f2f2f2;
}
.docBlock div {
  padding-right: 5px;
}
.docBlock span {
  color: black;
  float: left;
  display: block;
  padding-right: 5px;
}
.check {
  padding: 0 10px;
  width: 65px;
  margin-right: 10px;
}
.check_div {
  background: #f2f2f2;
  padding: 5px;
  border-radius: 10px;
}
.despBlock {
  display: flex;
  font-size: 14px;
}
.despBlock + .despBlock {
  border-left: 1px #c2c2c2 solid;
  padding: 0 15px;
  margin-right: 15px;
}
.text {
  font-size: 16px;
  padding-bottom: 15px;
}
.actions {
  width: 200px;
}
.filterBlock {
  width: 150px;
}
</style>
