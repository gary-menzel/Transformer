
const Transformer = (handlers, context = {}) => {
  return (data, pipe) => {
    return pipe.reduce(async (data, stage, step) => {
      const [ processName, ...params ] = stage
      const timer = `${step} - ${processName}`
      const handler = handlers[processName]
      if (handler) {
        const f = (data) => handler.call(context, data, params)
        console.time(timer)
        const next = await data
          .then(f)
          .catch(e => console.log('data.then error:', e)).finally(() => console.timeEnd(timer))
        return next
      } else console.log(`handler '${processName}' not found`, handlers)
      return data
    }, Promise.resolve(data)).catch((e) => console.log('Promise.resolve error:', e))
  }
}

Transformer.example = async () => {
  // eslint-disable-next-line no-unused-vars
  function test1(data, params) {
    data[0][0] = this.upper(data[0][0])
    const result = [
      ...data,
      ['one', 'two'],
      params[0],
    ]
    return result
  }
  const handlers = {test1}
  const context = {upper: (input) => input.toUpperCase()}
  const transform = Transformer(handlers, context)
  const data = [
    ['column1', 'column2'],
  ]
  const result = await transform(data, [
    ['test1',['who is this?', 'why am I watched?']]
  ]).catch(e => console.log('transform error:', e))

  return result
}

module.exports = Transformer
