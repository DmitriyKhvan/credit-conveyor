function floatValid(val) {
  return (
    String(val).match(/^[-+]?[0-9]*[.]?[0-9]+(?:[eE][-+]?[0-9]+)?$/) ||
    "Неверные данные"
  );
}

function integerValid(val) {
  return String(val).match(/^[0-9]+$/) || "Неверные данные";
}

export { floatValid, integerValid };
