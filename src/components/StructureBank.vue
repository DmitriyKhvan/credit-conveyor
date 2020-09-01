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
    <q-input dense square
        v-model="searchText"
        bg-color="white" color="grey-3"
        label-color="black"
        outlined
        clearable
        label="Поиск персонала..."
        @clear="cleanning"
        @input="checkInput">
      <template v-slot:append>
        <q-icon name="search" />
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
                        class="userBlock q-ma-sm"
                        :class="emp === item.EMP_ID ? 'active' : ''">
                <user-card :itemData="item" :view="(view === 'dialog') ? 'dialog': ''" />
              </q-card>
            </div>
            
        </template>
      </q-tree>
    </q-scroll-area>
  </div>


  <div class="row col q-my-md text-weight-bolder text-body2 " v-if="searchResult !== null ">
    Найдено&nbsp;<b class="bg-orange text-body1 text-white">{{ searchResult.length >= 20 ? searchResult.length+'+' : searchResult.length }}</b>
    &nbsp;сотрудников по запросу:&nbsp;<b class="bg-orange text-body1 text-white q-px-md">{{ searchText }}</b>
  </div>
  <div class="col column" v-if="searchResult !== null">
    <q-scroll-area :style="{height: heightElRight}">
    
    <div
      :class="view && view === 'dialog' ? 'userRowMin': 'userRow'"
      v-for="(item, index) in searchResult"
      :key="index"
    >
    <span class="depst">{{ decode(item.DEPARTMENTS_NAME) }}/{{  }}</span>
      <q-card   @click="emitUser(item)"
                style="cursor: pointer"
                class="userBlock q-ma-sm"
                :class="emp === item.EMP_ID ? 'active' : ''">
        <user-card-old :itemData="item" :view="(view === 'dialog') ? 'dialog': ''" />
        <!-- {{ item }} -->
      </q-card>
    </div>
    </q-scroll-area>
  </div>
  
</div>
</template>
<script>
import ApiService from "./../services/api.service";
import CommonUtils from "./../shared/utils/CommonUtils";
import UserService from "./../services/user.service";
import UserCard from "./../components/UserCard";
import UserCardOld from "./../components/UserCardOld";
import { dom } from 'quasar'
const { height } = dom

export default {
  components: {
    UserCard,
    UserCardOld
  },
  mixins: [],
  data() {
    return {
      mail: "mailto:",
      searchText: null,
      searchResult: [],
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
      heightElRight: '',
      emp: null
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
  computed: {
    checkInput() {
      if (this.searchText === null || this.searchText.length === 0) {
        this.searchResult = null;
      }
      this.findPer();
    }
  },
  methods: {
    cleanning() {
      this.searchResult = null;
    },
    emitUser(item) {
      this.$emit("selectUser", item);
      this.emp = item.EMP_ID;
    },
    getSectors(mfo, code) {
      this.searchResult = null;
      ApiService.get(`structure/departments?mfo=${mfo}&code=${code}`)
        .then(res => {
          // set array
          this.filials = res.data;
          this.$nextTick(function() {
            this.$refs.nodes.expandAll();
            console.log(this.filials);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    findPer() {
      if (this.searchText !== null){
        ApiService.get(`emps/search?name=${this.searchText}`)
          .then(response => {
            this.searchResult = response.data;
          });
          this.selectedFilial = null;
      }
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
