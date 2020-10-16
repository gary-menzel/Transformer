
const Transformer = require('./Transformer')
// console.log('Transformer:', Transformer)

const data = require('./data.js')

// console.log('data[0]:', data[0])

const stages = require('./stages')
// console.log('stages:', stages)

const transform = Transformer(stages)

const pipeline = [
  ['toTable'],
  ['ignore', ['_id']],
  ["pivot_wider", {names: ['year'], values: ['value']}],
  ['ignore', ['method', 'lga_name16', 'variable', 'var_type']],
  ['mutate', 
    [
      ['Change', '`${rec["2019"] - rec["2015"]}`'],
    ] 
  ],
  ["round"]
]

const go = () => {
  console.log('\nTransformer - more than meets the eye...\n\n')
  console.time('transform')
  transform(data, pipeline)
    .then(result => {
      console.timeEnd('transform')
      // console.log('result:', result)
      console.log('')
      result.forEach(res => {
        console.log(res.join(','))
      })

      return result
    })
}

console.log('input go() and hit enter...')

