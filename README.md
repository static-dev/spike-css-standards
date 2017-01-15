# Spike CSS Standards

[![npm](https://img.shields.io/npm/v/spike-css-standards.svg?style=flat-square)](https://npmjs.com/package/spike-css-standards)
[![tests](https://img.shields.io/travis/static-dev/spike-css-standards.svg?style=flat-square)](https://travis-ci.org/static-dev/spike-css-standards?branch=master)
[![dependencies](https://img.shields.io/david/static-dev/spike-css-standards.svg?style=flat-square)](https://david-dm.org/static-dev/spike-css-standards)
[![coverage](https://img.shields.io/coveralls/static-dev/spike-css-standards.svg?style=flat-square)](https://coveralls.io/r/static-dev/spike-css-standards?branch=master)

standard plugin pack for postcss

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.


### Installation

`npm install spike-css-standards -S`

> **Note:** This project is compatible with node v6+ only

### Usage

This is nothing more than a light wrapper around a postcss configuration object. Options are filtered into their appropriate plugins internally. All are optional.

```js
const postcss = require('postcss')
const cssStandards = require('spike-css-standards')

const standards = cssStandards(/* options */)
// returns { parser: 'xxx', plugins: ['xxx'] }

postcss(standards.plugins)
  .process(someCss, { parser: standards.parser })
  .then((res) => { console.log(res.content) })

```

By default, the css standard plugin pack includes:

- [sugarss](https://github.com/postcss/sugarss), provided as default parser
- [postcss-import](https://github.com/postcss/postcss-import), default settings
- [postcss-cssnext](http://cssnext.io/), default settings
- [rucksack](https://simplaio.github.io/rucksack/), default settings
- [cssnano](http://cssnano.co/), toggled with the `minify` option which is false by default

Any of these plugins can be customized by passing the [options](#options) described below. You can also add additional postCSS plugins (like the popular [`lost`](https://github.com/peterramsing/lost) grid, for example) on top of this package:

```js
//  app.js
const cssStandards = require('spike-css-standards')
const lost = require('lost')

//  ...
postcss: (ctx) => {
  const css = cssStandards({ webpack: ctx })
  css.plugins.push(lost())
  return css
},
//  ...
```

### Options

| Name | Description | Default |
| ---- | ----------- | ------- |
| **root** | Root path used to resolve layouts and includes | |
| **addDependencyTo** | Object with `addDependency` method that will get file paths for tracked deps from includes/layouts | |
| **path** | A string or an array of paths to tell [postcss-import](https://github.com/postcss/postcss-import#path) where to look for files. | |
| **webpack** | Shortcut for webpack users to set the `root` and `addDependencyTo` options more easily. Pass webpack loader context. | |
| **browsers** | Browser support provided to [autoprefixer](http://cssnext.io/usage/#browsers) | `> 1%, last 2 versions, Firefox ESR` |
| **features** | Enable or disable [cssnext features](http://cssnext.io/usage/#features) | |
| **warnForDuplicates** | Enable or disable [cssnext duplicate warnings](http://cssnext.io/usage/#warnforduplicates) | `true` |
| **rucksack** | Options passed directly to [rucksack](http://simplaio.github.io/rucksack/docs/#options) | |
| **parser** | custom css parser if desired. pass `false` to use the default css parser | `sugarss` |
| **minify** | Minifies the css output by removing excess spaces and line breaks | `false` |

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
