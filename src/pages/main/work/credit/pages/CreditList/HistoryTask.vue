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
        <tr v-for="(history, index) of historys" :key="'history' + index">
          <td>{{ history.applicationNumber }}</td>
          <td>{{ history.taskName }}</td>
          <td>{{ history.filial }}</td>
          <td>{{ history.kmfio }}</td>
          <td>{{ history.taskStatus }}</td>
          <td>{{ history.date | formData("datetime") }}</td>
          <td>{{ history.date | formData("datetime") }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import CommonUtils from "@/shared/utils/CommonUtils";
import Loader from "@/components/Loader";

import formData from "../../filters/formatDate";

export default {
  data() {
    return {
      loader: true,
      historys: [
        {
          applicationNumber: "00887.132.2021.1152",
          applicationStatus: null,
          assignedRole: "ROLE_KM",
          assignedTo: "ROLE_KM",
          assignedType: "group",
          bpmTaskName: null,
          businessStatus: null,
          client: "FARKHODJON BOLTABOEV KOZIMJONOVICH",
          date: "2021-02-02 17:39:05.684",
          filial: "00887",
          filialName: null,
          id: "4640",
          kmfio: "Мамиржон Джўраев Мамаджонович",
          taskId: "194297",
          taskName: "Step: Full Application Filling",
          taskStatus: "Received"
        },
        {
          applicationNumber: "00887.132.2021.1152",
          applicationStatus: null,
          assignedRole: "ROLE_KM",
          assignedTo: "ROLE_KM",
          assignedType: "group",
          bpmTaskName: null,
          businessStatus: null,
          client: "FARKHODJON BOLTABOEV KOZIMJONOVICH",
          date: "2021-02-02 17:39:05.684",
          filial: "00887",
          filialName: null,
          id: "4640",
          kmfio: "Мамиржон Джўраев Мамаджонович",
          taskId: "194297",
          taskName: "Step: Full Application Filling",
          taskStatus: "Received"
        }
      ]
    };
  },
  async created() {
    try {
      const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(5000)
      // this.historys = await this.dispatch("profilt/getHistoryTask", this.$route.query.applicationNumber);
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
    formData
  }
};
</script>

<style></style>
