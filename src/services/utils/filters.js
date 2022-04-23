import _ from "lodash"

export const filterGenerator = (array, value) => {
  return _.uniq(
    _.flatten(
      array.map((item) => {
        return item[value]
      })
    )
  )
}

export const sorting = (array, type) => {
  switch (type) {
    case "":
      return array
    case "LTH":
      return array.sort((a, b) => a.price - b.price)

    case "HTL":
      return array.sort((a, b) => b.price - a.price)

    case "NTO":
      return array.sort((a, b) => {
        return new Date(b.added) - new Date(a.added)
      })
    case "OTN":
      return array.sort((a, b) => {
        return new Date(a.added) - new Date(b.added)
      })

    default:
      break
  }
}

export const paginate = (itemOffset, array) => {
  const endOffset = itemOffset + 16
  return array.slice(itemOffset, endOffset)
}

export const pipe = (obj, sort, array) => {
  const filteredItems = array.filter((p) =>
    Object.entries(obj).every(
      ([k, fs]) =>
        !fs.length ||
        fs.some((f) =>
          [].concat(p[k]).some((t) => t.toLowerCase() === f.toLowerCase())
        )
    )
  )
  return sorting(filteredItems, sort)
}
