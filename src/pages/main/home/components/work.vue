<template>
  <div class="row q-pa-md">
    <div
      class="col topBlock items-center q-ma-md"
      v-for="(w, i) in data"
      :key="i"
    >
      <div :class="'icon ' + colors[i]">
        <q-icon :name="icons[i]" size="md"/>
      </div>
      <div class="info">
        <b>{{w.title}}</b>
        <span>{{w.value}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      data: [],
      colors: ['ibOne', 'ibTwo', 'ibThree', 'ibFour'],
      icons: ['whatshot', 'assignment', 'assignment_ind', 'assignment_turned_in']
    }
  },
  computed: {
    empId (){
      return this.$store.getters["auth/empId"]
    },
  },
  mounted (){
    axios
        .get("/tasks/count")
        .then(response => {
            this.data = response.data
        })
        .catch(error => {
            console.log('error')
        });
  }
}
</script>
<style scoped>
@font-face {
    font-family: 'OpenSans';
    src: url(../../../../assets/fonts/OpenSans-Regular.ttf);
  }

  .topBlock {
    background: #fff;
    padding: 30px;
    display: flex;
    border-radius: 5px;
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
  }
  .icon {
    width: 60px;
    height: 60px;
    background: #EEF4FF;
    color: #0054FE;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info {
    padding-left: 22px;
  }
  .info b {font-size: 14px;}
  .info span {
    padding-top: 5px;
    font-size: 14px;
    color: #0054FE;
    display: block;
  }
  .ibTwo {
    background: #EDF8FF;
    color: #4AB8FF
  }
  .ibThree {
    background: #FEFAE9;
    color: #FDCC0C
  }
  .ibFour {
    background: #FFEEF2;
    color: #FD5181
  }
</style>
