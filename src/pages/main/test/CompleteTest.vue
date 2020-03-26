<template>
    <div class="q-pa-lg q-col-gutter-lg topicBlock">
        <div class="row">
            <div class="col text-h5">
                {{topicName}}
            </div>
            <div class="col">
                
            </div>
        </div>
        
        <div class="row justify-center q-mt-lg">
            <div class="col-10 q-pa-lg bg-grey-3 completeBlockBg">
                <div class="row">
                    <div class="col-2 text-center ">
                        <q-avatar size="100px">
                            <img :src="getPhotoUrl(empId)" />
                        </q-avatar>
                        <div class="text-subtitle1 text-weight-bold lineHeightNormal q-pb-md">{{ fullName}}</div>
                    </div>
                    <div class="col-10 q-pb-lg text-center text-h5">
                        <div class="q-pb-md">Поздравляем, Вы успешно сдали тест!</div>
                        Желаем Вам больших успехов, больших достижений в жизни,<br>
                        дальнешей работе в пути процветания нашего Банка!
                    </div>
                </div>
                <div class="row q-gutter-lg">
                    <div class="col-lg-2 col-md-5 bg-white q-pa-md text-center">
                        <q-circular-progress
                            show-value
                            font-size="11px"
                            :value="resRightProcentCount()"
                            size="130px"
                            :thickness="0.22"
                            color="green-6"
                            track-color="grey-4"
                            class="q-ma-md "
                        >
                        Ваш результат
                        <span class="resultText text-green-6">{{ resRightProcentCount() }}%</span>
                        </q-circular-progress>
                    </div>
                    <div class="col-lg-2 col-md-5 bg-white  q-pa-md text-center">
                        <q-circular-progress
                            show-value
                            font-size="11px"
                            :value="effect"
                            size="130px"
                            :thickness="0.22"
                            color="green-6"
                            track-color="grey-4"
                            class="q-ma-md"
                        >
                        Эффективность
                        <span class="resultText text-green-6">{{ effect }}%</span>
                        </q-circular-progress>
                    </div>
                    <div class="col-lg-4 col-md-6 bg-white">
                        <div class="row q-pa-md">
                            <div class="col">
                                <div v-for="(e, index) in resResult" :key="index" :class="resClass(e)"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 q-pl-md">
                                Правильные ответы: <b>{{resRight}}</b><br>
                                Неправильные ответы: <b>{{resWrong}}</b><br>
                                Не ответили: <b>{{resNotMarked}}</b>
                            </div>
                            <div class="col-6">
                                <GChart
                                    type="ColumnChart"
                                    :data="chartData"
                                    :options="chartOptions"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-5 bg-white q-pa-md">
                        <div class="row">
                            <div class="col-6">
                                <div class="text-subtitle1 text-weight-bold">Общее время</div>
                                <div><span class="text-subtitle1 text-weight-bold text-green-6">0</span> час</div>
                                <div><span class="text-subtitle1 text-weight-bold text-green-6">42</span> минут</div>
                                <div><span class="text-subtitle1 text-weight-bold text-green-6">15</span> секунд</div>
                            </div>
                            <div class="col-6">
                                <q-circular-progress
                                    show-value
                                    font-size="11px"
                                    :value="effect"
                                    size="100px"
                                    :thickness="0.22"
                                    color="orange-6"
                                    track-color="grey-4"
                                    class="q-ma-md"
                                >
                                <span class="resultText">1,75</span>
                                </q-circular-progress>
                                <div class="lineHeightNormal text-caption text-center">Среднее время на один вопрос</div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col q-gutter-md text-center">
                <q-btn color="primary" icon="save" label="Сохранить" />
                <q-btn color="primary" icon="print" label="Распечатать" />
                <q-btn color="primary" icon="mail" label="Отправить" />
            </div>
        </div>
    </div>
    
</template>
<script>
import { GChart } from "vue-google-charts";
import UserService from "../../../services/user.service";

export default {
    
    data() {
        return {
            result: 83,
            effect: 65,
            tab: 0,
            fullName: this.$store.getters["auth/fullName"],
            empId: this.$store.getters["auth/empId"],

            
            chartOptions: {
                ars: "horizontal",
                height: 130,
                legend: { position: 'none' },
               

            }
        }
    },
    computed: {
        countTrueAnswers() {
            return this.$store.state.education.countTrueAnswers
        },
        quesAmount() {
            return this.$store.state.education.quesAmount
        },
        topicName () {
            return this.$store.getters.getTopicState.topicName
        },
        answerTest () {
            return this.$store.getters.getTopicState.answerTest
        },
        resResult () {
            return this.$store.getters.getTopicState.res
        },
        resRight () {
            return this.resResult.filter(e => e === true).length
        },
        resWrong () {
            return this.resResult.filter(e => e === false).length
        },
        resNotMarked () {
            return this.resResult.filter(e => e === null).length
        },
        chartData () {
            return [
                // ["Year", "Правильно", "Неправильно", "Не ответил",],
                // ["", 17, 6, 2],
                ['', '', { role: 'style' }],                
                ['', this.resRight, 'red'],
                ['', this.resWrong, 'green'], 
                ['', this.resNotMarked, 'grey'], 
                
            ]
        }
    },
    methods: {
        resClass(i) {
            if(i === true) {
                return 'resultCircle q-mr-sm q-mb-sm'
            } else if (i === false) {
                return 'resultCircleWrong q-mr-sm q-mb-sm'
            } else if (i === null) {
                return 'resultCircleNot q-mr-sm q-mb-sm'
            }
            
        },
        resRightProcentCount () {
            const procent = this.resResult.length / 100
            console.log(this.resResult.length)
            return Math.round(this.resRight / procent) 
        },
        getPhotoUrl(emp_id) {
           return UserService.getUserProfilePhotoUrl(emp_id);
        }
    },
    mounted() {
        console.log("store",this.$store.state.education);        
    },
    components: {
        GChart
    },
}
</script>

<style>
    .topicBlock .cardVisible {
        border-bottom: 1px blue solid;
        padding-bottom: 10px;
    }
    .topicBlock .completeBlockBg {
        border: 1px #ccc solid;
    }
    .topicBlock .resultText {
        font-weight: bold;
        font-size: 32px;
        display: block;
        width: 70px;
    }
    .topicBlock .resultCircle, 
    .topicBlock .resultCircleWrong, 
    .topicBlock .resultCircleNot {
        float: left;
        width: 10px;
        height: 10px;
        border-radius: 5px ;
        background: green;
    }
    .topicBlock .resultCircleWrong {background: red;}
    .topicBlock .resultCircleNot {background: grey;}
    .topicBlock .lineHeightNormal {
        line-height: normal;
    }
</style>