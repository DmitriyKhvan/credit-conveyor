<template>
  <div
    class="row no-wrap q-pa-md text-baseline justify-between items-center OpenSansBold"
    style="font-size: 16px; line-height: 40px; display:flex; flex:auto; justify-content:space-between; color:#30384B"
  >
    <div class="col-3 row no-wrap">
      <q-avatar size="40px">
        <img :src="getPhotoUrl(item.EMP_ID)" width="40px" />
        <span class="bg-positive bedge">&nbsp;</span>
      </q-avatar>
      <div class="text-no-wrap text-weight-bolder q-ml-md">
        {{ decode(item.LAST_NAME) }}
        {{ decode(item.FIRST_NAME).slice(0, 1) }}.
        {{decode(item.MIDDLE_NAME).slice(0, 1)}}.
        <q-tooltip
          content-class="bg-blue-grey text-caption text-white"
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
        >{{decode(item.LAST_NAME)+' '+decode(item.FIRST_NAME)+' '+decode(item.MIDDLE_NAME)}}</q-tooltip>
      </div>
    </div>
    <div class="col text-no-wrap text-center text-weight-bolder">
      {{ decode(item.POST_NAME).slice(0, 40) }}
      <q-tooltip
        content-class="bg-blue-grey text-caption text-white ellipsis-2-lines"
        anchor="top middle"
        self="bottom middle"
        :offset="[5, 5]"
      >{{decode(item.POST_NAME)}}</q-tooltip>
    </div>
    <div class="col row ellipsis justify-between text-weight-bolder">
      <span class="col row justify-between no-wrap text-center text-no-wrap">
        <span>{{ item.PHONE_WORK }}</span>
        <span v-if="item.PHONE_WORK_IN">{{ item.PHONE_WORK_IN }}</span>
        <span v-else>не указано</span>
      </span>
      <span class='col-5 text-center ellipsis-2-lines bg-white' >{{ working(item.WORK)[0] }}
        <q-tooltip  content-class="bg-blue-grey text-caption text-white ellipsis-2-lines" 
                    anchor="top middle" self="bottom middle" 
                    :offset="[5, 5]" v-if="working(item.WORK).length > 1"
        >{{ working(item.WORK)[1] }}</q-tooltip>
      </span>
    </div>
    <q-menu touch-position style="width: 250px">
      <div class="OpenSansBold column no-wrap justify-center items-center q-pa-lg">
        <q-avatar square size="220px" class="outlined">
          <img :src="getPhotoUrl(item.EMP_ID)" width="220px" />
        </q-avatar>
        <div
          class="text-weight-bolder text-body1 ellipsis-3-lines text-center q-mt-md"
          style="font-size: 16px; width: 220px"
        >{{decode(item.LAST_NAME)+' '+decode(item.FIRST_NAME)+' '+decode(item.MIDDLE_NAME)}}</div>
        <q-separator class="q-my-md" />
        <div class="column q-mb-md no-wrap items-center" style="font-size: 14px">
          <div class="row no-wrap items-center">
            <q-icon name="card_giftcard" size="20px" color="red-7" />
            <span class="q-ml-xs">День рождения</span>
          </div>
          <span>{{ DIngo(item) }}</span>
        </div>
        <q-btn rounded push class="row no-wrap" color="white">
          <q-icon color="primary" name="perm_contact_calendar" size="20px" />
          <label
            class="text-primary q-ml-xs cursor-pointer"
            style="font-size:12px"
          >Добавить в контакты</label>
        </q-btn>
        <div class="row no-wrap q-my-md justify-between" style="font-size: 12px">
          <q-btn class="q-mr-md row no-wrap" color="primary">
            <q-icon color="white" name="forum" size="20px" />
            <label class="text-white q-ml-xs cursor-pointer" style="font-size:12px">Чат</label>
          </q-btn>
          <q-btn class="row no-wrap" color="primary">
            <q-icon color="white" name="email" class="q-mr-xs" size="20px" />
            <label class="text-white q-ml-xs cursor-pointer" style="font-size:12px">Письмо</label>
          </q-btn>
        </div>
      </div>
    </q-menu>
  </div>
</template>

<script>
import CommonUtils from "./../shared/utils/CommonUtils";
import UserService from "./../services/user.service";
import { mapState } from "vuex";

export default {
  name: "UserCard",
  data() {
    return {
      mail: "mailto:",
      tooltipStyle: {
        background: "#fff",
        color: "#000",
        border: "1px solid #ccc"
      }
    };
  },
  props: {
    itemData: {
      type: Object,
      default: null
    },
    view: {
      type: String
    }
  },

  created() {
    // console.log(this.view)
  },
  computed: {
    item() {
      return this.itemData;
    }
  },
  methods: {
    working(e) {
      if(e.search(/<br>/)) {
        return e.split(/<br>/);
      }
      return e;
    },
    decode(param) {
      return CommonUtils.decoder(param);
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    },
    DIngo(i) {
      if (i) {
        var monthNames = [
          "Январь",
          "Февраль",
          " Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь"
        ];
        return (
          i.BIRTH_DATE.slice(-2) +
          " " +
          monthNames[Number(i.BIRTH_DATE.slice(5, 7))]
        );
      } else {
        return i.BIRTH_DATE;
      }
    }
  }
};
</script>

<style>
@font-face {
  font-family: "OpenSansBold";
  src: url("~assets/fonts/OpenSans-Regular.ttf") format("truetype");
}
.OpenSansBold {
  font-family: "OpenSansBold";
  font-weight: 500;
}
.cardBgInner {
  height: 100%;
  background: url("./../assets/images/naqsh.png") repeat-y 5px 0;
}
.avatar_img {
  max-height: 110px;
  border: 1px #c2ccdc solid;
  overflow: hidden;
}
.height_auto {
  height: auto;
}
.img_size {
  width: 75px;
  padding: 0 5px;
  color: #868686;
  font-size: 11px;
}
.off {
  background: red;
}
.img_size img {
  width: 100%;
  height: auto;
  vertical-align: bottom;
}
.card_content,
.block_icons {
  display: flex;
}
.block_icons {
  flex-direction: column;
  justify-content: center;
  padding: 5px;
}
.block_icons button {
  margin: 5px 0;
}
.card_content {
  padding: 5px 5px 5px 30px;
}
.post_name {
  color: #7784a3;
  font-size: 11px;
}
.block_phones {
  color: #000;
  font-size: 12px;
  padding: 10px 0;
}
.card_bg {
  height: 100%;
  background: url("./../assets/images/ornament_ugl.png") no-repeat right bottom;
}
.card_text {
  color: #000d72;
  padding: 5px;
}
.material-icons {
  color: #868686;
}
.q-chip {
  margin-left: 0;
}
.bedge {
  position: absolute;
  bottom: 5%;
  right: 0;
  border: 1px solid #ffffff;
  border-radius: 50px;
  width: 10px;
  height: 10px;
}
</style>
