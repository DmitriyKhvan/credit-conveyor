import moment from "moment";

export function simpleDateFormat(date) {
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
}

export function intDateFormat(data) {
  const d = new Date(data);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${ye}/${mo}/${da}`;
}
