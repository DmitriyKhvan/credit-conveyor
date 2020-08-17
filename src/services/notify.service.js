import { Notify } from "quasar";

// or with a config object:

const NotifyService = {
  showErrorMessage(message) {
    Notify.create({
      message: message,
      color: "red",
      actions: [{ icon: "close", color: "white" }],
      timeout: 1000,
      position: "top"
    });
  },
  showSuccessMessage(message) {
    Notify.create({
      message: message,
      color: "green",
      actions: [{ icon: "close", color: "white" }],
      timeout: 1000,
      position: "top"
    });
  },
  showNotification(message) {
    Notify.create({
      message: message,
      color: "secondary",
      icon: "warning",
      actions: [{ icon: "close", color: "white" }],
      timeout: 5000,
      position: "bottom-right"
    });
  }
};
export default NotifyService;
