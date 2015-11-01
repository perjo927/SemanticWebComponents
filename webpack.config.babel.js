'use strict';

// Imports
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cleanPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const path = require('path'); // can be used for resolve(), cxombine(), join()


// The main Webpack configuration object
let config = {
    // Absolute path which aids in resolving the relative path located in the entry option
    context: __dirname,
    entry: {
        app: ['webpack/hot/dev-server', './src/core/bootstrap.ts'] // Hot code reload
    } ,
    // The compiled file will be named and dumped in the dist folder when compiling.
    output: {
        filename: 'bundle.js', //  'bundle-[hash:6].js' , [name].bundle.js
        path: `${__dirname}/dist`,
        publicPath: "/public/"
    },
     // Turn on source maps
    devtool: 'source-map',
    resolve: {
        //  Path aliases that maps to the absolute path of the specified directory . Used when importing
        alias: {
            npm: `${__dirname}/node_modules`
        },
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', ".css", ".scss"], // Lets you require ("./<name>")
        modulesDirectories: ["node_modules" ]
    },
    // Build hooks
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        // Hot code reload: Watch and only reload code that changed - not everything
        new webpack.HotModuleReplacementPlugin(),
        // Cleans dist every rebuild
        new cleanPlugin(['dist']),
        // Creates the outputted html file
        new htmlWebPackPlugin({
            filename: 'index.html',
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
        // new HtmlWebpackPlugin(), // Generates default index.html
        //new HtmlWebpackPlugin({  // Also generate a test.html
        //    filename: 'test.html',
        //    template: 'src/assets/test.html'
        //})

        // ExtractTextPlugin moves every require("<name>.css") in entry chunks into a separate css output file.
        // No inlined styles into the javascript, but separate in a css bundle file (<name>.css).
        // It will be faster because the stylesheet bundle is loaded in parallel to the javascript bundle.
        new extractTextPlugin('app.css', { allChunks: true }), // Extract the main css file instead of inlining it
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
                loader: "html" // [name]-[hash:6].html
                //loader: 'file?name=templates/'
            },

            // Instead of making HTTP requests to get tiny assets, the url-loader can access them encoded (base64)
            // Determine the limit (in bytes) under which you want the encoded version of the file
            // If the file is bigger you will get the path to it.
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(eot|svg|ttf)$/,
                loader: 'file'
                // loader: 'file?name=fonts/[name].[ext]'
            },
            //{
            //    test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
            //    loader : 'file-loader?name=res/[name].[ext]?[hash]'
            //}
            //{
            //  test: /\.svg$/,
            //  loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            //}

            // When images are under 5kb we want to get a base64 of them and when they are greater than 5kb we want to
            // get the path to them (exactly as with the file-loader).
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url?limit=5000&name=img/img-[hash:6].[ext]"
            },

            // You can move any type of file around by using the file-loader.
            // var imgBig = '<img src="' + require("./src/image_big.jpg") + '" />';
            // => var imgBig = '<img src="img/img-a4bd04.jpg" />';
            //{
            //    test: /\.(png|jpg|gif)$/,
            //    loader: "file-loader?name=img/img-[hash:6].[ext]" //  new image folder with a naming convention of img-[hash].[ext].
            //}

            {
                test: /\.ts$/,
                loader: 'ts'
            },
            // Transpiles final stage ES6 to ES5. JSHint requires a .jshintrc at the root directory. Annotates Angular DI
            // You now can require any ES6 modules using require('./<name>.js')
            {
                test: /\.js?$/,
                loader: 'ng-annotate!babel?stage=4!jshint', //ng-annotate?add=true
                exclude: /node_modules|bower_components/
            },

            // In your modules just require the stylesheet and a <style>-tag is added to the DOM.
            // require("<name>.scss");  will compile and add the CSS to your page
            {
                test: /\.scss$/,
                loader: 'style!css!autoprefixer!sass?sourceMap'
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer'
                )
            }
        ]
        // TODO: Make postcss work
        //postcss: function () {
        //    return {
        //        defaults: [autoprefixer],
        //        cleaner:  [autoprefixer({ browsers: [] })]
        //    };
        //}
    }
};

module.exports = config;