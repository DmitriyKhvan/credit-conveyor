export default function formatNumber(value, power) {
  let number = value
  if (typeof value === 'string') {
    number = Number(value.replace(/[^0-9]/gim,''));
  }
  
  if (power) {
    const digit = Math.pow(10, power)
    number = Math.floor(value / digit) * digit
  }

  return new Intl.NumberFormat().format(number)
}