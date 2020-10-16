
function ignore(data, params) {
  const [list, remove = false] = params
  const cols = data[0]
  const recs = data.slice(1)
  const pos = list.map(col => cols.indexOf(col))
    .filter(item => item >= 0)
  
  // console.log('pos:', pos, list, cols)

  const transformed = recs.map(item => {
    const rec = item.reduce((a, col, i) => {
      if (!pos.includes(i)) a.push(col)
      return a
    },[])
    return rec
  })
  const newCols = cols.reduce((a, col, i) => {
    if (!pos.includes(i)) a.push(col)
    return a
  },[])

  return [
    newCols,
    ...transformed
  ]
}

module.exports = ignore

