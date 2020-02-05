<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Header</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="q-gutter-y-sm q-gutter-x-md column">
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.username"
              label="Username"
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.first_name"
              label="First Name"
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.last_name"
              label="Last Name"
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.middle_name"
              label="Middle Name"
            />
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.email"
              label="Email"
              type="email"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.password"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row">
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.phone"
              label="Phone"
              mask="(+998) ##-###-##-##"
              fill-mask
            />

            <q-select
              outlined
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.state"
              :options="stateList"
              option-value="value"
              option-label="key"
              emit-value
              map-options
              label="State"
            />
          </div>
          <div class="row">
            <q-select
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.roles"
              multiple
              :options="rolesList"
              use-chips
              stack-label
              option-value="value"
              option-label="text"
              emit-value
              map-options
              label="Roles"
            />
            <q-input
              outlined
              clearable
              color="purple-12"
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="userDetails.emp_id"
              label="Employee Id"
              type="number"
            />
          </div>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" :disable="!isValidated" label="Submit" @click="submitForm" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      stateList: [
        { key: "Active", value: "A" },
        { key: "Passive", value: "P" }
      ],
      isValidated: true,
      rolesList: this.$store.getters["dicts/getRolesDict"],
      userDetails: {
        user_id: null,
        username: null,
        first_name: null,
        last_name: null,
        middle_name: null,
        email: null,
        password: null,
        phone: null,
        state: null,
        roles: [],
        emp_id: null
      }
    };
  },
  props: {
    selectedRow: {
      type: Array,
      default: () => []
    },
    details: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    console.log(this.selectedRow);
    if (this.selectedRow.length > 0) {
      this.userDetails = this.selectedRow[0];
      console.log(this.userDetails);
    } else {
    }
  },
  methods: {
    // !!! Don't change
    show() {
      this.$refs.dialog.show();
    },

    // !!! Don't change
    hide() {
      this.$refs.dialog.hide();
    },

    // !!! Don't change
    onDialogHide() {
      this.$emit("hide");
    },

    submitForm() {
      this.$emit("ok", this.userDetails);
      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to close the window?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.hide();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    }
  }
};
</script>

<style>
</style>
