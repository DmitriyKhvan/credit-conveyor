export default function dateFilter(value, format = 'date') {
  //console.log(format);
  const options = {}; 

  if (format.includes('date')) {
      options.day = '2-digit',
      options.month = '2-digit',
      options.year = 'numeric'
  }

  if (format.includes('time')) {
      options.hour = '2-digit',
      options.minute = '2-digit',
      options.second = '2-digit'
  }

  // Если формат данных dd.mm.yyyy
  if (value && new Date(value.slice(-4) + value.slice(2, 6) + value.slice(0, 2)).toString() != 'Invalid Date') {
    return value
  } 

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
}