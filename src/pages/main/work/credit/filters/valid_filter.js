// Для валидации массива данных
// refs - это this.$refs
//itemValid - флаг текущего поля (true/false)
//itemsValid - название флага группы полей
//items - референция полей валидации
function validItems(refs, itemsValid, itemValid = true) {
  if (!itemValid) {
    return refs[itemsValid] = {
              hasError: true //не валидный
            };
  } else {
    return refs[itemsValid] = {
              hasError: false //валидный
            };
  }
}

// function validFilter(refs, itemsValid, items, itemValid = true) {
//   for (let item of refs[items]) {
//     if (!item.validate()) {
//       //console.log(item.computedErrorMessage)
//       itemValid = false;
//     }
//   }
  
//   validItems(refs, itemsValid, itemValid);
// }

function validFilter(refs, itemsValid, items, itemValid = true, idx = -1) {
  // console.log(idx, items)

  if (idx == -1) {
    for (let item of refs[items]) {
      if (!item.validate()) {
        //console.log(item.computedErrorMessage)
        itemValid = false;
      }
    }
  } else if (!refs[items][idx].validate()) {
    itemValid = false
  }
  
  
  validItems(refs, itemsValid, itemValid);
}

export {
  validItems,
  validFilter
}
