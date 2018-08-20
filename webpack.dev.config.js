const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const devConfig = merge(baseConfig, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: './template.html'
        })
    ],
    devServer: {
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         secure: 'false',
        //         // bypass: function(req, res, proxyOptions) {
        //         //     if (req.headers.accept.indexOf('html') !== -1) {
        //         //         console.log('Skipping proxy for browser request.');
        //         //         return '/index.html';
        //         //     }
        //         // }
        //     }
        // }
    },
    mode: 'development'
});

module.exports = devConfig;