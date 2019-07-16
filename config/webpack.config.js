const HtmlWebPackPlugin = require("html-webpack-plugin"),
    CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    commonConfig = require('./common.config.js'),
    entry = commonConfig.entry,
    output = commonConfig.output,
    devServer = commonConfig.devServer,
    alias = commonConfig.alias,
    scriptRules = commonConfig.scriptRules,
    cssRules = commonConfig.cssRules,
    imagesRules = commonConfig.imagesRules,
    htmlWebPackPlugin = commonConfig.htmlWebPackPlugin,
    optimization = commonConfig.optimization;
    CopyWebpackPlugin = require('copy-webpack-plugin'),

module.exports = {
    entry: { ...entry },
    output: { ...output },
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: { ...devServer },
    resolve: {
        alias: { ...alias }
    },
    module: {
        rules: [
            { ...scriptRules },
            { ...cssRules },
            { ...imagesRules }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            root: process.cwd()
        }),
        new CaseSensitivePathsPlugin(),
        new CopyWebpackPlugin([{
            from: 'public/images',
            to: 'images'
        }]),
        new HtmlWebPackPlugin({
            ...htmlWebPackPlugin
        })
    ],
    optimization: { ...optimization }
};