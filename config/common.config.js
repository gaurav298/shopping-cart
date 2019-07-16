const path = require("path");

exports.entry = {
    app: './src/index.jsx',
};

exports.output = {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(process.cwd(), 'build')
};

exports.devServer = {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    https: false
};

exports.alias = {
    StyleSheets: path.resolve(process.cwd(), 'src/css/'),
    Components: path.resolve(process.cwd(), 'src/js/components/'),
    Scripts: path.resolve(process.cwd(), 'src/js/'),
    Pages: path.resolve(process.cwd(), 'src/js/pages/'),
    Data: path.resolve(process.cwd(), 'public/data/'),
    Images: path.resolve(process.cwd(), 'public/images/')
};

exports.scriptRules = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
};

exports.cssRules = {
    test: /\.css$/,
    use: [
        "style-loader",
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]'
            }
        },
        "postcss-loader"
    ]
};

exports.imagesRules = {
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            emitFile: false
        }
    }]
};


exports.optimization = {
    runtimeChunk: "single",
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            default: false, //disable default 'commons' chunk behavior
            vendors: false,
            // vendor chunk
            vendor: {
                // name of the chunk
                name: (module) => {
                    // get the name. E.g. node_modules/packageName/not/this/part.js
                    // or node_modules/packageName
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    // npm package names are URL-safe, but some servers don't like @ symbols
                    return `npm.${packageName.replace('@', '')}`;
                },
                // async + async chunks
                chunks: 'all',
                // import file path containing node_modules
                test: /[\\/]node_modules[\\/]/,
                // priority
                priority: 20
            },
            // common chunk
            common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    }
};

exports.htmlWebPackPlugin = {
    template: "./public/index.html",
    filename: "./index.html"
};