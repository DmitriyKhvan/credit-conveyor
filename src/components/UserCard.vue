<template>
  <div>
    <div v-if="item">
      <!-- BOY CARD -->
      <div v-if="item.GENDER === 'M'">
        <q-card-section
          class="bg-primary text-white"
          style="padding: 5px 5px 5px 10px;"
        >
          <div class="text-subtitle1">
            <q-icon
              name="o_star_border"
              size="25px"
              color="yellow-14"
              v-if="item.WORK_POSITION === 1"
            />
            &nbsp;{{
              decode(item.LAST_NAME) +
                " " +
                decode(item.FIRST_NAME) +
                " " +
                decode(item.MIDDLE_NAME)
            }}&nbsp;
          </div>
        </q-card-section>
        <q-item style="padding: 0 5px 5px 10px;">
          <q-item-section avatar>
            <q-avatar square style="width: 80px; height: 100px">
              <img :src="getPhotoUrl(item.EMP_ID)" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="padding: 0 5px 5px 10px;">
            <q-item-label>
              <b>{{ decode(item.POST_NAME) }}</b>
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_mail" />&nbsp;
              <a
                :href="mail + item.MAIL_ADDRESS"
                style="text-decoration: none;"
                >{{ item.MAIL_ADDRESS }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section
          class="bg-primary text-white"
          style="padding: 1px 5px 1px 5px;"
        ></q-card-section>
      </div>
      <!-- GIRL CARD -->
      <div v-else>
        <q-card-section
          class="bg-purple text-white"
          style="padding: 5px 5px 5px 10px;"
        >
          <div class="text-subtitle1">
            {{
              decode(item.LAST_NAME) +
                " " +
                decode(item.FIRST_NAME) +
                " " +
                decode(item.MIDDLE_NAME)
            }}
          </div>
        </q-card-section>
        <q-item style="padding: 0 5px 5px 10px;">
          <q-item-section avatar>
            <q-avatar square style="width: 80px; height: 100px">
              <img :src="getPhotoUrl(item.EMP_ID)" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="padding: 0 5px 5px 10px;">
            <q-item-label>
              <b>{{ decode(item.POST_NAME) }}</b>
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_local_phone" />
              &nbsp;{{ item.PHONE_WORK }}
            </q-item-label>
            <q-item-label>
              <q-icon name="o_mail" />&nbsp;
              <a
                :href="mail + item.MAIL_ADDRESS"
                style="text-decoration: none;"
                >{{ item.MAIL_ADDRESS }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section
          class="bg-purple text-white"
          style="padding: 1px 5px 1px 5px;"
        ></q-card-section>
      </div>
      <!-- Girl CARD END-->
    </div>

    <div v-else>
      <img src="./../assets/statics/default-avatar.png" style="width:100%" />
      <!-- <img src="../assets/statics/logoNew.png" /> -->
    </div>
  </div>
</template>

<script>
import CommonUtils from "./../shared/utils/CommonUtils";
import UserService from "./../services/user.service";

export default {
  name: "UserCard",
  data() {
    return {
      mail: "mailto:"
    };
  },
  props: {
    itemData: {
      type: Object,
      default: null
    }
  },
  created() {},
  computed: {
    item() {
      return this.itemData;
    }
  },
  methods: {
    decode(param) {
      return CommonUtils.decoder(param);
    },
    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    }
  }
};
</script>

<style></style>
