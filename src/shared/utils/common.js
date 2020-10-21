export function stringTruncate(text, charNum) {
  return text.length > charNum ? text.substr(0, charNum) + "..." : text;
}

//
export function valueOf(param) {
  //console.log(param);
  //let param = inp.trim();
  if (
    param === undefined ||
    param === "undefined" ||
    param === "null" ||
    param === ""
  )
    return null;
  else return param;
}
