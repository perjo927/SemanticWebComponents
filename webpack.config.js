'use strict';
var webpack = require('webpack');
var path = require('path');

var APP = __dirname + '/src';

module.exports = {
    context: APP,
    entry: {
        app: ['webpack/hot/dev-server', './app.ts']
    } ,
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist')
    },
     // Turn on source maps
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};