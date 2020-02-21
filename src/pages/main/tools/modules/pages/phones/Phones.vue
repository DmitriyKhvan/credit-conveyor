<template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <div class="col-2">
        <div class="row q-gutter-sm">
          <div class="col-12">
            <q-select
              square
              outlined
              v-model="model"
              :options="data"
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
              <q-list bordered separator v-if="model">
                <q-item
                  clickable
                  v-for="(item, index) in model.children"
                  :key="index"
                  @click="getSectors(item.FILIAL, item.CODE)"
                >
                  <q-item-section>{{ item.DEPARTMENT_NAME1 }}</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <div class="col test" style="background: #F2F4F4">
        <q-scroll-area style="height: 850px;">
          <q-tree
            :nodes="customize"
            node-key="id"
            label-key="name"
            default-expand-all
            color="black"
            icon="o_arrow_right"
          >
            <template v-slot:default-header="prop">
              <span>{{ prop.node.name }}</span>
            </template>
            <template v-slot:default-body="prop">
              <div class="row">
                <div
                  class="col-3"
                  v-for="(item, index) in prop.node.user"
                  :key="index"
                >
                  <q-card>
                    <!-- BOY CARD -->
                    <div v-if="item.sex === 'M'">
                      <q-card-section
                        class="bg-primary text-white"
                        style="padding: 5px 5px 5px 10px;"
                      >
                        <div class="text-subtitle1">
                          <q-icon
                            name="o_star_border"
                            size="25px"
                            color="yellow-14"
                            v-if="item.work_position === 1"
                          />&nbsp;{{ item.fio }}&nbsp;
                        </div>
                      </q-card-section>
                      <q-item style="padding: 0 5px 5px 10px;">
                        <q-item-section avatar>
                          <q-avatar square style="width: 80px; height: 100px">
                            <img :src="image + item.uid" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section style="padding: 0 5px 5px 10px;">
                          <q-item-label
                            ><b>{{ item.position }}</b></q-item-label
                          >
                          <q-item-label
                            ><q-icon name="o_local_phone" />&nbsp;{{
                              item.phone_work1
                            }}</q-item-label
                          >
                          <q-item-label
                            ><q-icon name="o_local_phone" />&nbsp;{{
                              item.phone_work2
                            }}</q-item-label
                          >
                          <q-item-label
                            ><q-icon name="o_mail" />&nbsp;<a
                              :href="mail + item.mail"
                              style="text-decoration: none;"
                              >{{ item.mail }}</a
                            ></q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-card-section
                        class="bg-primary text-white"
                        style="padding: 1px 5px 1px 5px;"
                      >
                      </q-card-section>
                    </div>
                    <!-- GIRL CARD -->
                    <div v-else>
                      <q-card-section
                        class="bg-purple text-white"
                        style="padding: 5px 5px 5px 10px;"
                      >
                        <div class="text-subtitle1">{{ item.fio }}</div>
                      </q-card-section>
                      <q-item style="padding: 0 5px 5px 10px;">
                        <q-item-section avatar>
                          <q-avatar square style="width: 80px; height: 100px">
                            <img :src="image + item.uid" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section style="padding: 0 5px 5px 10px;">
                          <q-item-label
                            ><b>{{ item.position }}</b></q-item-label
                          >
                          <q-item-label
                            ><q-icon name="o_local_phone" />&nbsp;{{
                              item.phone_work1
                            }}</q-item-label
                          >
                          <q-item-label
                            ><q-icon name="o_local_phone" />&nbsp;{{
                              item.phone_work2
                            }}</q-item-label
                          >
                          <q-item-label
                            ><q-icon name="o_mail" />&nbsp;<a
                              :href="mail + item.mail"
                              style="text-decoration: none;"
                              >{{ item.mail }}</a
                            ></q-item-label
                          >
                        </q-item-section>
                      </q-item>
                      <q-card-section
                        class="bg-purple text-white"
                        style="padding: 1px 5px 1px 5px;"
                      >
                      </q-card-section>
                    </div>
                    <!-- Girl CARD END-->
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
import phonesInf from "./test.json";
import axios from "axios";
import ApiService from "../../../../../../services/api.service";
export default {
  data() {
    return {
      image:
        "http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=",
      mail: "mailto:",
      model: "",
      data: [],
      err: "",
      subData: [],
      customize: phonesInf
    };
  },
  methods: {
    getSectors(mfo, code) {
      ApiService.get(`structure/departments?mfo=${mfo}&code=${code}`)
        .then(res => {
          console.log(res.data[0]);
          // eslint-disable-next-line
          //console.log(this.data)
        })
        .catch(err => {
          console.log(err);
        });
    }
    // getFillial(val) {
    //   axios
    //     .get("tree/1/branch/" + val)
    //     .then(res => {
    //       this.subData = res.data[0].children;
    //       // eslint-disable-next-line
    //       //console.log(this.subData)
    //     })
    //     .catch(err => {
    //       this.subData = err;
    //     });
    // }
  },
  beforeCreate() {
    // ApiService.get("tree/1/branch")
    //   .then(res => {
    //     console.log(res.data[0].tree);
    //     this.data = res.data[0].tree;
    //   })
    //   .catch(err => {
    //     this.data = err;
    //   });
    ApiService.get("structure/branches")
      .then(res => {
        console.log(res.data[0].children);
        this.data = res.data[0].children;
      })
      .catch(err => {
        this.data = err;
      });
  }
};
</script>
<style lang="sass" scoped>
.row > div
  padding: 10px 10px 2px 5px


.row + .row
  margin-top: 1rem;
.test
    border: 1px solid rgba(39, 55, 70,.4)
.underline
  text-decoration: underline;
</style>
