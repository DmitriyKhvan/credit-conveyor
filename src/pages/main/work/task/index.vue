<template>
  <div class="q-pa-lg">
    <a-header></a-header>
    <template v-if="!isBoardView">
      <template v-if="isListView">
        <div class="row" v-for="task in taskList" :key="task.id">
          <div class="col">
            <div>
              <a-task :task="task"></a-task>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row q-col-gutter-lg q-pt-sm">
          <div class="col-lg-3 col-md-4 col-sm-6" v-for="task in taskList" :key="task.id">
            <a-task :task="task"></a-task>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <a-management></a-management>
    </template>
  </div>
</template>

<script>
import Header from "./components/Header";
import Task from "./components/Task";
import { mapState, mapGetters } from "vuex";
import Management from "./components/Management";

//import UserService from "@/services/user.service";
//import formatSize from "./filters/formatSize";
//import Decoder from "@/shared/utils/CommonUtils";

export default {
  data() {
    return {};
  },
  async created() {
    try {
      await this.$store.dispatch("task/userTasks", 1);
    } catch (error) {}
  },
  computed: {
    ...mapState({
      // tasks: state => state.tasks.tTasks
    }),
    ...mapGetters({
      isListView: "getListView",
      isBoardView: "getBoardView",
      tasks: "getTasks",
      searchText: "getSearchText",
    }),
    taskList() {
      // let filtered = state.taskList.filter(el =>
      //   el.f_task_data.description.includes(searchText)
      // );
      //console.log({ searchText: this.searchText });
      if (!!this.tasks)
        return this.tasks.filter((el) =>
          el.f_task_data.description.includes(this.searchText)
        );
      else return [];
    },
  },
  methods: {},
  components: {
    AHeader: Header,
    ATask: Task,
    AManagement: Management,
  },
  filters: {
    // formatSize
  },
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
