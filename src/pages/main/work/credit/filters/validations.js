function fioValid(val) {
  return val.match(/^[A-Z'`‘]+$/) || "Введите на латинице заглавными буквами"; // только латинские буквы
}

function mValid(val) {
  return (
    val.match(/^([A-Z'`‘]+\s)*[A-Z'`‘]+$/) ||
    "Введите на латинице заглавными буквами"
  ); // только латинские буквы
}

function phoneValid(val) {
  return !val.match(/(?=([^1-9]))\1{7,}/) || "Неверные данные";
}

function docNumberValid(val) {
  return !val.match(/(?=(.))\1{7,}/) || "Неверные данные";
}

function INNFizValid(val) {
  return (+val[0] > 3 && +val[0] < 7 && !val.match(/(?=(.))\1{8,}/)) || 'Неверные данные'
}

function INNYurValid(val) {
  return (+val[0] > 1 && +val[0] < 4 && !val.match(/(?=(.))\1{8,}/)) || 'Неверные данные'
}

function pinppValid(val) {
  return !val.match(/(?=(.))\1{14,}/) || "Неверные данные";
}

function msecond(val) {
  return new Date(val.slice(-4) + val.slice(2, 6) + val.slice(0, 2));
}

function adulthoodValid(date) {
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

export {
  fioValid,
  mValid,
  phoneValid,
  docNumberValid,
  INNFizValid,
  INNYurValid,
  pinppValid,
  msecond,
  adulthoodValid
}