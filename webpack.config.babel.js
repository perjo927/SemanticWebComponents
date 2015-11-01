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
        // Hot reload: Watch and only reload what changed - not everything
        app: ['webpack/hot/dev-server', './src/core/bootstrap.ts']
    } ,
    // The compiled file will be named and dumped in the dist folder when compiling.
    output: {
        filename: 'bundle.js', //  'bundle-[hash:6].js' , [name].bundle.js
        path: `${__dirname}/dist`
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
        new webpack.HotModuleReplacementPlugin(),
        new cleanPlugin(['dist']), // Cleans dist every rebuild
        new htmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new extractTextPlugin('app.css', { allChunks: true }), // Extract the main css file instead of inlining it
        new ngAnnotatePlugin({ add: true }) // For cleaner angular modules dependency injection
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
                loader: 'style!css!autoprefixer!sass'
                //loader: 'style!css!postcss!sass'
            },

            // Extract-Text moves every require("<name>.css") in entry chunks into a separate css output file.
            // No inlined styles into the javascript, but separate in a css bundle file (styles.css).
            // It will be faster because the stylesheet bundle is loaded in parallel to the javascript bundle.
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer'
                )
                //    loader: 'style!css!autoprefixer'
                //    //loader: 'style!css!postcss' // postcss?pack=cleaner"
            }
        ]
        //postcss: [ autoprefixer({ browsers: ["Android > 1", "IE > 1"] }) ]
        //postcss: [ autoprefixer ] // list of browsers available in the browserslist config file
        //postcss: function () {
        //    return {
        //        defaults: [autoprefixer],
        //        cleaner:  [autoprefixer({ browsers: [] })]
        //    };
        //}
    }
};

module.exports = config;