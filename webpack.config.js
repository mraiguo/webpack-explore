const path = require('path'); // 引入node的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: { // 设置打包的入口文件是相对当前路径的app.js文件
        main: './app.js'
    },
    output: {
        filename: 'app.bundle.js', // 打包后输出的文件名为app.bundle.js
        path: path.resolve(__dirname, 'dist') // 输出文件存放的文件夹
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({   // webpack 指定目录(package内设置)生成静态HTML文件
            title: "指定标题",
            filename: "index.html",
            template: "template.html",
            hash: true,       // true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。
            inject: true,     // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            chunks: ["main"]   // 使用chunks 需要指定entry 入口文件中的哪一个模块
        })
    ]
};

module.exports = config;