export function stringTruncate(text, charNum) {
  return text.length > charNum ? text.substr(0, charNum) + "..." : text;
}

//
