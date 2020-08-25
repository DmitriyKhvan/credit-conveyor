<template>
  <table class="full-width">
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
        .get("/emps/data/family?uid=" + this.emp_id)
        .then(response => {
          this.header = response.data.header
          this.body = response.data.body
        })
        .catch(error => {
            console.log('error')
        });
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
  table {
    color: #122E9C;
    border-collapse: collapse;
    font-family: 'OpenSansBold';
  }
  th, td {
  border: 1px solid #b2bdc7;
  }
  th, td {padding: 10px;}
  th {
    background: #F8FAFF;
    color: black;
  }
</style>
