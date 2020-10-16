
const pivot_wider = require('./pivot_wider')
const ignore = require('./ignore')
const toTable = require('./toTable')
const mutate = require('./mutate')
const round = require('./round')

const stages = {
  pivot_wider,
  ignore,
  toTable,
  mutate,
  round,
}

module.exports = stages