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
        }),
        // 创建一个在编译时可以配置的全局常量,在业务代码中获取
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(true),
            PRODUCTION: JSON.stringify(false),
        })
    ],
    devServer: {
        // todo: proxy选项
        proxy: {
            '/page*': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: 'false',
                bypass: function(req, res, proxyOptions) {
                    // do sth
                    // 如果浏览器请求页面返回一个html，
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                },
                onProxyReq: function(proxyReq, req, res) {
                    // do sth
                    // 如果是post请求 而且请求体存在
                    // if (req.method === 'POST' && req.body) {
                    //     const bodyData = querystring.stringify(req.body)
                    //     proxyReq.write(bodyData)
                    // }
                }
            }
        }
    },
    mode: 'development'
});

module.exports = devConfig;