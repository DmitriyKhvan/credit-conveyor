<template>
  <div class="card_bg">
    <div v-if="item" class="cardBgInner">
      <!-- MY Block -->

      <div class="row">
        <div class="col-10 card_content">
          <div class="row">
            <div class="col-4 img_size">
              <div
                :class="
                  !view && view !== 'dialog'
                    ? 'avatar_img'
                    : 'avatar_img height_auto'
                "
              >
                <img :src="getPhotoUrl(item.EMP_ID)" />
              </div>
              <div v-if="!view">{{ item.WORK }}</div>
            </div>
            <div class="col-8 card_text">
              <div>
                <div v-if="!view && view !== 'dialog'">
                  <q-chip square color="teal" text-color="white" size="xs"
                    >онлайн</q-chip
                  >
                </div>
                {{ decode(item.LAST_NAME) }}
                {{ decode(item.FIRST_NAME).slice(0, 1) }}.{{
                  decode(item.MIDDLE_NAME).slice(0, 1)
                }}.
              </div>
              <div class="post_name">
                <div v-if="!view && view !== 'dialog'">
                  {{ decode(item.POST_NAME) }}
                </div>
                <div v-else>
                  {{ decode(item.POST_NAME).slice(0, 20) }}...
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    {{ decode(item.POST_NAME) }}
                  </q-tooltip>
                </div>
              </div>
              <div v-if="!view" class="block_phones">
                <q-item-label>
                  <q-icon name="o_local_phone" />
                  &nbsp;{{ item.PHONE_WORK }}
                </q-item-label>
                <q-item-label>
                  <q-icon name="stay_primary_portrait" />
                  &nbsp;{{ item.PHONE_WORK }}
                </q-item-label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!view" class="col-2 block_icons">
          <q-btn color="grey-3" size="sm" icon="contact_phone">
            <q-tooltip
              anchor="center right"
              self="center left"
              :content-style="tooltipStyle"
            >
              Добавить в личную адресную книгу
            </q-tooltip>
          </q-btn>
          <q-btn color="grey-3" size="sm" icon="mail">
            <q-tooltip
              anchor="center right"
              self="center left"
              :content-style="tooltipStyle"
            >
              Отправить письмо
            </q-tooltip>
          </q-btn>
          <q-btn color="grey-3" size="sm" icon="card_giftcard">
            <q-tooltip
              anchor="center right"
              self="center left"
              :content-style="tooltipStyle"
            >
              День рождения 2 августа
            </q-tooltip>
          </q-btn>
          <q-btn color="grey-3" size="sm" icon="chat">
            <q-tooltip
              anchor="center right"
              self="center left"
              :content-style="tooltipStyle"
            >
              Написать в чат
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <!-- <div class="row card_bg">          
          <div class="col-10 card_content"> 
            <div class="row">           
              <div :class="!view && view !== 'dialog' ? 'col-md-4 img_size' : 'col-md-4 col-xs-12 col-sm-12 img_size'">
                <div :class="!view && view !== 'dialog' ? 'avatar_img' : 'avatar_img height_auto'">
                  <img :src="getPhotoUrl(item.EMP_ID)"/>
                </div>
                <div v-if="!view">{{item.WORK}}</div>
              </div>
              <div :class="!view && view !== 'dialog' ? 'col-md-8 card_text' : 'col-md-8 col-xs-12 col-sm-12 card_text'">
                <div>
                    <div v-if="!view && view !== 'dialog'" ><q-chip square color="teal" text-color="white" size="xs">онлайн</q-chip></div>
                    {{ decode(item.LAST_NAME) }} {{ decode(item.FIRST_NAME).slice(0,1) }}.{{ decode(item.MIDDLE_NAME).slice(0,1) }}.
                </div>
                <div class="post_name">
                  <div v-if="!view && view !== 'dialog'">
                    {{ decode(item.POST_NAME) }}
                  </div>
                  <div v-else>
                    {{ decode(item.POST_NAME).slice(0,20) }}...  
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      {{ decode(item.POST_NAME) }}
                    </q-tooltip>
                  </div>                  
                </div>
                <div v-if="!view" class="block_phones">
                  <q-item-label>
                    <q-icon name="o_local_phone" />
                    &nbsp;{{ item.PHONE_WORK }}
                  </q-item-label>
                  <q-item-label>
                    <q-icon name="stay_primary_portrait" />
                    &nbsp;{{ item.PHONE_WORK }}
                  </q-item-label>
                </div>
              </div>            
            </div>
          </div>
          <div v-if="!view" class="col-2 block_icons">
            <q-btn color="grey-3" size="sm" icon="contact_phone">
              <q-tooltip anchor="center right" self="center left" :content-style="tooltipStyle">
                Добавить в личную адресную книгу
              </q-tooltip>
            </q-btn>
            <q-btn color="grey-3" size="sm" icon="mail">
              <q-tooltip anchor="center right" self="center left" :content-style="tooltipStyle">
                Отправить письмо
              </q-tooltip>
            </q-btn>
            <q-btn color="grey-3" size="sm" icon="card_giftcard">
              <q-tooltip anchor="center right" self="center left" :content-style="tooltipStyle">
                День рождения 2 августа
              </q-tooltip>
            </q-btn>
            <q-btn color="grey-3" size="sm" icon="chat">
              <q-tooltip anchor="center right" self="center left" :content-style="tooltipStyle">
                Написать в чат
              </q-tooltip>
            </q-btn>
          </div>
        </div> -->
      <!-- End MY Block -->

      <!-- BOY CARD -->
      <!-- <div v-if="item.GENDER === 'M'">
        
        <q-card-section
          class="bg-primary text-white"
          style="padding: 5px 5px 5px 10px;"
        >
          <div class="text-subtitle1">
            <q-icon
              name="o_star_border"
              size="25px"
              color="yellow-14"
              v-if="item.WORK_POSITION === 1"
            />
            &nbsp;{{
              decode(item.LAST_NAME) +
                " " +
                decode(item.FIRST_NAME) +
                " " +
                decode(item.MIDDLE_NAME)
            }}&nbsp;
          </div>
        </q-card-section>
        <q-item style="padding: 0 5px 5px 10px;">
          <q-item-section avatar>
            <q-avatar square style="width: 80px; height: 100px">
              <img :src="getPhotoUrl(item.EMP_ID)" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="padding: 0 5px 5px 10px;">
            <q-item-label>
              <b>{{ decode(item.POST_NAME) }}</b>
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_mail" />&nbsp;
              <a
                :href="mail + item.MAIL_ADDRESS"
                style="text-decoration: none;"
                >{{ item.MAIL_ADDRESS }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section
          class="bg-primary text-white"
          style="padding: 1px 5px 1px 5px;"
        ></q-card-section>
      </div> -->
      <!-- GIRL CARD -->
      <!-- <div v-else>
        <q-card-section
          class="bg-purple text-white"
          style="padding: 5px 5px 5px 10px;"
        >
          <div class="text-subtitle1">
            {{
              decode(item.LAST_NAME) +
                " " +
                decode(item.FIRST_NAME) +
                " " +
                decode(item.MIDDLE_NAME)
            }}
          </div>
        </q-card-section>
        <q-item style="padding: 0 5px 5px 10px;">
          <q-item-section avatar>
            <q-avatar square style="width: 80px; height: 100px">
              <img :src="getPhotoUrl(item.EMP_ID)" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="padding: 0 5px 5px 10px;">
            <q-item-label>
              <b>{{ decode(item.POST_NAME) }}</b>
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_mail" />&nbsp;
              <a
                :href="mail + item.MAIL_ADDRESS"
                style="text-decoration: none;"
                >{{ item.MAIL_ADDRESS }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section
          class="bg-purple text-white"
          style="padding: 1px 5px 1px 5px;"
        ></q-card-section>
      </div> -->
      <!-- Girl CARD END-->
    </div>

    <div v-else>
      <img src="./../assets/statics/default-avatar.png" style="width:100%" />
      <!-- <img src="../assets/statics/logoNew.png" /> -->
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
}</style
>>
