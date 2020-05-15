<template>
<div class="global" ref="global" :style="{height: heightGlobalBlock+'px'}">
    <div class="left" :style="{width: leftWidth()}">
      <div
        v-for="(g, index) in grid()"
        :key="index"
        :style="{height: grafBlockHight(g)}"
      >
        <span>{{formatNum(g)}}</span>
      </div>
    </div>



    <div class="content" :style="{height: heightGlobalBlock+'px'}">
      <div
        class="centerBlock"
        v-for="(block, i) in graf"
        :key="i+block"
        :style="widthBlock()"
      >
        <div
          class="block"
          v-for="(b, e) in block"
          :key="e"
          :style="{height: grafBlockHight(b), width: widthMinBlock(), backgroundColor: bColor(e)}"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              сумма: {{formatNum(b)}}
          </q-tooltip>
        </div>
        <div v-if="months" class="blockMonth">
            {{months[i]}}
          </div>
      </div>

      <div
        class="gridTable"
        v-for="(gTab, k) in grid()"
        :key="k+gTab"
        :style="{height: gridTableHeight(gTab)}"
      >
      </div>
    </div>

    <div v-if="names" class="right">
      <div
        class="rightBlock"
        v-for="(n, s) in names"
        :key="s+n"
      >
        <div
          class="colorBg"
          :style="{background: color[s]}"
        ></div>
        <div class="textR">{{n}}</div>
      </div>
    </div>

  </div>


<!-- <div class="grafGlobal">
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
</div> -->
</template>

<script>

export default {
    props: ['tables', 'title'],
    data () {
        return {
            graf: [
                // [2320105, 4640210, 2982754, 405460, 8348529],
                // [2320100, 4347748, 3078879, 3078879, 9152187],
                // [959000, 0, 4185536, 405460, 5549996],
                // [2320100, 4347748, 3078879, 3078879, 7152187],
                // [959000, 0, 4185536, 405460, 5549996],
                // [2320100, 4347748, 3078879, 3078879, 5152187],
                [10, 3, 6, 7, 22],
                [10, 3, 6, 7, 22],
                [10, 3, 6, 7, 22],
                [10, 3, 6, 7, 22],
                [10, 3, 6, 7, 22],

            ],
            months: null,
            names: null,
            color: ['red', 'green', 'grey', 'blue', 'orange'],
            heightGlobalBlock: 200,

        }
    },
    mounted (){
        this.graf = this.tables.graf
        if(this.tables.months) this.months = this.tables.months
        if(this.tables.heightGlobalBlock) this.heightGlobalBlock = this.tables.heightGlobalBlock
        this.names = this.tables.names
    },

    methods: {
        // blockDiv (num){
        //     const height = num / this.constProc + 'px'
        //     const width = 100 / this.countNums + '%'
        //     return `width: ${width}; height: ${height};`
        // },
        // ggrid (num) {

        //     const height = num / this.constProc + 'px'
        //     // console.log(num)
        //     return `height: ${height};`
        // },

        bColor (num){
          return this.color[num]
        },
        widthBlock () {
          const width = 100 / this.graf.length - 4 + '%'
          return `width: ${width}`
        },
        widthMinBlock () {
          const width = 100 / this.graf.length + '%'
          return width
        },
        maxNum () {
            let arr = []
            console.log(this.graf.length)
            for(let i=0; i < this.graf.length; i++) {
                for(let e=0; e < this.graf[i].length; e++){
                    arr.push(this.graf[i][e])
                }
            }
            return Math.max.apply(null, arr)
        },
        grid (){
            let maxNum = this.maxNum()

            let numMin = ['1']
            for (let i=1; i < String(maxNum).length; i++){
                numMin.push('0')
            }

            let resMaxNum = maxNum / Number(numMin.join(''))

            if(String(resMaxNum)[2]>=5){
                resMaxNum = Number(String(resMaxNum)[0])+1
            } else if (String(resMaxNum)[2]>0) {
                resMaxNum = Number(String(resMaxNum)[0]+ '.' + '5')
            } else {
                resMaxNum = Number(String(resMaxNum)[0])
            }

            if(String(maxNum).length == 1) {
                if(resMaxNum >= 5) {
                    resMaxNum = 10
                } else {
                    resMaxNum = 5
                }
            }  else {
                if(resMaxNum >= 3 && resMaxNum < 5) {
                    resMaxNum = 5
                } else if (resMaxNum > 5 && resMaxNum < 10) {
                    resMaxNum = 10
                } else if (resMaxNum == 1) {
                    resMaxNum = resMaxNum+0.5
                }
            }

            let del = resMaxNum < 10 ? (resMaxNum * 10) / 5 : resMaxNum / 5
            if(del > 4) del = 5

            if(numMin.length>1) resMaxNum *= Number(numMin.join(''))

            let delArr = [0]
            for(let i = 0; i < del; i++) {
            delArr.push(delArr[i] + resMaxNum / del)
            }

            return delArr
        },
        grafBlockHight (num) {
          const proc = Math.max.apply(null, this.grid()) / this.heightGlobalBlock
          return num / proc + 'px'
        },
        gridTableHeight (num) {
          const proc = Math.max.apply(null, this.grid()) / this.heightGlobalBlock
          return num / proc + 'px'
        },
        leftWidth () {
          const num = String(this.maxNum()).length
          return Number(num) * 10 + 'px'
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
.global {
  width: 100%;
  height: 300px;
  display: flex;
  margin-bottom: 15px;
  padding-right: 20px;
}
.content {
  flex-grow: 10;
  height: 300px;
  min-width: 100px;
  display: flex;
  align-items:flex-end;
  justify-content:space-around;
  position: relative;
  border-bottom: 1px #000 solid;

}
.centerBlock {
  display: flex;
  width: 50px;
  align-items:flex-end;
  position: relative;
}
.block {
  background: #ccc;
  height: 50px;
  border-right: 1px #fff solid;
  z-index: 1;
}
.blockMonth {
  position: absolute;
  left: 0;
  bottom: -20px;
  font-size: 11px ;
}
.left {
  width: 100px;
  position: relative;
  font-size: 11px;
}
.left div {
  height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  text-align: right;
}
.left div span {
  position: relative;
  top: -10px;
  padding-right: 10px;
}
.gridTable {
  border-top: 1px #ccc solid ;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.right {
  width: 120px;
  font-size: 11px;
}
.rightBlock {
  display: flex;
  margin-bottom: 5px;
}
.colorBg {
  width: 30px;
  height: 15px;
  margin: 0 10px;
}
    /* .grafGlobal {
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
    } */

</style>
