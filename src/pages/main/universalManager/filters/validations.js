function floatValid(val) {
  return (
    String(val).match(/^([1-9]+\d*([.]\d+)?)$|^(0[.]\d*[1-9]+)$|^0$/) ||
    "Неверные данные"
  );
}

function integerValid(val) {
  return String(val).match(/^([1-9]+\d*)$|^0$/) || "Неверные данные";
}

export { floatValid, integerValid };
