const rewire = require('rewire')
const cssStandardsRewired = rewire('../lib')
const cssStandards = require('../lib')
const test = require('ava')

test('basic', (t) => {
  cssStandardsRewired.__set__('postcssImport', (opts) => {
    t.truthy(opts.root === 'test')
    t.truthy(opts.path[0] === 'test/test1')
    t.truthy(opts.path[1] === 'test/test2')
  })

  cssStandardsRewired.__set__('cssnext', (opts) => {
    t.truthy(opts.features === 'test')
    t.truthy(opts.browsers === 'test')
    t.truthy(opts.warnForDuplicates === 'test')
  })

  cssStandardsRewired.__set__('rucksack', (opts) => {
    t.truthy(opts === 'test')
  })

  const out1 = cssStandardsRewired({
    parser: false,
    path: ['test/test1', 'test/test2'],
    features: 'test',
    browsers: 'test',
    warnForDuplicates: 'test',
    rucksack: 'test',
    root: 'test'
  })

  t.truthy(out1.plugins.length === 3)
  t.falsy(out1.parser)

  const out2 = cssStandards({ minify: true })

  t.truthy(out2.parser)
  t.truthy(out2.plugins.length === 4)
})
