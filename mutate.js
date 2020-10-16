
const safeEval = require('safe-eval')

const getContext = (rec, cols) => {
  const context = {rec:{}}
  cols.forEach((col, i) => {
    const value = !isNaN(rec[i]) ? Number(rec[i]) : rec[i]
    context.rec[col] = value
  })
  return context
}

function mutate(data, [mutation]) {
  const cols = [...data[0]]
  const recs = data.slice(1)
  // console.log('mutation:', mutation)
  mutation.forEach(([col]) => cols.push(col))
  // console.log('cols:', cols)
  const result = recs.map(rec => {
    const context = getContext(rec, data[0])
    // console.log('context:', context)
    mutation.forEach(([,expr]) => {
      // console.log('expr:', expr)
      const result = safeEval(expr, context)
      rec.push(isNaN(Number(result)) ? result : Number(result))
    })
    return rec
  })
  return [
    cols,
    ...result
  ]
}

module.exports = mutate
