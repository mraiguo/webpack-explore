const path = require('path') // 引入node的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    entry: { // 设置打包的入口文件是相对当前路径的app.js文件
        main: path.join(__dirname, './app.jsx')  // app.js作为打包的入口
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist') // 输出文件存放的文件夹
    },
    module: {
        rules:[
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'sass-loader', // MiniCssExtractPlugin.loader 和 style-loader 由于某种原因不能共存。todo: 啥原因
                ]
            },
            // 处理react 相关的内容
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, './node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
                ],
            },
            {
                test: /\.(jpeg|png|jpg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '1024'
                        }
                    },
                ]
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                    maxInitialRequests: 5,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({   // webpack 指定目录(package内设置)生成静态HTML文件
            title: "指定标题",
            filename: "index.html",
            template: "./template.html",
            hash: true,       // true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。
            inject: true,     // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            chunks: ["main"]   // 使用chunks 需要指定entry 入口文件中的哪一个模块
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CleanWebpackPlugin(['dist']), // 清除dist文件夹下文件
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), // todo：路径问题
        // compress: true, // 启用gzip todo： 好像只有app.bundle.js有启用gzip？
        port: 9000,
        open: true, // 开启服务的时候打开浏览器
        hot: true
    },
    resolve: {
        extensions: ['.js', '.jsx'], // import js和jsx文件的时候，不用带后缀名
        alias: {
            Component: path.resolve(__dirname, 'component'), // component文件夹起别名
        }
    }
};

module.exports = config