const sugarss = require('sugarss')
let postcssImport = require('postcss-import')
let cssnext = require('postcss-cssnext')
let rucksack = require('rucksack-css')

/**
 * Primary export, formats options and returns an object with intelligent
 * defaults.
 * @param  {Object} [options={}] - options object
 * @param {Function} [options.parser=sugarss] - if false, is set to undefined
 * @param {Array|String} options.path - passed to import plugin
 * @param {String} options.root - passed to import plugin
 * @param {Array} options.browsers - passed to cssnext plugin
 * @param {Object} options.features - passed to cssnext plugin
 * @param {Boolean} options.warnForDuplicates - passed to cssnext plugin
 * @param {Object} options.rucksack - passed to rucksack plugin
 * @param {Boolean} options.minify - whether or not to add the minify plugin
 * @return {Object} valid postcss options object
 */
module.exports = (options = {}) => {
  // sugarss by default unless false or custom parser
  let parser = options.parser || sugarss
  if (options.parser === false) parser = undefined
  options.path = options.path ? Array.prototype.concat(options.path) : []

  // standard options merge
  const importOpt = selectKeys(options, ['root', 'path'])
  const cssnextOpt = selectKeys(options, ['browsers', 'features', 'warnForDuplicates'])

  // define default plugin list
  const plugins = [
    postcssImport(importOpt),
    cssnext(cssnextOpt),
    rucksack(options.rucksack)
  ]

  // append and prepend plugins if needed
  if (options.appendPlugins) {
    plugins.push(...Array.prototype.concat(options.appendPlugins))
  }

  if (options.prependPlugins) {
    plugins.unshift(...Array.prototype.concat(options.prependPlugins))
  }

  // add cssnano if minify config present
  if (options.minify) plugins.push(require('cssnano')())

  return {parser, plugins}
}

/**
 * Given an options object and an array of key names, return an object filtered
 * to contain only the keys in the optNames array, if they exist on the options
 * object.
 * @param  {Object} opts - full options object
 * @param  {Array} optNames - keys to filter
 * @return {Object} object filtered for the specific keys
 */
function selectKeys (opts, optNames) {
  return optNames.reduce((m, opt) => {
    if (typeof opts[opt] !== 'undefined') { m[opt] = opts[opt] }; return m
  }, {})
}
