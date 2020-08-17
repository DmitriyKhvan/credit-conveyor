<template>
  <div class="col-3 col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2 q-ma-lg">
    <div class="right col column no-wrap q-pa-md items-center rounded-borders sticky">
      <div class="row avatar overflow-hidden justify-center items-center vertical-middle q-my-md">
        <img  :src="getUserProfilePhotoUrl(emp_id)"
          width="70px"     />
      </div>
      <div class="text-center">
        <div class="col text-body2 name OpenSansBold">
          {{ user }}
        </div>
        <div class="col text-blue-7 text-italic q-my-sm text-caption">
          Проектный менеджер
        </div>
        <div class="text-caption">
          работает с 11.04.2020
        </div>
        <q-separator inset class="q-my-lg" />
      </div>
      <!-- Menus -->
      <div class="column OpenSansBold">
        
        <div  class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
              @click="menu(0)" :style="menuId == 0 ? 'background-color: #F8FAFF' : ''">
          <q-avatar rounded
                    size="50px"
                    class="q-mr-md">
            <img  src="~assets/proficon/info.svg" 
                  :class="menuId == 0 ? 'info-icon-active': 'info-icon'" />
          </q-avatar>
          <div  class="text-no-wrap"
                :style="menuId == 0 ? 'color:#37A0EA': ''">
                Мои данные
          </div>
        </div>

        <div  class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
              @click="menu(1)" :style="menuId == 1 ? 'background-color: #FFF8F8' : ''">
          <q-avatar rounded
                    size="50px"
                    class="q-mr-md" >
            <img  src="~assets/proficon/doc.svg" 
                  :class="menuId == 1 ? 'info-icon-active': 'info-icon'" />
          </q-avatar>
          <div  class="text-no-wrap"
                :style="menuId == 1 ? 'color:#F96363': ''">
                Документы
          </div>
        </div>

        <div  class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
              @click="menu(2)" :style="menuId == 2 ? 'background-color: #FFFBF8' : ''">
          <q-avatar rounded
                    size="50px"
                    class="q-mr-md" >
            <img  src="~assets/proficon/work.svg" 
                  :class="menuId == 2 ? 'info-icon-active': 'info-icon'" />
          </q-avatar>
          <div  class="text-no-wrap"
                :style="menuId == 2 ? 'color:#FFAE55': ''">
                Моя работа
          </div>
        </div>

        <div  class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
              @click="menu(3)" :style="menuId == 3 ? 'background-color: #FBF8FF' : ''">
          <q-avatar rounded
                    size="50px"
                    class="q-mr-md" >
            <img  src="~assets/proficon/career.svg" 
                  :class="menuId == 3 ? 'info-icon-active': 'info-icon'" />
          </q-avatar>
          <div  class="text-no-wrap"
                :style="menuId == 3 ? 'color:#8E91F4': ''">
                Карьера
          </div>
        </div>

        <div  class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
              @click="menu(4)" :style="menuId == 4 ? 'background-color: #F9FFF8' : ''">
          <q-avatar rounded
                    size="50px"
                    class="q-mr-md" >
            <img  src="~assets/proficon/other.svg" 
                  :class="menuId == 4 ? 'info-icon-active': 'info-icon'" />
          </q-avatar>
          <div  class="text-no-wrap"
                :style="menuId == 4 ? 'color:#5EDC98': ''">
                Прочее
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
    

        <!-- <div class="menu" v-if="curRouter !== 'My Finance'">
          <div @click="menu(0)" :class="menuId == 0 ? 'active' : ''"><q-icon name="account_box" size="xs" class="q-pr-sm" /> Мои данные</div>
          <div @click="menu(1)" :class="menuId == 1 ? 'active' : ''"><q-icon name="work" size="xs" class="q-pr-sm" /> Документы</div>
          <div @click="menu(2)" :class="menuId == 2 ? 'active' : ''"><q-icon name="contacts" size="xs" class="q-pr-sm" /> Личные</div>
          <div @click="menu(3)" :class="menuId == 3 ? 'active' : ''"><q-icon name="person" size="xs" class="q-pr-sm" /> Паспорт</div>
          <div @click="menu(4)" :class="menuId == 4 ? 'active' : ''"><q-icon name="people" size="xs" class="q-pr-sm" /> Родственники</div>
          <div @click="menu(5)" :class="menuId == 5 ? 'active' : ''"><q-icon name="menu_book" size="xs" class="q-pr-sm" /> Пое/Наг/Выб</div>
          <div @click="menu(6)" :class="menuId == 6 ? 'active' : ''"><q-icon name="school" size="xs" class="q-pr-sm" /> Образование</div>
          <div @click="menu(7)" :class="menuId == 7 ? 'active' : ''"><q-icon name="trending_up" size="xs" class="q-pr-sm" /> Карьера</div>
          <div @click="menu(8)" :class="menuId == 8 ? 'active' : ''"><q-icon name="memory" size="xs" class="q-pr-sm" /> Трудовой деятельность</div>
          <div @click="menu(9)" :class="menuId == 9 ? 'active' : ''"><q-icon name="chrome_reader_mode" size="xs" class="q-pr-sm" /> Контракт</div>
          <div @click="menu(10)" :class="menuId == 10 ? 'active' : ''"><q-icon name="assignment_turned_in" size="xs" class="q-pr-sm" /> Отметки</div>
          <div @click="menu(11)" :class="menuId == 11 ? 'active' : ''"><q-icon name="local_airport" size="xs" class="q-pr-sm" /> Командировки</div>
          <div @click="menu(12)" :class="menuId == 12 ? 'active' : ''"><q-icon name="add_box" size="xs" class="q-pr-sm" /> Больничный лист</div>
          <div @click="menu(13)" :class="menuId == 13 ? 'active' : ''"><q-icon name="directions_run" size="xs" class="q-pr-sm" /> Отпуски</div>
        </div>
      </div> -->

<script>
import axios from "axios"
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      active: false,
      work: null,
    }
  },
  methods: {
    getUserProfilePhotoUrl(emp_id) {
      return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
    },
    menu(id) {
      this.$store.dispatch('setMenuId', id)
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/fullName"
    }),
    ...mapGetters({
    emp_id: "auth/empId"
    }),
    menuId () {
      return this.$store.getters.getMenuId
    },
    curRouter () {
      return this.$router.currentRoute.name
    }
  },
  created () {
      axios
        .get("/emps/data/department?uid=" + this.emp_id)
        .then(response => {
          console.log(response.data)
          this.work = response.data
        })
        .catch(error => {
            console.log('error')
        });
  }
}
</script>

<style scoped>
  @font-face {
    font-family: 'Avant';
    src: url('~assets/fonts/avant.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansBold';
    src: url('~assets/fonts/OpenSans-Bold.ttf') format('truetype');
  }
  .OpenSansBold {
    font-family: 'OpenSansBold';
    font-weight: 500;
  }
  .Avant {
    font-family: 'Avant';
  }
  .right {
    background: #ffffff;
  }
  
  .avatar {
    border: 3px solid #067ddf;
    border-radius : 50%;
    width: 70px;
    height: 70px;
    background-position: center;
    background-size: cover;
  }
  .avatar:after {
    content: '';
    width: 15px;
    height: 15px;
    background-color: rgb(19, 235, 12);
    border: 2px solid white;
    border-radius: 50%;
    position: absolute;
    margin-right: -50px;
    margin-bottom: -45px;
  }
  .name {
    line-height: 20px;
    font-family: 'OpenSansBold';
  }
  .otdel {
    border-radius: 5px;
  }
  .menus div {
    cursor: pointer;
  }
  .menu div.active, .menu div:hover {
    background: #9FB7CF;
    color: #fff;
  }
  .info-menu > * {
    color: grey;
  }
  .info-icon {
    background-color: #F8FAFF;
    padding: 15px;
  }
  .info-icon-active {
    background-color: #ffffff;
    padding: 15px;
  }
  .menus div.active {
    background: #F8FAFF;
    color: #fff;
  }
  .sticky {
    position: sticky;
    position: -webkit-sticky;
    top: 20px;
  }
</style>
