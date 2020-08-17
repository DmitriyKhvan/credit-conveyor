import moment from "moment";

export function simpleDateFormat(date) {
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
}
