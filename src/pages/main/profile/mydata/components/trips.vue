<template>
  <div class="col-lg-10 col-md-9 col-sm-8 q-pa-lg">

      <div class="row table_border">
        <div class="table_title"><q-icon name="transfer_within_a_station" size="sm" class="q-pr-sm" /> {{titleOne}}</div>

        <table style="width:100%">
          <tr>
            <th
              v-for="(h, i) in headerOne"
              :key="i"
              v-html="h"
            ></th>
          </tr>
          <tr
            v-for="(t, index) in bodyOne"
            :key="index"
          >
            <td
              v-for="(b, e) in bodyOne[index]"
              :key="e"
              v-html="b"
            ></td>
          </tr>
        </table>
      </div>

      <div class="row table_border">
        <div class="table_title"><q-icon name="star" size="sm" class="q-pr-sm" /> {{titleTwo}}</div>

        <table style="width:100%">
          <tr>
            <th
              v-for="(h, i) in headerTwo"
              :key="i"
              v-html="h"
            ></th>
          </tr>
          <tr
            v-for="(t, index) in bodyTwo"
            :key="index"
          >
            <td
              v-for="(b, e) in bodyTwo[index]"
              :key="e"
              v-html="b"
            ></td>
          </tr>
        </table>
      </div>

      <div class="row table_border">
        <div class="table_title"><q-icon name="contacts" size="sm" class="q-pr-sm" /> {{titleThree}}</div>

        <table style="width:100%">
          <tr>
            <th
              v-for="(h, i) in headerThree"
              :key="i"
              v-html="h"
            ></th>
          </tr>
          <tr
            v-for="(t, index) in bodyThree"
            :key="index"
          >
            <td
              v-for="(b, e) in bodyThree[index]"
              :key="e"
              v-html="b"
            ></td>
          </tr>
        </table>
      </div>

    </div>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      titleOne: null,
      titleTwo: null,
      titleThree: null,
      headerOne: null,
      headerTwo: null,
      headerThree: null,
      bodyOne: null,
      bodyTwo: null,
      bodyThree: null
    }
  },
  computed: {
    ...mapGetters({
    emp_id: "auth/empId"
    }),

  },
  created () {
      axios
        .get("/emps/data/awards?uid=" + this.emp_id)
        .then(response => {
          this.titleOne = response.data[0].title
          this.titleTwo = response.data[1].title
          this.titleThree = response.data[2].title
          this.headerOne = response.data[0].header
          this.headerTwo = response.data[1].header
          this.headerThree = response.data[2].header
          this.bodyOne = response.data[0].data
          this.bodyTwo = response.data[1].data
          this.bodyThree = response.data[2].data
        })
        .catch(error => {
            console.log('error', error)
        });
  }

}
</script>
<style scoped>
  .table_bg {
    background: #EAF3FC;
    border-radius: 5px;
  }
  .table_border {
    border: 1px #9FB7CF solid;
    border-radius: 5px;
    position: relative;
    padding: 30px 10px 10px;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .table_title {
    text-transform: uppercase;
    color: #fff;
    background: #5B8AB7;
    border-radius: 5px;
    position: absolute;
    top: -25px;
    left: 10px;
    padding: 10px 15px;
  }
  table, th, td {
  border: 1px solid #9FB7CF;
  border-collapse: collapse;
  }
  th, td {padding: 10px;}
  th {
    background: #EAF3FC;
  }
</style>
