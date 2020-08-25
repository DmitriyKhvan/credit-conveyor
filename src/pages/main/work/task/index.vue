<template>
  <div class="q-pa-lg" v-if="dtab === 1">
    <a-header></a-header>
    <template v-if="!viewTasks">
      <template v-if="list">
        <div class="row"
          v-for="task in tasks"
          :key="task.id"
        >
          <div class="col" >
            <div>
              <a-task :task="task"></a-task>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row q-col-gutter-lg q-pt-sm">
          <div class="col-lg-3 col-md-4 col-sm-6" v-for="n in 10" :key="n"><a-task></a-task></div>
        </div>
      </template>
    </template>
    <template v-else>
      <a-management></a-management>
    </template>

  </div>
  <div v-else>
    <drag></drag>
  </div>
  <!-- <div class="q-pa-md">
    <q-toolbar class="shadow-2 rounded-borders">
      <q-tabs v-model="tab" inline-label stretch>
        <q-tab
          v-for="item of menu"
          :key="item.value"
          :name="item.value"
          :label="item.label"
          :icon="item.icon"
        >
          <template v-if="item.countTask">
            <q-badge color="red" floating>{{ item.countTask }}</q-badge>
          </template>
        </q-tab>
      </q-tabs>
    </q-toolbar>

    <div class="sub_menu">
      <div class="filterBlock">
        <q-select dense filled v-model="model" :options="menu" label="Действия" />
      </div>
      <div>перенаправить</div>
      <div>сортировать</div>
      <div>удалить</div>
    </div>

    <div v-for="task in userTasks" :key="task.task_id" class="row docBlock">
      <div class="col-1 check">
        <div class="check_div">
          <q-checkbox v-model="selection" :val="task.task_id" />
        </div>
      </div>
      <div class="col content">
        <div class="row">
          <div class="col text">{{ task.f_task_data.description.slice(0, 300) }}...</div>
        </div>
        <div class="row">
          <div class="col despBlock">
            <div>
              <q-icon name="skip_previous" />
            </div>
            <div>
              <span>Исх.№</span>
              {{ task.f_task_data.out_number }}
              <br />
              <span>от:</span>
              {{ task.f_task_data.out_date }}
            </div>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="skip_next" />
            </div>
            <div>
              <span>Вх.№</span>
              {{ task.f_task_data.in_number }}
              <br />
              <span>от:</span>
              {{ task.f_task_data.in_date }}
            </div>
          </div>
          <div class="col despBlock">
            <div>
              <span>
                {{ task.f_task_data.paper_count }} лист /
                {{ task.f_task_data.format }}
              </span>
              <br />
              <i>{{ task.f_task_data.file.size | formatSize }}</i>
            </div>
          </div>

          <div class="col despBlock">
            <q-btn
              color="white text-black"
              icon="person"
              size="sm"
              label="Ответсвенные"
              @click="
                usersHierarchy(
                  {
                    label: `${task.last_name} ${task.first_name} ${task.middle_name}`,
                    children: task.forward_tasks
                  },
                  task
                )
              "
            />
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="person" />
            </div>
            <div>
              <span>от:</span>
              <strong
                class="poster"
                v-html="
                  `${task.h_last_name} ${task.h_first_name.slice(
                    0,
                    1
                  )}. ${task.h_middle_name.slice(0, 1)}.`
                "
              ></strong>
              <p
                class="desc"
                v-html="
                  `${task.h_last_name} ${task.h_first_name} ${task.h_middle_name}`
                "
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 text-right actions">
        <q-btn class="white text-black q-mb-sm" label="Открыть" @click="usersTask(task)" />
        <br />

        <q-btn flat size="sm" icon="print" />
        <q-btn flat size="sm" icon="cloud_download" @click="downloadFile(task.f_task_data.file)" />
      </div>
    </div>


    <q-dialog v-model="usersPopup">
      <q-hierarchy></q-hierarchy>
    </q-dialog>


    <q-dialog v-model="taskPopup" full-width full-height>
      <q-task></q-task>
    </q-dialog>
  </div> -->


</template>

<script>
import Drag from './DragTask'
import Header from './components/Header'
import Task from './components/Task'
import Management from './components/Management'
import { mapState, mapGetters } from 'vuex';


import UserService from "@/services/user.service";
import QHierarchy from "./dialog-hierarchy.vue";
import QTask from "./dialog-task.vue";
import formatSize from "./filters/formatSize";
import Decoder from "@/shared/utils/CommonUtils";
import DragTaskVue from './DragTask.vue'


export default {
  data() {
    return {
      // viewTasks: true,
      // list: true,
      // taskPopup: false,
      // usersPopup: false,
      // tab: 1,
      // selection: [],
      // model: null
      // shape: [],
      // optionsFilter: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  async created() {
    try {
      await this.$store.dispatch("task/userTasks", 1);
    } catch (error) {}
  },
  computed: {
    ...mapState({
          viewTasks: state => state.tasks.tViewTasks,
          list: state => state.tasks.tList,
          tasks: state => state.tasks.tTasks,
          dtab: state => state.tasks.tTab,
        }),

    // ...mapGetters({
    //       tViews: 'tViews'
    //     }),

    // userTasks() {
    //   return this.$store.getters["task/getUserTasks"];
    // },
    // menu() {
    //   return this.$store.getters["task/getStatuses"];
    // }
  },
  watch: {
    // async tab(value) {
    //   try {
    //     await this.$store.dispatch("task/userTasks", value);
    //   } catch (error) {}
    // }
  },
  methods: {

    // usersHierarchy(data, task) {
    //   this.$store.commit("task/setCurrentTask", task);
    //   const children = [];
    //   const emp_id = this.$store.getters["auth/empId"];
    //   const avatar = UserService.getUserProfilePhotoUrl(emp_id);
    //   if (data.children) {
    //     for (let child of data.children) {
    //       children.push({
    //         label: `${Decoder.decoder(child.last_name)} ${Decoder.decoder(
    //           child.first_name
    //         )} ${Decoder.decoder(child.middle_name)}`,
    //         icon: "check_circle"
    //       });
    //     }
    //   }

    //   const props = [
    //     {
    //       label: data.label,
    //       avatar,
    //       children
    //     }
    //   ];
    //   //console.log(props);

    //   this.$store.commit("task/setUserHierarchy", props);

    //   this.usersPopup = true;
    // },
    // usersTask(task) {
    //   // const task = this.userTasks.find(i => i.task_id = task_id)
    //   this.$store.commit("task/setCurrentTask", task);
    //   this.taskPopup = true;
    // },

    // downloadFile(item) {
    //   console.log(item);
    //   axios({
    //     method: "get",
    //     url: "/files/" + item.id,
    //     responseType: "arraybuffer"
    //   }).then(function(response) {
    //     let blob = new Blob([response.data], { type: "application/pdf" });
    //     let link = document.createElement("a");
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = item.name.slice(0, -4);
    //     link.click();
    //   });
    // }
  },
  components: {
    AHeader: Header,
    ATask: Task,
    AManagement: Management,
    Drag,

    QHierarchy,
    QTask
  },
  filters: {
    formatSize
  }
};
</script>

<style lang="scss" scoped>

// .sub_menu {
//   padding: 10px 0;
//   margin: 10px 0;
//   display: flex;
//   align-items: center;
// }
// .sub_menu div {
//   padding-left: 10px;
//   margin-right: 10px;
//   color: #8b8b8b;
//   cursor: pointer;
//   font-size: 12px;
// }
// .sub_menu div + div {
//   border-left: 1px #c2c2c2 solid;
// }
// .docBlock {
//   border-top: 1px #c2c2c2 solid;
//   padding: 30px 15px;
//   color: #8b8b8b;
// }
// .docBlock:hover {
//   background: #f2f2f2;
// }
// .docBlock div {
//   padding-right: 5px;
// }
// .docBlock span {
//   color: black;
//   float: left;
//   display: block;
//   padding-right: 5px;
// }
// .check {
//   padding: 0 10px;
//   width: 65px;
//   margin-right: 10px;
// }
// .check_div {
//   background: #f2f2f2;
//   padding: 5px;
//   border-radius: 10px;
// }
// .despBlock {
//   display: flex;
//   font-size: 14px;
// }

// .poster {
//   position: relative;
//   cursor: pointer;
// }

// .poster:hover + .desc {
//   // opacity: 1;
//   display: block;
// }

// .desc {
//   position: absolute;
//   // top: 100%;
//   // left: 0;
//   // text-overflow: clip;
//   // white-space: nowrap;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background: #fff;
//   font-size: 14px;
//   color: #000;
//   padding: 5px 10px;
//   display: none;
//   // opacity: 0;
//   // transition: opacity, 0.3s ease;
//   z-index: 10;
// }

// .despBlock + .despBlock {
//   border-left: 1px #c2c2c2 solid;
//   padding: 0 15px;
//   margin-right: 15px;
// }
// .text {
//   font-size: 16px;
//   padding-bottom: 15px;
// }
// .actions {
//   width: 200px;
// }
// .filterBlock {
//   width: 150px;
// }
</style>
