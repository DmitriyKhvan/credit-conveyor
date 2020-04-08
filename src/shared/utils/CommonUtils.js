import store from '@/store'

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
    //debugger
    let searchVal;

    if (value.search('\/sub\/') != -1) {
      let index = value.indexOf("/sub/");
      let temp = value.substring(0, index)
      searchVal = temp
    } else {
      searchVal = value;
    }

    if (arr !== null) {
      for (let k = 0; k < arr.length; k++) {
        if (arr[k][key] == searchVal) {
          // set branchcode, filialcode
          this.setRoleLevel(arr[k]['menu_id']);
          return true;
        } else {
          if (arr[k]['children'] != null) {
            if (this.isValueExistInObject(arr[k]['children'], key, searchVal)) {
              return true;
            }
          } else continue;
        }
      }
      return false;
    } else {
      return false
    }
  },
  getChildMenus(menus, url) {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].url == url) {
        return [];
      }
      if (menus[i]['children'] !== null && url.match(/\/[\w\.]*\/[\w\.]*/) !== null) {
        for (let j = 0; j < menus[i]['children'].length; j++) {
          if (menus[i]['children'][j].url == url.match(/\/[\w\.]*\/[\w\.]*/)[0]) {
            if (menus[i]['children'][j]['children'] != null) {
              return menus[i]['children'][j]['children'];
            } else return [];
          }
        }
      }
    }
    return null;
  },
  setRoleLevel(menu_id) {
    store.dispatch('auth/setBranchCode', null);
    store.dispatch('auth/setFilialCode', null);
    let modList = store.getters["auth/moderatorsList"]
    if (modList) {
      modList.forEach(element => {
        if (element.menu_id == menu_id) {
          store.dispatch('auth/setBranchCode', element.branch_code);
          store.dispatch('auth/setFilialCode', element.filial_code);
        }
      });
    }
  },
  filterServerError(error) {
    if (error.response) {
      return error.response.data.message
    } else if (error.message) {
      return error.message
    }
    return error
  }
}
