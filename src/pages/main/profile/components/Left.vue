  <template>
  <div class="col-3 col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2 q-ma-lg">
    <div class="right col column no-wrap q-pa-md items-center rounded-borders sticky">
      <div class="row avatar overflow-hidden justify-center items-center vertical-middle q-my-md">
        <img :src="getUserProfilePhotoUrl(emp_id)" width="70px" />
      </div>
      <div class="text-center">
        <div class="col text-body2 name OpenSansBold">{{ user }}</div>
        <div class="col text-blue-7 text-italic q-my-sm text-caption" v-html="userinfo.POST_NAME"></div>
        <div class="text-caption">{{userinfo.WORK}}</div>
        <q-separator inset class="q-my-lg" />
      </div>
      <!-- Menus -->
      <div class="column OpenSansBold">
        <div
          class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
          @click="menu(0)"
          :style="menuId == 0 ? 'background-color: #F8FAFF' : ''"
        >
          <q-avatar rounded size="50px" class="q-mr-md">
            <img
              src="~assets/proficon/info.svg"
              :class="menuId == 0 ? 'info-icon-active': 'info-icon'"
            />
          </q-avatar>
          <div class="text-no-wrap" :style="menuId == 0 ? 'color:#37A0EA': ''">Мои данные</div>
        </div>

        <div
          class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
          @click="menu(1)"
          :style="menuId == 1 ? 'background-color: #FFF8F8' : ''"
        >
          <q-avatar rounded size="50px" class="q-mr-md">
            <img
              src="~assets/proficon/doc.svg"
              :class="menuId == 1 ? 'info-icon-active': 'info-icon'"
            />
          </q-avatar>
          <div class="text-no-wrap" :style="menuId == 1 ? 'color:#F96363': ''">Документы</div>
        </div>

        <div
          class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
          @click="menu(2)"
          :style="menuId == 2 ? 'background-color: #FFFBF8' : ''"
        >
          <q-avatar rounded size="50px" class="q-mr-md">
            <img
              src="~assets/proficon/work.svg"
              :class="menuId == 2 ? 'info-icon-active': 'info-icon'"
            />
          </q-avatar>
          <div class="text-no-wrap" :style="menuId == 2 ? 'color:#FFAE55': ''">Моя работа</div>
        </div>

        <div
          class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
          @click="menu(3)"
          :style="menuId == 3 ? 'background-color: #FBF8FF' : ''"
        >
          <q-avatar rounded size="50px" class="q-mr-md">
            <img
              src="~assets/proficon/career.svg"
              :class="menuId == 3 ? 'info-icon-active': 'info-icon'"
            />
          </q-avatar>
          <div class="text-no-wrap" :style="menuId == 3 ? 'color:#8E91F4': ''">Карьера</div>
        </div>

        <div
          class="row q-pa-md items-center rounded-borders text-grey-7 no-wrap cursor-pointer"
          @click="menu(4)"
          :style="menuId == 4 ? 'background-color: #F9FFF8' : ''"
        >
          <q-avatar rounded size="50px" class="q-mr-md">
            <img
              src="~assets/proficon/other.svg"
              :class="menuId == 4 ? 'info-icon-active': 'info-icon'"
            />
          </q-avatar>
          <div class="text-no-wrap" :style="menuId == 4 ? 'color:#5EDC98': ''">Прочее</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      active: false,
      work: null,
      userinfo: null
    };
  },
  methods: {
    getUserProfilePhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    },
    menu(id) {
      this.$store.dispatch("setMenuId", id);
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/fullName"
    }),
    ...mapGetters({
      emp_id: "auth/empId"
    }),
    menuId() {
      return this.$store.getters.getMenuId;
    },
    curRouter() {
      return this.$router.currentRoute.name;
    }
  },
  created() {
    axios
      .get("/emps/data/department?uid=" + this.emp_id)
      .then(response => {
        console.log(response.data);
        this.work = response.data;
      })
      .catch(error => {
        console.log("error");
      });
    axios
      .get("emps/info?id=" + this.emp_id)
      .then(response => {
        console.log(response.data);
        this.userinfo = response.data;
      })
      .catch(error => {
        console.log("error");
      });
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Avant";
  src: url("~assets/fonts/avant.ttf") format("truetype");
}
@font-face {
  font-family: "OpenSansBold";
  src: url("~assets/fonts/OpenSans-Bold.ttf") format("truetype");
}
.OpenSansBold {
  font-family: "OpenSansBold";
  font-weight: 500;
}
.Avant {
  font-family: "Avant";
}
.right {
  background: #ffffff;
}

.avatar {
  border: 3px solid #067ddf;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-position: center;
  background-size: cover;
}
.avatar:after {
  content: "";
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
  font-family: "OpenSansBold";
}
.otdel {
  border-radius: 5px;
}
.menus div {
  cursor: pointer;
}
.menu div.active,
.menu div:hover {
  background: #9fb7cf;
  color: #fff;
}
.info-menu > * {
  color: grey;
}
.info-icon {
  background-color: #f8faff;
  padding: 15px;
}
.info-icon-active {
  background-color: #ffffff;
  padding: 15px;
}
.menus div.active {
  background: #f8faff;
  color: #fff;
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 20px;
}
</style>
