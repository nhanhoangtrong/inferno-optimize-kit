const webpack = require('webpack');
const { join, resolve } = require('path');
const merge = require('webpack-merge');

// Require webpack plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Set the environment to development by default
const __DEV__ = process.env.NODE_ENV !== 'production';

// Then initialize some constants
const BUILD_DIR = resolve(__dirname, 'build');
const PUBLIC_DIR = resolve(__dirname, 'public');
const SOURCE_DIR = resolve(__dirname, 'src');
const MEDIA_DIR = 'media';
const NAME_PREFIX = __DEV__ ? '[name]' : '[name].[chunkhash:8]';
const PUBLIC_PATH = '/';

const baseConfig = {
    target: 'web',
    // Each entry points will be built to a output file
    entry: {
        app: './index.jsx',
    },
    // Notify Webpack to resolve js, jsx and json file, and use @app alias for SOURCE_DIR
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@app': SOURCE_DIR,
        },
    },
    // This where webpack will resolve all the entry points
    context: SOURCE_DIR,
    // Configure output options include output path, output file and chunk names
    output: {
        path: BUILD_DIR,
        publicPath: PUBLIC_PATH,
        filename: NAME_PREFIX + '.js',
        chunkFilename: NAME_PREFIX + '.chunk.js',
    },
    devtool: __DEV__ ? 'cheap-module-eval-source-map' : false,
    performance: {
        // Configurate how the performance hints are shown, we will disable in dev
        // by default the maxEntrypointSize is 250kB and will be shown as a warning
        hints: __DEV__ ? false : 'warning',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Tell babel-loader to cache files in development
                        cacheDirectory: __DEV__,
                    },
                },
            },
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                // Only apply on context dir
                include: SOURCE_DIR,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        // In development, only show errors
                        // In others, show warnings and errors
                        quiet: __DEV__,
                        // and cache checking information for better performance
                        cache: __DEV__,
                    },
                },
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: __DEV__,
                            importLoaders: 1,
                            minimize: __DEV__,
                            localIdentName:
                                '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                // Other media files will be copy to specific folders in folder
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: `${MEDIA_DIR}/[name].[hash:16].[ext]`,
                    },
                },
            },
        ],
    },
    plugins: [
        // This plugin goes first in order to clean the old built assets
        new CleanWebpackPlugin(BUILD_DIR),
        // This plugin allow us to define some important environment variables
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                __DEV__ ? 'development' : 'production'
            ),
            __DEV__: __DEV__,
        }),
        // This plugin creates a HTML file to serve all webpack bundles
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation. You can either let the plugin
        // generate an HTML file for you, supply your own
        // template using lodash templates or use your own loader
        new HTMLWebpackPlugin({
            // This where the HTML file will be written to
            filename: 'index.html',
            title: 'Inferno Optimize Starter Kit',
            // Path to the template that we use to render html file
            template: join(__dirname, 'index.ejs'),
            // Inject all bundled files into the template
            inject: true,
            // Minify config on production only
            minify: !__DEV__ && {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
    ],
};

if (__DEV__) {
    const devConfig = {
        mode: 'development',
        performance: {
            hints: false,
        },
        devServer: {
            publicPath: PUBLIC_PATH,
            contentBase: [BUILD_DIR],
            hot: true,
            inline: true,
            historyApiFallback: true,
            proxy: {},
        },
        resolve: {
            alias: {
                inferno$: 'inferno/dist/index.dev.esm.js',
            },
        },
        plugins: [
            // Enable HMR that webpack provided
            new webpack.HotModuleReplacementPlugin(),
            // This plugin will cause the relative path of module to be displayed when HMR was enabled
            new webpack.NamedModulesPlugin(),
        ],
    };
    module.exports = merge(baseConfig, devConfig);
} else {
    const prodConfig = {
        mode: 'production',
        performance: {
            hints: 'warning',
        },
        plugins: [
            // In production, we use UglifyJsPlugin for minimizing javascript bundles
            // Using newest built from plugin instead of webpack built
            new UglifyJsPlugin({
                // Passing an uglify option object
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                    },
                    output: {
                        comments: false,
                    },
                },
                // Remove source map
                sourceMap: false,
            }),
        ],
    };
    module.exports = merge(baseConfig, prodConfig);
}
