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
export default {
  data() {
    return {

    }
  },
  computed: {
    fullProfile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    async sentFullProfile() {
      console.log("fullProfile", this.$store.state.profile);
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

        try {
          const res = await this.$store.dispatch("confirmationCredit", data);
          console.log("response", JSON.stringify(res, null, 2));

        } catch (e) {
          const errorMessage = CommonUtils.filterServerError(error);
          this.$store.commit("setError", errorMessage);
          sessionStorage.removeItem("csrf_token");
        }
        console.log(JSON.stringify(data, null, 2));
    }
  }
}
</script>

<style lang="scss"></style>
