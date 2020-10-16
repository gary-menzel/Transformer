
function pivot_wider(data, [params]) {
  const names = {}

  const cols = data[0]
  const rows = data.slice(1)

  // capture the unique values for the names
  params.names.forEach(item => {
    if (!names[item]) names[item] = []
    const pos = cols.indexOf(item)
    rows.forEach(row => {
      const key = row[pos].toString()
      // console.log('key:', key, pos, row)
      if (!names[item].includes(key)) names[item].push(key)
    })
    names[item].sort()
  })

  const reducedCols = cols.reduce((a, item) => {
    if (
      !params.names.includes(item) && 
      !params.values.includes(item)
    ) {
      a.push(item)
    }
    return a
  }, [])

  const newData = {}

  const key = params.names[0]
  const len = names[key].length
  const val = params.values[0]
  // console.log('meta:', {
  //   key,
  //   len,
  //   val
  // })

  rows.forEach(rec => {
    const jsonKey = JSON.stringify(
      reducedCols.map(col => rec[cols.indexOf(col)])
    )
    // console.log('jsonKey:', jsonKey)
    if (!newData[jsonKey]) {
       newData[jsonKey] = Array(len).fill('-')
    }

    const pivot = rec[cols.indexOf(key)].toString()
    const pos = names[key].indexOf(pivot)
    // console.log('meta2:', {pivot, pos})

    newData[jsonKey][pos] = rec[cols.indexOf(val)]

  })
  // console.log('newData:', newData)

  const result = Object.entries(newData).map(rec => {
    const [k, v] = rec
    const inflated = [
      ...(JSON.parse(k)),
      ...v
    ]
    return inflated
  })
  // console.log('inflated:', result)

  return [
    [...reducedCols, ...names[key]],
    ...result
  ]

  // return data
}

module.exports = pivot_wider