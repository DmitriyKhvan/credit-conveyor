<template>
  <div class="histroryTask q-px-md">
    <div class="loader" v-if="loader">
      <appLoader />
    </div>
    <div v-else>
      <q-markup-table separator="cell">
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
            <td>{{ history.dateTimeCreate | formatDate("datetime") }}</td>
            <td>{{ history.dateTimeChange | formatDate("datetime") }}</td>
          </tr>
        </tbody>
      </q-markup-table>

      <div class="allowSalaryInputBlock">
        <!-- <pre>
        {{ dataAllowSallaryInput }}
      </pre> -->

        <p>
          Ручной ввод зарплатных поступлений клиента:
          <span>{{ options[dataAllowSallaryInput[0].manualInpsInput] }}</span>
        </p>
        <p>
          Логин: <span>{{ dataAllowSallaryInput[0].manualInpsLogin }}</span>
        </p>
        <p>
          Дата:
          <span>{{
            dataAllowSallaryInput[0].manualInpsDate | formatDate("datetime")
          }}</span>
        </p>

        <q-btn
          v-if="!dataAllowSallaryInput[0].manualInpsInput"
          label="Разрешить ручной ввод для заявки"
          class="queryDataBtn q-ml-sm"
          @click="setDataAllowSallaryInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import CommonUtils from "@/shared/utils/CommonUtils";
import Loader from "@/components/Loader";

import formatDate from "../../filters/formatDate";
import sortData from "@/shared/filters/sortData";

export default {
  data() {
    return {
      loader: false,
      histories: [],
      options: {
        // null: 'запрещен',
        0: "запрещен",
        1: "разрешен"
      }
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
      this.loader = true;
      this.histories = (
        await this.$store.dispatch(
          "profile/getHistoryTask",
          this.$route.query.applicationId
        )
      ).history_details;
      this.histories = sortData(this.histories, "id");

      await this.$store.dispatch(
        "creditSettings/getDataAllowSallaryInput",
        this.$route.query.applicationId
      );

      this.loader = false;
    } catch (error) {
      this.loader = false;
      setTimeout(() => {
        this.$store.commit("credits/setMessage", {
          message: CommonUtils.filterServerError(error),
          code: 0
        });
      }, 500);

      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState({
      dataAllowSallaryInput: state => state.creditSettings.dataAllowSallaryInput
    })
  },
  methods: {
    async setDataAllowSallaryInput() {
      try {
        const decision = await this.$store.dispatch(
          "creditSettings/setDataAllowSallaryInput",
          {
            applicationId: this.$route.query.applicationId,
            input: 1
          }
        );

        this.$store.commit("credits/setMessage", {
          message: decision.message,
          code: decision.code
        });
      } catch (error) {
        this.$store.commit("credits/setMessage", {
          message: CommonUtils.filterServerError(error),
          code: 0
        });
      }
    }
  },
  components: {
    appLoader: Loader
  },
  filters: {
    formatDate,
    sortData
  }
};
</script>

<style lang="scss">
.histroryTask {
  .allowSalaryInputBlock {
    margin: 20px 0 0 0;

    p {
      margin: 10px 0;
    }

    span {
      font-weight: 600;
    }
  }
}
</style>
