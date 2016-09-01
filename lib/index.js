const sugarss = require('sugarss')
let postcssImport = require('postcss-import')
let cssnext = require('postcss-cssnext')
let rucksack = require('rucksack-css')

module.exports = (options) => {
  // sugarss by default unless false or custom parser
  let parser = options.parser || sugarss
  if (options.parser === false) parser = undefined

  // define addDependencyTo if the webpack object is provided
  if (options.webpack) {
    options.root = options.webpack.resourcePath
    options.addDependencyTo = options.webpack
  }

  // standard options merge
  const importOpt = selectiveMerge(options, ['root', 'addDependencyTo'])
  const cssnextOpt = selectiveMerge(options, ['browsers', 'features', 'warnForDuplicates'])

  // define normal plugin list
  const plugins = [
    postcssImport(importOpt),
    cssnext(cssnextOpt),
    rucksack(options.rucksack)
  ]

  // add cssnano if minify config present
  if (options.minify) plugins.push(require('cssnano')())

  return {parser, plugins}
}

function selectiveMerge (opts, optNames) {
  return optNames.reduce((m, opt) => {
    if (typeof opts[opt] !== 'undefined') { m[opt] = opts[opt] }; return m
  }, {})
}
