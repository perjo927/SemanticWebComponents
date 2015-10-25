'use strict';

// Imports
const webpack = require('webpack');
const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

//
const app = `${__dirname}/src`; // path.resolve('./stc')

// Webpack configuration object
let config = {
    context: app,
    entry: {
        app: ['webpack/hot/dev-server', './app.ts'] // app.module.ts ?
    } ,
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist')
    },
     // Turn on source maps
    devtool: 'source-map',
    resolve: {
        alias: {
            npm: `${__dirname}/node_modules` // path.resolve('./node_modules')
        },
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new cleanPlugin(['dist']),
        new ngAnnotatePlugin({
            add: true
        })
    ],
    module: {
        // Task Runners for TS, CSS, fonts, svg, ES6
        // When Webpack parses the modules, it evaluates the import and require statements in app.ts:
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },

            {
                test: /\.(woff|woff2)$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(eot|svg|ttf)$/,
                loader: 'file'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel?stage=4' // Transpiles stage 4 ES6 to ES5
            }
        ]
    }
};

module.exports = config;