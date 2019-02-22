# gatsby-plugin-stylus-resources

Provides drop-in support for Stylus with or without CSS Modules, with shared resources (e.g. variables, mixins etc.)

This is an extended version of [gatsby-plugin-stylus](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-stylus)

The only difference is the use of [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) so you can use your shared variables & mixins across all `.styl` files without manually importing them in each file.

## Install

`npm i gatsby-plugin-stylus-resources -d`

or

`yarn add gatsby-plugin-stylus-resources -D`

## Usage

1.  Create your file (or files) with resources:

```styl
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

2.  Include the plugin in your `gatsby-config.js` file :

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