
function select(data, params) {
  const [list, remove = false] = params
  const transformed = data.map(item => {
    const kv = Object.entries(item)
    return Object.fromEntries(
      kv.reduce((a, item) => {
        const [key, value] = item
        if (!remove) {
          if (list.includes(key)) a.push(item)
        } else {
          if (!list.includes(key)) a.push(item)
        }
        return a
      },[])
    )
  })
  return transformed
}

module.exports = select

