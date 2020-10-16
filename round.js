
function round(data, params) {
  const cols = data[0]
  const recs = data.slice(1)
  const result = recs.map(rec => {
    const mutated = rec.map(v => 
      isNaN(v) ? v : v.toFixed(2)
    )
    return mutated
  })
  return [
    cols,
    ...result
  ]
}

module.exports = round