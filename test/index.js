const rewire = require('rewire')
const cssStandardsRewired = rewire('../lib')
const cssStandards = require('../lib')
const test = require('ava')

test('passes parser opt correctly', (t) => {
  const out = cssStandards({ parser: 'test' })
  const out2 = cssStandards({ parser: false })
  t.is(out.parser, 'test')
  t.is(out2.parser, undefined)
})

test('passes import opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('postcssImport', (opts) => {
    t.is(opts.root, 'test')
    t.is(opts.path[0], 'test')
  })
  cssStandardsRewired({ root: 'test', path: 'test' })
  undo()
})

test('passes cssnext opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('cssnext', (opts) => {
    t.is(opts.browsers, 'test')
    t.is(opts.features, 'test')
    t.is(opts.warnForDuplicates, 'test')
  })
  cssStandardsRewired({
    browsers: 'test',
    features: 'test',
    warnForDuplicates: 'test'
  })
  undo()
})

test('passes rucksack opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('rucksack', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ rucksack: 'test' })
  undo()
})

test('default plugins working', (t) => {
  const out = cssStandards()
  t.is(out.plugins.length, 3)
})

test('minify option working', (t) => {
  const out = cssStandards({ minify: true })
  t.is(out.plugins.length, 4)
  t.is(out.plugins[out.plugins.length - 1].postcssPlugin, 'cssnano')
})

test('appendPlugins option', (t) => {
  const out = cssStandards({ appendPlugins: ['test'] })
  const out2 = cssStandards({ appendPlugins: 'test' })
  t.truthy(out.plugins[out.plugins.length - 1] === 'test')
  t.truthy(out2.plugins[out.plugins.length - 1] === 'test')
})

test('prependPlugins option', (t) => {
  const out = cssStandards({ prependPlugins: ['test'] })
  const out2 = cssStandards({ prependPlugins: 'test' })
  t.truthy(out.plugins[0] === 'test')
  t.truthy(out2.plugins[0] === 'test')
})
