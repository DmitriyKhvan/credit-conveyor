<template>
  <!-- Submit button-->
  <q-btn
    @click="sentFullProfile"
    color="primary"
    label="Оформить кредит"
    class="q-ml-sm"
  />
</template>
<script>
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
  data() {
    return {
    }
  },
  computed: {
    fullProfile() {
      return this.$store.state.profile.fullFormProfile
    },
    profile() {
      return this.$store.state.profile
    }
  },
  methods: {
    async sentFullProfile() {
      // комментарий

      console.log("fullProfile", this.$store.state.profile.fullProfile);
        const {
          Status,
          ApplicationID,
          ProtocolNumber,
          Number,
          Branch,
          BODecision,
          FinalDecision,
          Date,
          BOLogin,
          Department,
          ClientManagerLogin,
          CreditCommiteeDecisions,
          Customer,
          Guarantee,
          LoanInfo,
          ApplicationComment,
          AttachedDocuments,
        } = this.fullProfile;

        // удалил из объекта - Date!!!
        const data = {
          output: [
            {
              name: "application",
              data: {
                Status,
                ApplicationID,
                ProtocolNumber,
                Number,
                Branch,
                BODecision,
                FinalDecision,
                BOLogin,
                Department,
                ClientManagerLogin,
                CreditCommiteeDecisions,
                Customer,
                Guarantee,
                LoanInfo,
                ApplicationComment,
                AttachedDocuments,
              },
            },
          ],
        };

        console.log(JSON.stringify(data, null, 2));

        try {
          const res = await this.$store.dispatch("credits/confirmationCredit", data);
          console.log("response", JSON.stringify(res, null, 2));
          //console.log('nextTaskId', res.nextTask.id)

          if (res.nextTask.id) {
            debugger
            sessionStorage.removeItem("csrf_token");
            this.$router.go("/work/credit")
            debugger
          } else {
            throw 'Next task id is undefined'
          }
        } catch (error) {}
    }
  }
}
</script>

<style lang="scss"></style>
