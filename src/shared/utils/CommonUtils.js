export default {
  domDecoder(str) {
    let parser = new DOMParser();
    let dom = parser.parseFromString('<!doctype html><body>' + str, 'text/html');
    return dom.body.textContent;
  },

  decoder(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value
  },

  findNested(obj, key, value) {
    // Base case
    if (obj[key] === value) {
      return true;
    } else {

      for (let i = 0, len = Object.keys(obj).length; i < len; i++) {
        if (typeof obj[i] == 'object') {
          let found = this.findNested(obj[i], key, value);
          if (found) {
            // If the object was found in the recursive call, bubble it up.
            return found;
          }
        }
      }

    }
  },
  isValueExistInObject(arr, key, value) {
    for (let k = 0; k < arr.length; k++) {
      if (arr[k][key] == value) {
        return true;
      } else {
        if (arr[k]['children'] != null) {
          if (this.isValueExistInObject(arr[k]['children'], key, value)) {
            return true;
          }
        } else continue;
      }
    }
    return false;
  }
}
