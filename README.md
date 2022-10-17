<h1 align="center" style="border-bottom: none;">gatsby-plugin-stylus-resources</h1>
<h2 align="center">Provides drop-in support for Stylus with or without CSS Modules, with shared resources (e.g. variables, mixins etc.)</h2>

<p align="center">
    <a href="https://github.com/JimmyBeldone/gatsby-plugin-stylus-resources">
        <img alt="travis build" src="https://github.com/JimmyBeldone/gatsby-plugin-stylus-resources/workflows/TESTING/badge.svg">
    </a>
    <a href="https://github.com/JimmyBeldone/gatsby-plugin-stylus-resources">
        <img alt="travis build" src="https://github.com/JimmyBeldone/gatsby-plugin-stylus-resources/workflows/PUBLISH/badge.svg">
    </a>
    <a href="https://www.npmjs.com/package/gatsby-plugin-stylus-resources">
        <img alt="npm version" src="https://badgen.net/npm/v/gatsby-plugin-stylus-resources">
    </a>
    <!-- <a href="#badge">
        <img alt="dependencies status" src="https://badgen.net/david/dep/JimmyBeldone/gatsby-plugin-stylus-resources">
    </a>
    <a href="#badge">
        <img alt="dev dependencies status" src="https://badgen.net/david/dev/JimmyBeldone/gatsby-plugin-stylus-resources">
    </a> -->
</p>
<p align="center">
    <a href="http://commitizen.github.io/cz-cli/">
        <img alt="commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
    </a>
    <a href="https://github.com/prettier/prettier">
        <img alt="prettier" src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg">
    </a>
    <a href="https://github.com/JimmyBeldone/gatsby-plugin-stylus-resources/blob/master/LICENSE">
        <img alt="license" src="https://badgen.net/github/license/JimmyBeldone/gatsby-plugin-stylus-resources">
    </a>
</p>

This is an extended version of [gatsby-plugin-stylus](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-stylus).

The only difference is the use of [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) so you can use your shared variables & mixins across all `.styl` files without manually importing them in each file.

**Feel free to check out and run the [example folder](https://github.com/JimmyBeldone/gatsby-plugin-stylus-resources/tree/master/example) for detailed configuration.**

## Install

⚠️ **BREAKING CHANGE : v2 uses `stylus-loader@5.x.x` which requires Webpack 5 minimun (included in Gatsby v3)**

### For Gatsby v3

`npm i gatsby-plugin-stylus-resources -d`

or

`yarn add gatsby-plugin-stylus-resources -D`

### For Gatsby v2

`npm i gatsby-plugin-stylus-resources@1.0.36 -d`

or

`yarn add gatsby-plugin-stylus-resources@1.0.36 -D`

## Usage

1. Create your file (or files) with resources :

    ```stylus
    /* styles/config/mixins.styl */

    flexbox($value = row)
        display: flex
        flex-direction: $value

    truncate($fontsize = 14px)
        flexbox()
        height: $fontsize + 4px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
    ```

2. Include the plugin in your `gatsby-config.js` file :

    ```javascript
    /* gatsby-config.js */

    module.exports = {
      plugins: [
        {
          resolve: "gatsby-plugin-stylus-resources",
          options: {
            resources: ['./src/styles/config/mixins.styl', 'path/to/another/file.styl'],
          },
        },
      ],
    }
    ```

⚠️ **Do not include anything that will be actually rendered in CSS**, because it will be added to every imported `.styl` file.

### Without CSS Modules

```javascript
// in gatsby-config.js
plugins: [`gatsby-plugin-stylus-resources`]
```

### With CSS Modules

Using CSS modules requires no additional configuration. Simply prepend `.module` to the extension. For example: `App.styl` -> `App.module.styl`.
Any file with the `module` extension will use CSS modules.

### With Stylus plugins

This plugin has the same API as
[stylus-loader](https://github.com/shama/stylus-loader#stylus-plugins), which
means you can add stylus plugins with `use`:

```javascript
// in gatsby-config.js
const rupture = require("rupture")

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-stylus-resources",
      options: {
        use: [rupture()],
      },
    },
  ],
}
```

### PostCSS plugins

PostCSS is also included to handle some default optimizations like autoprefixing a
and common cross-browser flexbox bugs. Normally you don't need to think about it, but if
you'd prefer to add additional postprocessing to your Stylus output you can sepecify plugins
in the plugin options

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-stylus-resources`,
    options: {
      postCssPlugins: [somePostCssPlugin()],
    },
  },
]
```

## Contributing

Contributions are welcome ! See [contributing guidelines](https://github.com/JimmyBeldone/gatsby-plugin-webpack-bundle-analyser-v2/blob/master/CONTRIBUTING.md)

## License

MIT

Copyright (c) 2019 Jimmy Beldone
