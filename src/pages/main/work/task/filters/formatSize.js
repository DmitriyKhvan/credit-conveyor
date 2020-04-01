export default function formatSize(value) {

  let size = (value / 1024).toFixed(2) + " кб"; 
  if (parseInt(size) > 1024) {
    size = (parseInt(size) / 1024).toFixed(2) + " мб"
  }

  return size
}