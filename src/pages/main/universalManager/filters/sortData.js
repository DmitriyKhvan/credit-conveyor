export default function sortData(arr, param) {
  return arr.sort((a, b) => {
    if (a[param] > b[param]) {
      return 1;
    }
    if (a[param] < b[param]) {
      return -1;
    }
    return 0
  })
} 
