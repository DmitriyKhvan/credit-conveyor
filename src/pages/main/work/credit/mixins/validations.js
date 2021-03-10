export default {
  methods: {
    fioValid(val) {
      return (
        val.match(/^[A-Z'`‘]+$/) || "Введите на латинице заглавными буквами"
      ); // только латинские буквы
    },

    mValid(val) {
      return (
        val.match(/^([A-Z'`‘]+\s)*[A-Z'`‘]+$/) ||
        "Введите на латинице заглавными буквами"
      ); // только латинские буквы
    },

    phoneValid(val) {
      return !val.match(/(?=([^1-9]))\1{7,}/) || "Неверные данные";
    },

    docNumberValid(val) {
      return !val.match(/(?=(.))\1{7,}/) || "Неверные данные";
    },

    INNFizValid(val) {
      return (
        (+val[0] > 3 && +val[0] < 7 && !val.match(/(?=(.))\1{8,}/)) ||
        "Неверные данные"
      );
    },

    INNYurValid(val) {
      return (
        (+val[0] > 1 && +val[0] < 4 && !val.match(/(?=(.))\1{8,}/)) ||
        "Неверные данные"
      );
    },

    pinppValid(val) {
      return !val.match(/(?=(.))\1{14,}/) || "Неверные данные";
    },

    msecond(val) {
      return new Date(val.slice(-4) + val.slice(2, 6) + val.slice(0, 2));
    },

    innValid(val) {
      return !val.match(/(?=(.))\1{9,}/) || "Неверные данные";
    },

    adulthoodValid(date) {
      return (
        (this.msecond(this.currentDate) - this.msecond(date) - 432000000) /
          1000 /
          60 /
          60 /
          24 /
          365 >
        18
      ); // с учетом высокосных годов (4)
    }
  }
};
