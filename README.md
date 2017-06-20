# Spike CSS Standards

[![npm](https://img.shields.io/npm/v/spike-css-standards.svg?style=flat-square)](https://npmjs.com/package/spike-css-standards)
[![tests](https://img.shields.io/travis/static-dev/spike-css-standards.svg?style=flat-square)](https://travis-ci.org/static-dev/spike-css-standards?branch=master)
[![dependencies](https://img.shields.io/david/static-dev/spike-css-standards.svg?style=flat-square)](https://david-dm.org/static-dev/spike-css-standards)
[![coverage](https://img.shields.io/coveralls/static-dev/spike-css-standards.svg?style=flat-square)](https://coveralls.io/r/static-dev/spike-css-standards?branch=master)

A standard plugin pack for postcss

### Installation

`npm install spike-css-standards -S`

### Usage

This is nothing more than a light wrapper around a postcss configuration object. Options are filtered into their appropriate plugins internally. All are optional.

```js
const postcss = require('postcss')
const cssStandards = require('spike-css-standards')

const standards = cssStandards(/* options */)
// returns { parser: 'xxx', plugins: ['xxx'] }

postcss(standards.plugins)
  .process(/* css string */, { parser: standards.parser })
  .then((res) => { console.log(res.content) })

```

By default, the css standard plugin pack includes:

- [sugarss](https://github.com/postcss/sugarss), whitespace-based html, similar to jade/pug
- [postcss-import](https://github.com/postcss/postcss-import), like `require` for css
- [rucksack](https://simplaio.github.io/rucksack/), collection of syntax sugar for css
- [autoprefixer](https://github.com/postcss/autoprefixer), automatic vendor prefixing
- [postcss-attribute-case-insensitive](https://github.com/Semigradsky/postcss-attribute-case-insensitive), allows [case insensitive attr selectors](https://www.w3.org/TR/selectors4/#attribute-case)
- [postcss-calc](https://github.com/postcss/postcss-calc), reduces calc expression where possible
- [postcss-color-function](https://github.com/postcss/postcss-color-function), polyfill for [color-mod function](https://drafts.csswg.org/css-color/#modifying-colors)
- [postcss-color-gray](https://github.com/postcss/postcss-color-gray), polyfill for [gray function](https://drafts.csswg.org/css-color/#grays)
- [postcss-color-hex-alpha](https://github.com/postcss/postcss-color-hex-alpha), polyfill for [rgba hex notations](https://github.com/postcss/postcss-color-hex-alpha)
- [postcss-color-hsl](https://github.com/dmarchena/postcss-color-hsl), polyfill for [new hsl syntax](https://drafts.csswg.org/css-color/#the-hsl-notation)
- [postcss-color-hwb](https://github.com/postcss/postcss-color-hwb), polyfill for [hue whiteness blackness function](https://drafts.csswg.org/css-color/#the-hwb-notation)
- [postcss-color-rebeccapurple](https://github.com/postcss/postcss-color-rebeccapurple), polyfill for [rebeccapurple color](https://drafts.csswg.org/css-color/#valdef-color-rebeccapurple)
- [postcss-color-rgb](https://github.com/dmarchena/postcss-color-rgb), polyfill for [css module level 4 rgb function](https://drafts.csswg.org/css-color/#funcdef-rgb)
- [postcss-custom-media](https://github.com/postcss/postcss-custom-media), polyfill for [custom media queries](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties), polyfill for [css variables](https://www.w3.org/TR/css-variables/)
- [postcss-custom-selectors](https://github.com/postcss/postcss-custom-selectors), polyfill for [custom selectors](https://drafts.csswg.org/css-extensions/#custom-selectors)
- [postcss-font-family-system-ui](https://github.com/JLHwung/postcss-font-family-system-ui), 
- [postcss-font-variant](https://drafts.csswg.org/css-fonts-4/#system-ui-def), polyfill for generic [system-ui](https://github.com/JLHwung/postcss-font-family-system-ui) font definition
- [postcss-image-set-polyfill](https://github.com/SuperOl3g/postcss-image-set-polyfill), polyfills [image-set](https://drafts.csswg.org/css-images-3/#image-set-notation) for resolution detection
- [postcss-media-minmax](https://github.com/postcss/postcss-media-minmax), nice syntax sugar for media queries from [media queries level 4 spec](https://drafts.csswg.org/mediaqueries/#mq-range-context)
- [postcss-nesting](https://github.com/jonathantneal/postcss-nesting), polyfill for [css nesting module level 3](http://tabatkins.github.io/specs/css-nesting/)
- [postcss-pseudo-class-any-link](https://github.com/jonathantneal/postcss-pseudo-class-any-link), polyfills [:any-link pseudo-class](https://drafts.csswg.org/selectors/#any-link-pseudo)
- [postcss-selector-matches](https://github.com/postcss/postcss-selector-matches), polyfills [:matches pseudo-class](https://drafts.csswg.org/selectors-4/#matches)
- [postcss-selector-not](https://github.com/postcss/postcss-selector-not), polyfills [:not pseudo-class](https://drafts.csswg.org/selectors-4/#negation)
- [cssnano](http://cssnano.co/), minifies css, toggled with the `minify` option which is false by default

Any of these plugins can be customized by passing the [options](#options) described below. You can also add additional postCSS plugins (like the popular [`lost`](https://github.com/peterramsing/lost) grid, for example) on top of this package:

```js
const cssStandards = require('spike-css-standards')
const lost = require('lost')

const css = cssStandards()
css.plugins.push(lost())
```

### Options

| Name | Description | Default |
| ---- | ----------- | ------- |
| **root** | Root used to resolve `path`(s) from | |
| **path** | A path to a folder or an array of paths, telling postcss-import where to look for sss or css files to `@import`. | |
| **rucksack** | Options passed directly to [rucksack](http://simplaio.github.io/rucksack/docs/#options) | |
| **postcssImport** | Options passed to [postcss-import](https://github.com/postcss/postcss-import) | |
| **autoprefixer** | Options passed to [autoprefixer](https://github.com/postcss/autoprefixer) | |
| **attributeCaseInsensitive** | Options passed to [postcss-attribute-case-insensitive](https://github.com/Semigradsky/postcss-attribute-case-insensitive) | |
| **calc** | Options passed to [postcss-calc](https://github.com/postcss/postcss-calc) | |
| **colorFunction** | Options passed to [postcss-color-function](https://github.com/postcss/postcss-color-function) | |
| **colorGray** | Options passed to [postcss-color-gray](https://github.com/postcss/postcss-color-gray) | |
| **colorHexAlpha** | Options passed to [postcss-color-hex-alpha](https://github.com/postcss/postcss-color-hex-alpha) | |
| **colorHsl** | Options passed to [postcss-color-hsl](https://github.com/dmarchena/postcss-color-hsl) | |
| **colorHwb** | Options passed to [postcss-color-hwb](https://github.com/postcss/postcss-color-hwb) | |
| **colorRebeccapurple** | Options passed to [postcss-color-rebeccapurple](https://github.com/postcss/postcss-color-rebeccapurple) | |
| **colorRgb** | Options passed to [postcss-color-rgb](https://github.com/dmarchena/postcss-color-rgb) | |
| **customMedia** | Options passed to [postcss-custom-media](https://github.com/postcss/postcss-custom-media) | |
| **customProperties** | Options passed to [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) | |
| **customSelectors** | Options passed to [postcss-custom-selectors](https://github.com/postcss/postcss-custom-selectors) | |
| **fontFamilySystemUi** | Options passed to [postcss-font-family-system-ui](https://github.com/JLHwung/postcss-font-family-system-ui) | |
| **fontVariant** | Options passed to [postcss-font-variant](https://drafts.csswg.org/css-fonts-4/#system-ui-def) | |
| **imageSet** | Options passed to [postcss-image-set-polyfill](https://github.com/SuperOl3g/postcss-image-set-polyfill) | |
| **mediaQueriesRange** | Options passed to [postcss-media-minmax](https://github.com/postcss/postcss-media-minmax) | |
| **nesting** | Options passed to [postcss-nesting](https://github.com/jonathantneal/postcss-nesting) | |
| **pseudoClassAnyLink** | Options passed to [postcss-pseudo-class-any-link](https://github.com/jonathantneal/postcss-pseudo-class-any-link) | |
| **pseudoClassMatches** | Options passed to [postcss-selector-matches](https://github.com/postcss/postcss-selector-matches) | |
| **pseudoClassNot** | Options passed to [postcss-selector-not](https://github.com/postcss/postcss-selector-not) | |
| **cssnano** | Options passed to [cssnano](http://cssnano.co/) | |
| **parser** | custom css parser if desired. pass `false` to use the default css parser | `sugarss` |
| **minify** | Minifies the css output by removing excess spaces and line breaks | `false` |
| **appendPlugins** | Adds a single plugin or array of plugins after all the defaults | |
| **prependPlugins** | Adds a single plugin or array of plugins before all the defaults | |

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
