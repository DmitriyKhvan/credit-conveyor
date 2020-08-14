export default function dataTransform(data) {
  for (let i in data) {
    if (data[i] != null) {
      if (data[i].items) {
        data[i] = data[i].items
        dataTransform(data[i])
      }
    }
  }
  return data
}