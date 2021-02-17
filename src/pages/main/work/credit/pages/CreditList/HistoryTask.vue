<template>
  <div class="q-px-md">
    <div class="loader" v-if="loader">
      <appLoader />
    </div>
    <q-markup-table v-else separator="cell">
      <thead class="bg-grey-5">
        <tr>
          <th>Номер заявки</th>
          <th>Последние действия</th>
          <th>Филиал</th>
          <th>Отвественный</th>
          <th>Решение</th>
          <th>Время старта</th>
          <th>Время окончания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(history, index) of histories" :key="'history' + index">
          <td>{{ history.applicationId }}</td>
          <td>{{ history.taskName }}</td>
          <td>{{ history.branch }}</td>
          <!-- <td>{{ history.changeUser }}</td> -->
          <td>{{ history.fio }}</td>
          <td>{{ history.currentStatus }}</td>
          <td>{{ history.dateTimeCreate | formData("datetime") }}</td>
          <td>{{ history.dateTimeChange | formData("datetime") }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import axios from "axios";
import CommonUtils from "@/shared/utils/CommonUtils";
import Loader from "@/components/Loader";

import formData from "../../filters/formatDate";
import sortData from "@/shared/filters/sortData"

export default {
  data() {
    return {
      loader: true,
      histories: []
    };
  },
  async created() {
    // если перезагрузили страницу
    if (!axios.defaults.headers.common["BPMCSRFToken"]) {
      this.userRole = sessionStorage.getItem("userRole");
      await this.$store.dispatch(
        "credits/setHeaderRole",
        sessionStorage.getItem("userRole")
      );
      await this.$store.dispatch(
        "credits/setHeaderBPM",
        sessionStorage.getItem("csrf_token")
      );
    }
    try {
      this.histories = (await this.$store.dispatch("profile/getHistoryTask", this.$route.query.applicationId)).history_details;
      this.histories = sortData(this.histories, 'id')
      this.loader = false;
    } catch (error) {
      this.loader = false;
      setTimeout(() => {
        this.$store.commit("credits/setMessage", {
          message: CommonUtils.filterServerError(error),
          code: 0
        });
      }, 500)

      this.$router.go(-1);
    }
  },
  computed: {},
  components: {
    appLoader: Loader
  },
  filters: {
    formData,
    sortData
  }
};
</script>

<style></style>
