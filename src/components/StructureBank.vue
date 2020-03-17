<template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <!-- select box branches-->

      <div :class="view && view==='dialog' ? 'col-4' : 'col-2'">
        <div class="row filter">
          <div class="col-12">
            <span class="white_span">
              <q-icon name="tune" class="icon" />
              Фильтр
            </span>
            <q-form
              class="q-gutter-none"
            >
              <q-input
                dense
                square 
                outlined
                v-model="name"
                label="Имя Фамилия персонала"
                class="white"
              />
              <q-select
                dense 
                outlined 
                square
                v-model="model" 
                :options="options" 
                label="Отделения"
                class="white" 
              />
            </q-form>
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col-12">
            <q-select
              square
              outlined
              v-model="selectedBranch"
              :options="branches"
              option-label="DEPARTMENT_NAME1"
              option-value="CODE"
              label="Выберите отделение"
              transition-show="jump-up"
              transition-hide="jump-up"
              dropdown-icon="o_arrow_drop_down"
              dense
            />
          </div>
          <div class="col-12" style="">
            <q-scroll-area :style="{height: heightEl}">
              <q-list bordered separator v-if="selectedBranch">
                <q-item
                  clickable
                  v-for="(item, index) in selectedBranch.children"
                  :key="index"
                  @click="getSectors(item.FILIAL, item.CODE)"
                >
                  <q-item-section>{{
                    decode(item.DEPARTMENT_NAME1)
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <!-- -->

      <div class="col test" style="background: #F2F4F4">
        <q-scroll-area :style="{height: heightElRight}">
          <q-tree
            :nodes="filials"
            node-key="CODE"
            label-key="DEPARTMENT_NAME1"
            default-expand-all
            color="black"
            icon="o_arrow_right"
            ref="nodes"
          >
            <template v-slot:default-header="prop">
              <span>{{ decode(prop.node.DEPARTMENT_NAME1) }}</span>
            </template>

            <template v-slot:default-body="prop">
              <div class="row">
                <div
                  :class="view && view === 'dialog' ? 'userRowMin': 'userRow'"
                  v-for="(item, index) in prop.node.emps"
                  :key="index"
                >
                  <q-card @click="emitUser(item)" style="cursor: pointer"  class="userBlock">
                    <user-card :itemData="item" :view="(view === 'dialog') ? 'dialog': ''" />
                  </q-card>
                </div>
                
              </div>
            </template>
          </q-tree>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script>
import ApiService from "./../services/api.service";
import CommonUtils from "./../shared/utils/CommonUtils";
import UserService from "./../services/user.service";
import UserCard from "./../components/UserCard";
import { dom } from 'quasar'
const { height } = dom

export default {
  components: {
    UserCard
  },
  mixins: [],
  data() {
    return {
      mail: "mailto:",
      selectedBranch: null,
      branches: [],
      filials: [],
      name: '',
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      heightEl: '',
      heightElRight: ''
    };
  },
  props: {
    view: {
      type: String
    }
  },
  created() {
    Promise.all([this.getBranches()])
      .then(x => {
        this.branches = x[0].data[0].children;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  },
  mounted() {
    this.$nextTick(() => {
      this.heightEl = height(eee)-330+'px'
      this.heightElRight = height(eee)-100+'px'
      window.onresize = () => {
        this.heightEl = height(eee)-330+'px'
        this.heightElRight = height(eee)-100+'px'
      }
    })
  },
  methods: {
    emitUser(item) {
      this.$emit("selectUser", item);
    },
    getSectors(mfo, code) {
      ApiService.get(`structure/departments?mfo=${mfo}&code=${code}`)
        .then(res => {
          // set array
          this.filials = res.data;
          this.$nextTick(function() {
            this.$refs.nodes.expandAll();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    decode(param) {
      return CommonUtils.decoder(param);
    },
    getBranches() {
      return ApiService.get("structure/branches");
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    }
  }
};
</script>
<style lang="sass" scoped>
.row > div
  padding: 10px 10px 2px 5px

.test
  border: 1px solid rgba(39, 55, 70,.4)

.filter > div
  padding: 15px 15px 20px
  background: #0060d3 url('./../assets/images/uzor-white.png') no-repeat right bottom

.white_span
  color:#fff
  padding: 0 0 10px 0
  display: block

.white 
  background: #fff;
  margin-bottom: 10px

.icon 
  font-size: 1.5rem
  color:#fff

.underline
  text-decoration: underline

.userBlock, .userRowMin 
  width: 300px
  height: 170px
  overflow: hidden

.userRowMin
  height: 105px

.userRow 
  float: left

</style>
