<template>
<div>
    <q-tabs
      v-model="tab"
      no-caps
      class="text-grey q-mx-lg OpenSansBold"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab name="trips" :label="titleOne" />
      <q-tab name="marks" label="Отметки" />
      <q-tab name="electivity" :label="titleTwo" />
      <q-tab name="revards" :label="titleThree" />
    </q-tabs>

    <q-separator class="q-mb-md" />

    <q-tab-panels v-model="tab">
      <q-tab-panel name="trips">
        <q-scroll-area class="scrollBlock q-pr-md">
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
        </q-scroll-area>
      </q-tab-panel>

      <q-tab-panel name="marks">
        <q-scroll-area class="scrollBlock q-pr-md">
          <table style="width:100%">
            <tr>
              <th
                v-for="(h, i) in headerMark"
                :key="i"
                v-html="h"
              ></th>
            </tr>
            <tr
              v-for="(t, index) in bodyMark"
              :key="index"
            >
              <td
                v-for="(b, e) in bodyMark[index]"
                :key="e"
                v-html="b"
              ></td>
            </tr>
          </table>
        </q-scroll-area>
      </q-tab-panel>
      
      <q-tab-panel name="electivity">
        <q-scroll-area class="scrollBlock q-pr-md">
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
        </q-scroll-area>
      </q-tab-panel>
      
      <q-tab-panel name="revards">
        <q-scroll-area class="scrollBlock q-pr-md">
          <table class="full-width">
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
        </q-scroll-area>
      </q-tab-panel>
      
    </q-tab-panels>
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
      bodyThree: null,
      tab: 'trips',
      headerMark: null,
      titleMark: null,
      bodyMark: null
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
          this.bodyThree = response.data[2].data,
          this.headerMark = ['1111', '1122'],
          this.bodyMark = [['1', '2']]
        })
        .catch(error => {
            console.log('error', error)
        });
  }

}
</script>
<style scoped>
  .scrollBlock {
    height: calc(100vh - 130px);
  }
  .table_bg {
    background: #EAF3FC;
    border-radius: 5px;
  }
  .table_border {
    border: 1px #9FB7CF solid;
    border-radius: 5px;
    position: relative;
    padding: 30px 10px 10px;
    margin-top: 25px;
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
