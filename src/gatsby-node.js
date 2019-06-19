exports.onCreateWebpackConfig = (
    { actions, stage, loaders },
    { resources, postCssPlugins, ...stylusOptions },
) => {
    const { setWebpackConfig } = actions;
    const PRODUCTION = stage !== `develop`;
    const isSSR = stage.includes(`html`);

    const stylusLoader = {
        loader: require.resolve(`stylus-loader`),
        options: {
            sourceMap: !PRODUCTION,
            ...stylusOptions,
        },
    };

    const ressourcesLoader = {
        loader: require.resolve('sass-resources-loader'),
        options: {
            resources,
        },
    };

    const stylusRule = {
        test: /\.styl$/,
        use: isSSR
            ? [loaders.null()]
            : [
                  loaders.miniCssExtract(),
                  loaders.css({ importLoaders: 2 }),
                  loaders.postcss({ plugins: postCssPlugins }),
                  stylusLoader,
                  ressourcesLoader,
              ],
    };

    const stylusRuleModules = {
        test: /\.module\.styl$/,
        use: [
            !isSSR && loaders.miniCssExtract({ hmr: false }),
            loaders.css({ modules: true, importLoaders: 2 }),
            loaders.postcss({ plugins: postCssPlugins }),
            stylusLoader,
            ressourcesLoader,
        ].filter(Boolean),
    };

    let configRules = [];

    // eslint-disable-next-line default-case
    switch (stage) {
        case `develop`:
        case `build-javascript`:
        case `build-html`:
        case `develop-html`:
            configRules = configRules.concat([
                {
                    oneOf: [stylusRuleModules, stylusRule],
                },
            ]);
            break;
    }

    setWebpackConfig({
        module: {
            rules: configRules,
        },
    });
};
