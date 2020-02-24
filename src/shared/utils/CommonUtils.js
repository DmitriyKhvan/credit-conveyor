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
  }
}
