export default function formatSize(value, power) {


  const size = value / 1024 + " кб"; 
  if (size > 1024) {
    size = size / 1024 + " мб"
  }


  return new Intl.NumberFormat().format(number)
}