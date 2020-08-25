<template>
  <div  class="row no-wrap q-pa-md text-baseline justify-between  items-center OpenSansBold"
        style="font-size: 16px; line-height: 40px; display:flex; flex:auto; justify-content:space-between; color:#30384B"
        @click="DIngo(item)">
    <div class="col-3 row no-wrap">
      <q-avatar size="40px">
        <img :src="getPhotoUrl(item.EMP_ID)" width="40px" />
        <span class="bg-positive bedge" >&nbsp;</span>
      </q-avatar>
      <div class="text-no-wrap text-weight-bolder q-ml-md">
        {{ decode(item.LAST_NAME) }}
        {{ decode(item.FIRST_NAME).slice(0, 1) }}.
        {{decode(item.MIDDLE_NAME).slice(0, 1)}}.
        <q-tooltip  content-class="bg-blue-grey text-caption text-white"
                    anchor="center right" self="center left" 
                    :offset="[10, 10]">
        {{decode(item.LAST_NAME)+' '+decode(item.FIRST_NAME)+' '+decode(item.MIDDLE_NAME)}}
        </q-tooltip>
      </div>
    </div>
    <div class="col text-no-wrap text-center text-weight-bolder">
      {{ decode(item.POST_NAME).slice(0, 35) }}
      <q-tooltip  content-class="bg-blue-grey text-caption text-white ellipsis-2-lines" 
                  anchor="top middle" self="bottom middle" 
                  :offset="[5, 5]">
          {{decode(item.POST_NAME)}}
        </q-tooltip>
    </div>
    <div class="col row ellipsis justify-between text-weight-bolder">
      <span class="col row justify-between no-wrap text-center text-no-wrap">
        <span>{{ item.PHONE_WORK }}</span>
        <span>(18:88)</span>
      </span>
      <span class="col-4 text-center ellipsis-2-lines bg-white">{{ item.WORK }}</span>
    </div>
  </div>
</template>

<script>
import CommonUtils from "./../shared/utils/CommonUtils";
import UserService from "./../services/user.service";

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
    decode(param) {
      return CommonUtils.decoder(param);
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    },
    DIngo(i) {
      // console.log();
    }
  }
};
</script>

<style>
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
