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
            title: '生产环境标题',
            filename: 'index.html',
            template: './template.html'
        })
    ],
    mode: 'production'
});

module.exports = devConfig;