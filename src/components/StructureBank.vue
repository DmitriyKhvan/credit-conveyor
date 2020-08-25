<template>
<div class="column q-ma-md OpenSansBold">
  <div class="text-h5 text-weight-bolder q-my-sm">
    Телефонный справочник
  </div>
  <div class="row justify-between items-center">
    <div class="row no-wrap col-4">
      <q-select class="col-9 bg-white text-no-wrap overflow-hidden ellipsis q-mr-md"
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
                clearable
              />
      <q-select class="col col-10 bg-white text-no-wrap overflow-hidden ellipsis"
                square
                outlined
                dense
                clearable
                v-model="selectedFilial"
                :disable="selectedBranch === null ? selectedFilial = null : false"
                option-label="selectedFilial"
                label="Выберите филиаль"
                transition-show="jump-up"
                transition-hide="jump-up"
                dropdown-icon="o_arrow_drop_down">
          <q-menu   persistent auto-close>
            <q-list   bordered separator
                      v-if="selectedBranch" 
                      class="max-width: 300px">
              <q-item
                clickable
                v-for="(item, index) in selectedBranch.children"
                :key="index"
                @click="getSectors(item.FILIAL, item.CODE), getFil(item.DEPARTMENT_NAME1)"
              >
                <q-item-section>{{
                  decode(item.DEPARTMENT_NAME1)
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
      </q-select>
    </div>
    <q-input  dense square 
              v-model="searchText" 
              bg-color="white" color="grey-3" 
              label-color="black" 
              outlined 
              clearable
              label="Поиск персонала...">
      <template v-slot:append style="float-right">
        <q-btn round flat icon="search" />
      </template>
    </q-input>
  </div>

  <div class="row col q-my-md text-weight-bolder" v-if="selectedFilial">
    {{ selectedBranch.DEPARTMENT_NAME1 + ' / ' + decode(selectedFilial) }}
  </div>

  <div class="col column" v-if="selectedFilial">
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
          <span class="depst">{{ decode(prop.node.DEPARTMENT_NAME1) }}</span>
        </template>

        <template v-slot:default-body="prop">
            <div
              :class="view && view === 'dialog' ? 'userRowMin': 'userRow'"
              v-for="(item, index) in prop.node.emps"
              :key="index"
            >
              <q-card   @click="emitUser(item)"
                        style="cursor: pointer"
                        class="userBlock q-ma-sm">
                <user-card :itemData="item" :view="(view === 'dialog') ? 'dialog': ''" />
              </q-card>
            </div>
            
        </template>
      </q-tree>
    </q-scroll-area>
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
      searchText: null,
      selectedBranch: null,
      selectedFilial: null,
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
      this.heightEl = height(eee)-60+'%'
      this.heightElRight = height(eee)-200+'px'
      window.onresize = () => {
        this.heightEl = height(eee)-60+'%'
        this.heightElRight = height(eee)-200+'px'
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
    },
    getFil (e) {
      this.selectedFilial = e;
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
  background: #0060d3 url('~assets/images/uzor-white.png') no-repeat right bottom

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
  display: flex
  flex: auto
  flex-direction: row
  height: 50px
  overflow: hidden
  border: 2px solid #FFFFFF
  box-sizing: border-box
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249)
  border-radius: 5px

.userBlock
  &:hover
    border: 2px solid #4411ff
    // box-shadow: 0px 2px 4px rgba(100, 100, 255, 0.2)
.active
  border: 2px solid #4411ff


.userRowMin
  height: 105px

.userRow 
  

</style>
<style scoped>
@font-face {
  font-family: 'OpenSansBold';
  src: url('~assets/fonts/OpenSans-Regular.ttf') format('truetype');
}
.OpenSansBold {
  font-family: 'OpenSansBold';
  font-weight: 500;
}
.bg {
  background-color: yellow;
}
.depst {
  background-color: #F8FAFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  border-radius: 5px;
  font-weight: 600;
  font-size: 20px;
  line-height: 33px;
  display: flex;
  flex: auto;
  align-items: flex-end;
  color: #19496A;
}
</style>
