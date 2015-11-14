'use strict';

// Imports
const webpack = require('webpack');
const cleanPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const path = require('path'); // can be used for resolve(), combine(), join()

// The main Webpack configuration object
let config = {
    // Absolute path which aids in resolving the relative path located in the entry option
    context: __dirname,
    entry: {
        app: ['webpack/hot/dev-server', './src/core/bootstrap.ts'] // Hot code reload
    } ,
    // The compiled file will be named and dumped in the dist folder when compiling.
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist/public`
        ,
        publicPath: `./public` // TODO dist folder doesn't understand relative path to /public ?
    },
    // Turn on source maps
    devtool: 'source-map',
    resolve: {
        //  Path aliases that maps to the absolute path of the specified directory . Used when importing
        alias: {
            npm: `${__dirname}/node_modules`
        },
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'], // Lets you require ("./<name>") for these extensions
        modulesDirectories: ["node_modules" ],
        root: `${__dirname}/src`
    },
    // Build hooks
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        // Hot code reload: Watch and only reload code that changed - not everything
        new webpack.HotModuleReplacementPlugin(),
        // Cleans dist every rebuild
        new cleanPlugin(['dist']),
        // Creates the outputted html file
        // TODO: Generate index.html for webpack-dev-server -
        // https://github.com/ampedandwired/html-webpack-plugin/issues/3
        new htmlWebPackPlugin({
            filename: '../index.html',
            template: './src/template.html',
            favicon: "./src/favicon.ico", // Adds the given favicon path to the output html,
            title: "Webpack && Angular && TypeScript && CSS Modules",
            keywords: ["webpack", "angular", "typescript", "css", "css modules"],
            description: "Angular & TypeScript & CSS Modules with Webpack",
            author: "Per Jonsson",
            inject: "body"

            //chunks: Allows you to add only some chunks (e.g. only the unit-test chunk)
            //excludeChunks: Allows you to skip some chunks (e.g. don't add the unit-test chunk)
        }),

        // ExtractTextPlugin moves every require("<name>.css") in entry chunks into a separate css output file.
        // No inlined styles into the javascript, but separate in a css bundle file (<name>.css).
        // Pros: Fewer style tags, sourcemap, CSS requested in parallel+cached separate, faster runtime (less code / DOM operations)
        // Cons: Additional HTTP request, longer compilation time, complex configuration, No runtime public path modification
        //      + No Hot Module Replacement
        new extractTextPlugin('app.css', { allChunks: true }),

        // For angular modules dependency injection, acts on /* @ngInject */ comment.
        new ngAnnotatePlugin({ add: true })
    ],
    module: {
        // Task Runners for required files of specified type:  require('./src/<name>.<type>')
        // When Webpack parses the modules, it evaluates the import and require statements in <name>.<type>:
        loaders: [

            // Require any HTML files using require('./src/<name>.html');. All images will also be treated
            // as dependencies and therefore go through their specific stream of event
            {
                test: /\.html$/,
                loader: "raw" // enables requiring of html files as strings using relative paths
                //loader: "html" // ?root=.
            },
            {
                test: /\.json/,
                loader: 'json'
            },
            // Instead of making HTTP requests to get tiny assets, the url-loader can access them encoded (base64)
            // Determine the limit (in bytes) under which you want the encoded version of the file
            // If the file is greater than the limit the file-loader is used and all query parameters are passed to it
            // Mimetype can be used as parameter or else they are inherited from extension
            {
                test: /\.(woff|woff2|ttf|eot)(\?]?.*)?$/,
                loader : 'url?limit=10000&name=fonts/[name].[ext]?[hash]'
            },
            {
                test: /\.(svg)$/,
                loader: "url?limit=10000&mimetype=image/svg+xml" // For inline SVG: loader: 'raw-loader' (?)
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url?limit=5000&name=img/img-[hash:6].[ext]"
            },
            {
                test: /\.ts(x?)$/,
                loader: 'ts'
            },
            // Transpiles final stage ES6 to ES5. JSHint requires a .jshintrc at the root directory.
            // Annotates Angular DI
            {
                test: /\.js?$/,
                loader: 'ng-annotate!babel?stage=4!jshint', //ng-annotate?add=true
                exclude: /node_modules|bower_components/
            },
            // In your modules just require the stylesheet and a <style>-tag is added to the DOM.
            // require("<name>.scss");  will compile and add the CSS to your page
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap!autoprefixer'
                // TODO: css modules parameter + postcss with autoprefixer + enable style css modules requiring in angular
            },
            // The query parameter modules enables the CSS Modules spec. (css-loader?modules)
            // This enables Local scoped CSS by default. (Switch it off with :global(...) or :global for selectors and/or rules.)
            // https://github.com/css-modules/css-modules
            {
                test: /\.css$/,
                loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer'

                // TODO: postcss with autoprefixer
                // * In order to create separate css output file, uncomment below
                // and replace the loader above (not compatible with hot module replacement)
                //loader: extractTextPlugin.extract(
                //    'style',
                //    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!autoprefixer'
                //)
            }
        ]
        // TODO: Make postcss work
        // postcss : []
    }
};

module.exports = config;