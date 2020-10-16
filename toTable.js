
function toTable(data, params) {
  const cols = []
  const rows = data.reduce((a, record) => {
    // arrays are easier to work with
    const recordArray = Object.entries(record)
    // lets get any missing fields/cols
    recordArray.forEach(([col]) => {
      if (cols.indexOf(col) === -1) cols.push(col)
    })
    // now lets get the row in the right order
    const row = cols.map((col, index) => {
      return recordArray[index][1] || null
    })
    a.push(row)
    return a
  }, [])
  return [cols, ...rows]
}

module.exports = toTable

