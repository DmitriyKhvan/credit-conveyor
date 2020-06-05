<template>
    <div class="column fonts" style="height:100%">
        <q-carousel
            v-model="slides"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            autoplay
            control-color="grey"
            padding
            arrows

            infinite
            class="sliderHome col"
        >
            <q-carousel-slide
                v-for="user in users"
                :key="user.EMP_ID"
                :name="user.LAST_NAME"
                class="column no-wrap items-center q-pa-none q-ma-none"
            >
              <q-avatar size="75px">
                <img :src="photo(user.EMP_ID)" alt="">
              </q-avatar>
              <div class="name" v-html="name(user.LAST_NAME, user.FIRST_NAME, user.MIDDLE_NAME )"></div>
              <div class="postname">
                <span v-html="user.POST_NAME.substring(50, 0)"></span>
                  <span v-if="user.POST_NAME.length > 50">...</span>
                  <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                      v-if="user.POST_NAME.length > 50"
                  >
                      <div v-html="user.POST_NAME"></div>
                  </q-tooltip>
              </div>
              <div class="bithText text-center">
                и еще {{ users.length }} сотрудников отмечают день рождения
              </div>



            <!-- <q-card class="userBirthday">
                <div class="userPad">
                <div v-if="user.get_department_tree" class="blue q-pb-sm text-weight-bold" v-html="filial(user.get_department_tree)"></div>

                <div class="row">
                    <div class="col-4 photo">
                        <img :src="photo(user.EMP_ID)" alt="">
                    </div>
                    <div class="col-8 q-px-sm">
                        <div class="blue text-body2" v-html="name(user.LAST_NAME, user.FIRST_NAME, user.MIDDLE_NAME )"></div>
                        <div class="blueLight text-caption">
                            <span v-html="user.POST_NAME.substring(50, 0)"></span>
                            <span v-if="user.POST_NAME.length > 50">...</span>
                            <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                                v-if="user.POST_NAME.length > 50"
                            >
                                <div v-html="user.POST_NAME"></div>
                            </q-tooltip>
                        </div>
                        <q-item-label class="q-mt-md greyColor">
                            <q-icon name="o_local_phone" />
                            &nbsp;{{ user.PHONE_WORK }}
                        </q-item-label>
                        <q-item-label  class="greyColor">
                            <q-icon name="mail" />
                            &nbsp; {{ user.MAIL_ADDRESS }}
                        </q-item-label>
                    </div>
                </div>
                <div class="row q-pt-md justify-between">
                    <div class="col-4 greyColor vertical-middle">День рождение {{dateFormat(user.BIRTH_DATE)}}</div>
                    <div class="col-8 redColor text-right"><q-icon name="card_giftcard" style="font-size: 1.6em" /></div>
                </div>
                </div>
            </q-card> -->
            </q-carousel-slide>
        </q-carousel>

        <div class="column">

          <div class="text-center">
            <span v-if="datetime === 'today'">Сегодня</span>
            <span v-else-if="datetime === 'tomorrow'">Завтра</span>
            <span v-else>Послезавтра</span>
          </div>
        </div>

        <!-- <div class="text-center q-pa-sm">
            <span class="redColor">{{ users.length }}</span>
            сотрудников отмечают
            <span v-if="datetime === 'today'">сегодня</span>
            <span v-else-if="datetime === 'tomorrow'">завтра</span>
            <span v-else>послезавтра</span>
            Дни родждения
    </div> -->
  </div>
</template>

<script>
import UserService from "./../../../../services/user.service";
import axios from "axios";
export default {
  props: {
    users: {
      type: Array
    },
    datetime: {
      type: String
    },
    slide: {
      type: String
    }
  },
  data() {
    return {
      slides: "",

    };
  },
  created() {
    this.slides = this.slide;


  },
  methods: {
    photo(id) {
      return UserService.getUserProfilePhotoUrl(id);
    },
    filial(name) {
      return name[0].name;
    },
    work(name) {
      let work = "";
      name.forEach((element, i) => {
        if (i !== 0) {
          work += element.name + " / ";
        }
      });
      work = work.slice(0, -2);
      return (work = work.length > 50 ? work.slice(0, 50) + "..." : work);
    },
    workFull(name) {
      let work = "";
      name.forEach((element, i) => {
        if (i !== 0) {
          work += element.name + " / ";
        }
      });
      return work.slice(0, -2);
    },
    name(last, fist, middle) {
      return last + " " + fist
    },
    dateFormat(day) {
      let newDay = new Date(day);
      let month = newDay.getMonth();
      const monthName = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];
      return newDay.getDate() + " " + monthName[month];
    }
  }
};
</script>

<style>
@font-face {
    font-family: 'OpenSans';
    src: url(../../../../assets/fonts/OpenSans-Regular.ttf);
  }
.fonts {
  font-family: 'OpenSans';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #20253A;
}
.name {
  font-size: 16px;
  padding: 15px 0 5px;
  font-weight: bold;
}
.postname {
  font-style: italic;
  color: #0054FE
}
.bithText {
  font-style: italic;
  color: #74798C;
}
  .cardUser {
    display: flex;
    justify-content: center;
  }
  .q-carousel {
    height: auto;
    padding: 0;
    margin: 0;
  }
    .sliderHome .userBirthday {
        width: 100%;
        box-shadow: none;
        background: none;
    }
    .sliderHome .userPad {
        padding: 10px;
        line-height: normal;
    }
    .sliderHome .blue {
        color: #0e3475;
        line-height: normal;
    }
    .sliderHome .blue {
        color: #0e3475;
        line-height: normal;
    }

.sliderHome .blueLight {
  color: #0067cb;
}

.sliderHome .greyColor {
  color: #999;
  font-size: 11px;
}

.sliderHome .redColor {
  color: red;
}



.q-carousel.q-carousel--arrows .q-carousel__slide {
  padding-left: 0;
  padding-right: 0;
}

.sliderHome .q-carousel__prev-arrow {
  display: none;
}
.sliderHome .q-carousel__next-arrow {
  display: none;
}
</style>
