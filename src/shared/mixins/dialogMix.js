import ApiService from "./../../services/api.service";
import NotifyService from "./../../services/notify.service";

export default {
  data() {
    return {

    }
  },
  props: {},
  created() {
    // !!! Don't change
    if (!!this.data.selectedRow) {
      this.details = this.data.selectedRow[0];
    } else {}
  },
  computed: {

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
      this.$store.dispatch("common/setLoading", true);
      ApiService.post(this.data.props.addEdit, this.details)
        .then(
          response => {
            this.$store.dispatch("common/setLoading", false);
            this.$emit("ok", response);
            this.hide();
          },
          err => {
            console.log(err);
            NotifyService.showErrorMessage(err.toString());
            this.$store.dispatch("common/setLoading", false);
          }
        )
        .catch(error => {
          console.log(error);
          this.$store.dispatch("common/setLoading", false);
          NotifyService.showErrorMessage(error.toString());
          throw error;
        });
    },
    onCancelClick() {
      this.$q
        .dialog({
          title: "Confirm",
          message: this.$t("messages.confirm_exit"),
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
  },
  watch: {

  }
};
