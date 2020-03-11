<template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <!-- select box branches-->

      <div class="col-2">
        <div class="row q-gutter-sm">
          <div class="col-12">
            <q-select
              square
              outlined
              v-model="selectedBranch"
              :options="branches"
              option-label="DEPARTMENT_NAME1"
              option-value="CODE"
              label="Выберите отделение"
              transition-show="jump-up"
              transition-hide="jump-up"
              dropdown-icon="o_arrow_drop_down"
              dense
            />
          </div>
          <div class="col-12" style="height: 83vh;">
            <q-scroll-area style="height: 750px;">
              <q-list bordered separator v-if="selectedBranch">
                <q-item
                  clickable
                  v-for="(item, index) in selectedBranch.children"
                  :key="index"
                  @click="getSectors(item.FILIAL, item.CODE)"
                >
                  <q-item-section>{{
                    decode(item.DEPARTMENT_NAME1)
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <!-- -->

      <div class="col test" style="background: #F2F4F4">
        <q-scroll-area style="height: 850px;">
          <q-tree
            :nodes="filials"
            node-key="CODE"
            label-key="DEPARTMENT_NAME1"
            default-expand-all
            color="black"
            icon="o_arrow_right"
            ref="nodes"
          >
            <template v-slot:default-header="prop">
              <span>{{ decode(prop.node.DEPARTMENT_NAME1) }}</span>
            </template>

            <template v-slot:default-body="prop">
              <div class="row">
                <div
                  class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
                  v-for="(item, index) in prop.node.emps"
                  :key="index"
                >
                  <q-card @click="emitUser(item)" style="cursor: pointer">
                    <user-card :itemData="item" />
                  </q-card>
                </div>
              </div>
            </template>
          </q-tree>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script>
import ApiService from "./../services/api.service";
import CommonUtils from "./../shared/utils/CommonUtils";
import UserService from "./../services/user.service";
import UserCard from "./../components/UserCard";

export default {
  components: {
    UserCard
  },
  mixins: [],
  data() {
    return {
      mail: "mailto:",
      selectedBranch: null,
      branches: [],
      filials: []
    };
  },
  props: {},
  created() {
    Promise.all([this.getBranches()])
      .then(x => {
        this.branches = x[0].data[0].children;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  },
  methods: {
    emitUser(item) {
      this.$emit("selectUser", item);
    },
    getSectors(mfo, code) {
      ApiService.get(`structure/departments?mfo=${mfo}&code=${code}`)
        .then(res => {
          // set array
          this.filials = res.data;
          this.$nextTick(function() {
            this.$refs.nodes.expandAll();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    decode(param) {
      return CommonUtils.decoder(param);
    },
    getBranches() {
      return ApiService.get("structure/branches");
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    }
  }
};
</script>
<style lang="sass" scoped>
.row > div
  padding: 10px 10px 2px 5px

.row + .row
  margin-top: 1rem

.test
  border: 1px solid rgba(39, 55, 70,.4)

.underline
  text-decoration: underline
</style>
