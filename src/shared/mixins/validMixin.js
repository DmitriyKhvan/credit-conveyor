export default {
  methods: {
    integerPositiveValid(val) {
      return String(val).match(/^([1-9]+\d*)$|^0$/) || "Неверные данные";
    },

    integerValid(val) {
      return String(val).match(/^(-?[1-9]+\d*)$|^0$/) || "Неверные данные";
    },

    floatPositiveValid(val) {
      return (
        String(val).match(/^([1-9]+\d*([.]\d+)?)$|^(0[.]\d*[1-9]+)$|^0$/) ||
        "Неверные данные"
      );
    },

    floatValid(val) {
      return (
        String(val).match(/^([1-9]+\d*([.]\d+)?)$|^(0[.]\d*[1-9]+)$|^0$/) ||
        "Неверные данные"
      );
    },

    numeralValid(val) {
      return String(val).match(/^[0-9]+$/) || "Неверные данные"
    }
  }
}