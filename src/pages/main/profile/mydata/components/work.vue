<template>
  <q-scroll-area class="scrollBlock">
    <table style="width:100%">
      <tr>
        <th
          v-for="(h, i) in header"
          :key="i"
          v-html="h"
        ></th>
      </tr>
      <tr
        v-for="(t, index) in body"
        :key="index"
      >
        <td
          v-for="(b, e) in body[index]"
          :key="e"
          v-html="b"
        ></td>
      </tr>
    </table>
  </q-scroll-area>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      header: ['title', 'title'],
      body: [
        ['text', 'text'],
        ['text', 'text'],
      ]
    }
  },
  computed: {
    ...mapGetters({
    emp_id: "auth/empId"
    }),

  },
  created () {
      axios
        .get("/emps/data/works?uid=" + this.emp_id)
        .then(response => {
          this.header = response.data.header
          this.body = response.data.data
        })
        .catch(error => {
            console.log('error')
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
