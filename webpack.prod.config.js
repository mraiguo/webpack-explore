const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const devConfig = merge(baseConfig, {
    devtool: 'cheap-source-map',
    plugins: [
        //指定环境，将process.env.NODE_ENV环境与library关联 todo： webpack4下没有效果?
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new HtmlwebpackPlugin({
            title: '生产环境标题',
            filename: 'index.html',
            template: './template.html'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            DEVELOPMENT: JSON.stringify(false),
        })
    ],
    mode: 'production'
});

module.exports = devConfig;