'use strict';

// Imports
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const cleanPlugin = require('clean-webpack-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// Webpack configuration object
let config = {
    context: `${__dirname}/src`, // absolute path which aids in resolving the relative path located in the entry option
    entry: {
        app: ['webpack/hot/dev-server', './core/bootstrap.ts'] // app.ts, app.module.ts ?
    } ,
    // The compiled file will be named and dumped in the dist folder when compiling.
    output: {
        filename: 'bundle.js', //  'bundle-[hash:6].js' , [name].bundle.js
        path: `${__dirname}/dist` //path.resolve('../dist')
    },
     // Turn on source maps
    devtool: 'source-map',
    resolve: {
        //  path aliases. maps to the absolute path of the directory of the key. used when importing
        alias: {
            npm: `${__dirname}/node_modules`
        },
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification, hot code reload, cleaning, and angular DI annotation
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //,
        new cleanPlugin(['dist'])
        ,

        new htmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })

        // ,
        //new ngAnnotatePlugin({
        //    add: true
        //})
    ],
    module: {
        // Task Runners for required files of specified type:  require('./src/<name>.<type>')
        // When Webpack parses the modules, it evaluates the import and require statements in <name>.<type>:
        loaders: [
            // Require any HTML files using require('./src/<name>.html');. All images will also be treated
            // as dependencies and therefore go through their specific stream of event
            {
                test: /\.html$/,
                loader: "html"
            },
            //{
            //    test: /\.html$/,
            //    loader: 'file?name=templates/[name]-[hash:6].html'
            //},

            // in your modules just require the stylesheet
            // This has the side effect that a <style>-tag is added to the DOM.
            // require("./src/<name>.css");  will compile and add the CSS to your page
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },
            // Sometimes you do not want to make HTTP requests to get assets.  For example, what’s the point making
            // HTTP requests to get tiny images when you can directly access them encoded (base64) ?
            // The url-loader does just that. What you need to do is to determine the limit (in bytes) under which you
            // want the encoded version of the file (if the file is bigger you will get the path to it).
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            //When images are under 5kb we want to get a base64 of them and when they are greater than 5kb we want to get the path to them (exactly as with the file-loader).
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader?limit=5000&name=img/img-[hash:6].[ext]"
            },

            // You can move any type of file around by using the file-loader.
            //{
            //    test: /\.(png|jpg|gif)$/,
            //    loader: "file-loader?name=img/img-[hash:6].[ext]" //  new image folder with a naming convention of img-[hash].[ext].
            //}, // the image ./src/img.jpg will be copy and renamed as such: dist/img/img-a4bd04.jpg
            // var imgBig = '<img src="' + require("./src/image_big.jpg") + '" />';
            // => var imgBig = '<img src="img/img-a4bd04.jpg" />';

            {
                test: /\.(eot|svg|ttf)$/,
                loader: 'file'
                // loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            // Transpiles final stage ES6 to ES5. JSHint requires a .jshintrc at the root directory. Annotates Angular DI
            {
                test: /\.js?$/, // You now can require any ES6 modules using require('./src/<name>.js');
                loader: 'ng-annotate?add=true!babel?stage=4!jshint',
                exclude: /node_modules|bower_components/
            }
        ],
        postcss: [ autoprefixer ] // browserslist
    }
};

module.exports = config;