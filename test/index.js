const rewire = require('rewire')
const cssStandardsRewired = rewire('../lib')
const cssStandards = require('../lib')
const test = require('ava')

test('passes parser opt correctly', (t) => {
  const out = cssStandards({ parser: 'test' })
  t.is(out.parser, 'test')
})

test('passes import opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('postcssImport', (opts) => {
    t.is(opts.root, 'test')
    t.is(opts.path[0], 'test')
  })
  cssStandardsRewired({ root: 'test', path: 'test' })
  undo()
})

test('passes customProperties opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('customProperties', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ customProperties: 'test' })
  undo()
})

test('passes calc opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('calc', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ calc: 'test' })
  undo()
})

test('passes imageSet opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('imageSet', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ imageSet: 'test' })
  undo()
})

test('passes nesting opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('nesting', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ nesting: 'test' })
  undo()
})

test('passes mediaQueriesRange opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('mediaQueriesRange', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ mediaQueriesRange: 'test' })
  undo()
})

test('passes customSelectors opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('customSelectors', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ customSelectors: 'test' })
  undo()
})

test('passes attributeCaseInsensitive opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('attributeCaseInsensitive', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ attributeCaseInsensitive: 'test' })
  undo()
})

test('passes colorRebeccapurple opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('colorRebeccapurple', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ colorRebeccapurple: 'test' })
  undo()
})

test('passes colorHwb opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('colorHwb', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ colorHwb: 'test' })
  undo()
})

test('passes colorRgb opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('colorRgb', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ colorRgb: 'test' })
  undo()
})

test('passes colorGray opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('colorGray', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ colorGray: 'test' })
  undo()
})

test('passes colorHexAlpha opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('colorHexAlpha', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ colorHexAlpha: 'test' })
  undo()
})

test('passes colorFunction opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('colorFunction', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ colorFunction: 'test' })
  undo()
})

test('passes fontFamilySystemUi opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('fontFamilySystemUi', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ fontFamilySystemUi: 'test' })
  undo()
})

test('passes fontVariant opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('fontVariant', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ fontVariant: 'test' })
  undo()
})

test('passes pseudoClassMatches opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('pseudoClassMatches', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ pseudoClassMatches: 'test' })
  undo()
})

test('passes pseudoClassNot opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('pseudoClassNot', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ pseudoClassNot: 'test' })
  undo()
})

test('passes pseudoClassAnyLink opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('pseudoClassAnyLink', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ pseudoClassAnyLink: 'test' })
  undo()
})

test('passes autoprefixer opts correctly', (t) => {
  const undo = cssStandardsRewired.__set__('autoprefixer', (opts) => {
    t.is(opts, 'test')
  })
  cssStandardsRewired({ autoprefixer: 'test' })
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
  t.is(out.plugins.length, 23)
})

test('minify option working', (t) => {
  const out = cssStandards({ minify: true })
  t.is(out.plugins.length, 24)
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
