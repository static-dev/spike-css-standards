let postcssImport = require('postcss-import')
let customProperties = require('postcss-custom-properties')
let calc = require('postcss-calc')
let imageSet = require('postcss-image-set-polyfill')
let nesting = require('postcss-nesting')
let customMedia = require('postcss-custom-media')
let mediaQueriesRange = require('postcss-media-minmax')
let customSelectors = require('postcss-custom-selectors')
let attributeCaseInsensitive = require('postcss-attribute-case-insensitive')
let colorRebeccapurple = require('postcss-color-rebeccapurple')
let colorHwb = require('postcss-color-hwb')
let colorHsl = require('postcss-color-hsl')
let colorRgb = require('postcss-color-rgb')
let colorGray = require('postcss-color-gray')
let colorHexAlpha = require('postcss-color-hex-alpha')
let colorFunction = require('postcss-color-function')
let fontFamilySystemUi = require('postcss-font-family-system-ui')
let fontVariant = require('postcss-font-variant')
let pseudoClassMatches = require('postcss-selector-matches')
let pseudoClassNot = require('postcss-selector-not')
let pseudoClassAnyLink = require('postcss-pseudo-class-any-link')
let rucksack = require('rucksack-css')
let autoprefixer = require('autoprefixer')

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
  options.path = options.path ? Array.prototype.concat(options.path) : []

  // standard options merge
  const importOpt = selectKeys(options, ['root', 'path'])

  // define default plugin list
  const plugins = [
    postcssImport(importOpt),
    customProperties(options.customProperties),
    calc(options.calc),
    imageSet(options.imageSet),
    nesting(options.nesting),
    customMedia(options.customMedia),
    mediaQueriesRange(options.mediaQueriesRange),
    customSelectors(options.customSelectors),
    attributeCaseInsensitive(options.attributeCaseInsensitive),
    colorRebeccapurple(options.colorRebeccapurple),
    colorHwb(options.colorHwb),
    colorHsl(options.colorHsl),
    colorRgb(options.colorRgb),
    colorGray(options.colorGray),
    colorHexAlpha(options.colorHexAlpha),
    colorFunction(options.colorFunction),
    fontFamilySystemUi(options.fontFamilySystemUi),
    fontVariant(options.fontVariant),
    pseudoClassMatches(options.pseudoClassMatches),
    pseudoClassNot(options.pseudoClassNot),
    pseudoClassAnyLink(options.pseudoClassAnyLink),
    autoprefixer(options.autoprefixer),
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
  if (options.minify) plugins.push(require('cssnano')(options.cssnano))

  return {
    parser: options.parser,
    plugins
  }
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
