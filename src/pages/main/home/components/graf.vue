<template>
<div class="grafGlobal">
    <div class="text-subtitle2" style="padding-left:80px"><b>{{title}}</b></div>
    <div class="graf">        
        <div 
        v-for="(g, f) in ggrids"
        :key="g[f]"
        :style="ggrid(g)"
        class="grafGrid">
            <div>{{formatNum(g)}}</div>
        </div>
        

        <div 
            class="graf_block"
            :style="{width: widthBlocks}"
            v-for="(b, i) in graf"
            :key="b[i]"
            >
            <span class="month">{{months[i]}}</span>
            <div 
                
                v-for="(o, e) in b"
                :key="o[e]"
                :style="blockDiv(o)"
                :class="b.length > 1? color[e] : color[i]"
                >

                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    сумма: {{formatNum(o)}}
                </q-tooltip>
            </div>            
        </div>

        <div class="colors">
            <div 
                class="row"
                v-for="(c,e) in names"
                :key="e"
            >
                <div class="col-6 box">
                    <div :class="color[e]"></div>
                </div>
                <div class="col-6">{{c}}</div>
            </div>
        </div>        
    </div>
</div>
</template>

<script>

export default {
    props: ['tables', 'title'],
    data () {
        return {
            graf: [                
                [2320105, 4640210, 2982754, 405460, 10348529],
                [2320100, 4347748, 3078879, 3078879, 10152187],
                [959000, 0, 4185536, 405460, 5549996],
                [2320100, 4347748, 3078879, 3078879, 10152187],
                [959000, 0, 4185536, 405460, 5549996],
                [2320100, 4347748, 3078879, 3078879, 10152187],
                // [10, 3, 6, 7, 22],
                // [10, 3, 6, 7, 22],
                // [10, 3, 6, 7, 22],
                // [10, 3, 6, 7, 22],
                // [10, 3, 6, 7, 22],
                
            ],
            months: ['Март','Февраль','Январь','Декабрь','Ноябрь','Октябрь'],
            names: ['Аванс', 'Премия', 'Зарплата', 'Питание', 'Сумма'],
            color: ['red', 'green', 'blue', 'orange', 'grey'],
            maxNum: null,
            countNums: null,
            widthBlocks: null,
            constProc: null,
            ggrids: [0]
        }
    }, 
    mounted (){
        
        
        this.graf = this.tables.graf
        this.months = this.tables.months
        this.names = this.tables.names


        const arr=[]
        for(let i=0; i < this.graf.length; i++){
            for(let e=0; e < this.graf[i].length; e++){
                arr.push(this.graf[i][e])
            }
        }
        this.maxNum = Math.max.apply(null, arr)
        
        // this.maxNum = 15000000
        this.countNums = this.graf[0].length            
        this.widthBlocks = 100 / this.graf.length - 6 + '%'
        this.constProc = this.maxNum / 120

        const numArr = String(this.maxNum).split('')
        const num = ['1']

        let endPoint = 0
        let points = []

        for(let i=2; i < numArr.length; i++){
                num.push('0')
            }
         
        let numMax = 0
        if(numArr.length > 1){
           numMax = Number(numArr[0]+numArr[1])
        } else {
            numMax = Number(numArr[0])
        }
        

        const ggrid = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
        const ggridTwo = [2.5,5,7.5,10]
        for (let i=0; i < ggrid.length; i++){
                if(ggrid[i] > numMax) {
                    endPoint = ggrid[i]
                    break;
                } 
            }  
        
        
        if(numMax < 10) {
            for (let i=0; i < ggridTwo.length; i++){
                if(ggridTwo[i] > numMax) {
                    endPoint = ggridTwo[i]
                    break;
                } 
            }  
        } 
        

        if(numMax >= 10) {
            ggrid.forEach(el => {
                if(el <= endPoint) {
                    if (this.maxNum.length > 2) {
                        this.ggrids.push(el)
                    } else {
                        this.ggrids.push(el * Number(num.join("")))
                    }                  
                }
            })  
        } else {
            ggridTwo.forEach(el => {
                if(el <= endPoint) {
                    if (this.maxNum.length > 2) {
                        this.ggrids.push(el)
                    } else {
                        this.ggrids.push(el * Number(num.join("")))
                    }                  
                }
            })  
        }
        
    },
    
    methods: {
        blockDiv (num){
            const height = num / this.constProc + 'px'
            const width = 100 / this.countNums + '%'
            return `width: ${width}; height: ${height};`
        },
        ggrid (num) {
            const height = num / this.constProc + 'px'
             return `height: ${height};`
        },
        formatNum (str) {
            str = String(str)
            // str = str.replace(/(\.(.*))/g, '');
            var arr = str.split('');
            var str_temp = '';
            if (str.length > 3) {
                for (var i = arr.length - 1, j = 1; i >= 0; i--, j++) {
                    str_temp = arr[i] + str_temp;
                    if (j % 3 == 0) {
                        str_temp = ',' + str_temp;
                    }
                }
                return str_temp;
            } else {
                return str;
            }
        }
    }
}
</script>

<style scoped>
    .grafGlobal {
        padding: 20px 0;
    }
    .graf {
        height: 200px;        
        margin: 0 120px 0 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-end;
        border-bottom: 1px #000 solid;
        position: relative;
    }
    .red {background: red;}
    .green {background: #7cb342;}
    .grey {background: #9129a3;}
    .blue {background: #1276c9;}
    .orange {background: #ff8f00;}

    .graf_block {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 20%;
        position: relative;
        z-index: 1000;
    }
    .graf_block div {
        width: 30%;
        height: 50px;
        border-left: 1px #fff solid;
    }
    .grafGrid {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;        
        border-top: 1px #e0e0e0 solid;       
    }
    .grafGrid div {
        position: absolute;
        left: -110px;
        top: -10px;
        text-align: right;
        width: 100px;
        font-size: 12px;
    }
    .month {
        position: absolute;
        left: 0;
        bottom: -20px;
        font-size: 11px;
    }
    .colors {
        position: absolute;
        right: -80px;
        top: 0;
        font-size: 12px;
        width: 60px;
        padding-top: 20px;
    }
    .box div {
        height: 15px;
        margin: 0 5px 5px 0;
    }
    
</style>