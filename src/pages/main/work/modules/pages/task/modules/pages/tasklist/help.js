//import axios from 'axios'
export const applyDrag = (arr, dragResult) => {
  // eslint-disable-next-line
  //console.log(arr) 
  const { removedIndex, addedIndex, payload } = dragResult
  // eslint-disable-next-line
  //console.log(arr) 
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  // eslint-disable-next-line
  //console.log(result) 

  let itemToAdd = payload

  // eslint-disable-next-line
  //console.log(itemToAdd)

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }
  // eslint-disable-next-line
  //console.log(result)
  return result
}

export const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
}