const path = require("path"),
    HtmlWebPackPlugin = require("html-webpack-plugin"),
    CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    commonConfig = require('./common.config.js'),
    entry = commonConfig.entry,
    output = commonConfig.output,
    devServer = commonConfig.devServer,
    alias = commonConfig.alias,
    scriptRules = commonConfig.scriptRules,
    imagesRules = commonConfig.imagesRules,
    htmlWebPackPlugin = commonConfig.htmlWebPackPlugin,
    optimization = commonConfig.optimization;

module.exports = {
    entry: { ...entry },
    output: {
        ...output,
        path: path.resolve(process.cwd(), 'dist')

    },
    mode: "production",
    devServer: {
        ...devServer,
        compress: true

    },
    resolve: {
        alias: { ...alias }
    },
    module: {
        rules: [
            { ...scriptRules },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]'
                        }
                    },
                    "postcss-loader"
                ]
            },
            { ...imagesRules }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            root: process.cwd()
        }),
        new CaseSensitivePathsPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new CopyWebpackPlugin([{
            from: 'public/images',
            to: 'images'
        }]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].chunk.css"
        }),
        new HtmlWebPackPlugin({ ...htmlWebPackPlugin })
    ],
    optimization: {
        ...optimization,
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                extractComments: 'all'
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};