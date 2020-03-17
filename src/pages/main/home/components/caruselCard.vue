<template>
    <div>
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
            height="260px"
            infinite
        >                
            <q-carousel-slide
            v-for="user in users"
            :key="user.EMP_ID" 
            :name="user.LAST_NAME" 
            class="column no-wrap flex-center"
            >
            <q-card class="userBirthday">
                <div class="userPad">
                <div class="blue q-pb-sm text-weight-bold" v-html="filial(user.get_department_tree)"></div>
                <div class="blueLight q-pb-sm text-weight-bold">
                    <span v-html="work(user.get_department_tree)"></span>
                    <q-tooltip
                        v-if="work(user.get_department_tree).length > 80" 
                        anchor="top middle" 
                        self="bottom middle" 
                        :offset="[10, 10]"
                    >
                        <span v-html="workFull(user.get_department_tree)"></span>
                    </q-tooltip>
                </div>
                <div class="row">
                    <div class="col-3 photo">
                        <img :src="photo(user.EMP_ID)" alt="">
                    </div>
                    <div class="col-9 q-px-sm">
                    <div class="blue text-subtitle1" v-html="name(user.LAST_NAME, user.FIRST_NAME, user.MIDDLE_NAME )"></div>
                    <div class="blueLight" v-html="user.POST_NAME"></div>
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
                    <div class="col greyColor vertical-middle">День рождение {{dateFormat(user.BIRTH_DATE)}}</div>
                    <div class="col redColor text-right"><q-icon name="card_giftcard" style="font-size: 1.6em" /></div>  
                </div>
                </div>                      
            </q-card>
            </q-carousel-slide>
        </q-carousel>
        <div class="text-center q-pa-sm">
            <span class="redColor">{{ users.length }}</span> 
            сотрудников отмечают 
            <span v-if="datetime === 'today'">сегодня</span>
            <span v-else-if="datetime === 'tomorrow'">завтра</span>
            <span v-else>послезавтра</span> 
            Дни родждения</div>
    </div>
</template>

<script>
import UserService from "./../../../../services/user.service";
export default {
    props: {
        users: {
            type: Array
        },
        datetime: {
            type:String
        },
        slide: {
            type:String
        } 
    },
    data () {
        return {
            slides: ''
        }
    },
    created () {
        this.slides = this.slide
    },
    methods: {
        photo (id) {
            return UserService.getUserProfilePhotoUrl(id)
        },
        filial (name) {
            return name[0].name
        },
        work (name) {
            let work = '' 
            name.forEach((element, i) => {
                if(i !== 0) {
                    work += element.name+' / '
                }
            })
            work = work.slice(0, -2)            
            return work = work.length > 80 ? work.slice(0, 80)+'...' : work            
        },
        workFull (name) {
            let work = '' 
            name.forEach((element, i) => {
                if(i !== 0) {
                    work += element.name+' / '
                }
            })
            return work.slice(0, -2)            
            
        },
        name (last, fist, middle) {
            return last + ' ' + fist + ' ' + middle
        },
        dateFormat (day) {
            let newDay = new Date(day)
            let month = newDay.getMonth()
            const monthName = ['января', 'февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
            return newDay.getDate() + ' ' + monthName[month]
        }
    }
}
</script>

<style lang="sass" scoped>
    .userBirthday
        background: url('./../../../../assets/images/naqsh.png') repeat-y 10px 0

    .userPad
        padding: 10px
        padding-left: 45px
        line-height: normal

    .blue
        color: #0e3475
        line-height: normal
    .blue
        color: #0e3475
        line-height: normal

    .blueLight
        color: #0067cb

    .greyColor
        color: #999
        font-size: 11px
    
    .redColor
        color: red  

    .photo
        height: 100px
        overflow: hidden
        border: 1px #ccc solid

    .photo > img 
        width: 100%
        height: auto
        
</style>