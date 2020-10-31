<template>
  <div class="col-12">
      <div  v-for="(n) in datas"
            :key="n.title">
        <template v-if="!n.data.header">
          <q-card class="row OpenSansBold q-my-md">
            <div  class="q-pa-md text-h5" v-if="n.data.data !== null">
              {{n.title}}
            </div>
            <div class="col-12 q-pa-md">
              <div  class="block_global" v-for="(d, key, index) in n.data" :key="index">
                <div  class="left_bg" v-html="titles[key]"></div>
                <div  class="right_bg" v-html="d"></div>
              </div>
            </div>
          </q-card>
        </template>
        <template v-else>
          <q-card class="row OpenSansBold q-my-md">
            <div class="q-pa-md text-h5"  v-if="n.data.data !== null">{{n.title}}</div>
              <div class="col-12 q-pa-md" v-for="(b, i) in n.data.data" :key="i">
                <div class="block_global" v-for="(h, index) in b" :key="index">
                  <div  class="left_bg" v-html="n.data.header[index]"></div>
                  <div  class="right_bg" v-html="b[index]" ></div>
                </div>
              </div>
          </q-card>
        </template>
      </div>
    </div>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      datas: [],
      titles: {
        OBRAZ_NAME: 'Образование',
        UCH_STEP_NAME: 'Ученная степень',
        UCH_ZVN_NAME: 'Ученное звание',
        BANK_SPEC: 'Банковскую спец-ность',
      },
      icons: ['school', 'layers', 'public', 'call_made']
    }
  },
  computed: {
    ...mapGetters({
      emp_id: "auth/empId"
    }),

  },
  created () {
    axios
      .get("/emps/data/education?uid=" + this.emp_id)
      .then(response => {
        this.datas = response.data
      })
      .catch(error => {
          console.log('error')
      });
  },
  methods: {
    detail(i) {
      console.log(i);
    }
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
  .left_bg {
    background: #F8FAFF;
    color: #122E9C;
    padding: 3px 10px;
    float: left;
    border-radius: 15px;
    max-width: 49%;
  }
  .right_bg {
    float: right;
    background: #fff;
    color: #273959;
    padding: 3px 10px;
    border-radius: 15px;
    max-width: 49%;
  }
  .block_global {
    float: left;
    width: 100%;
    background: url('~assets/images/table_dot.svg') repeat-x;
    background-position: 0 12px;
    margin: 5px 0;
  }

</style>
