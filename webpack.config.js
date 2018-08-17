const path = require('path'); // 引入node的path模块

const config = {
    entry: './app.js', // 设置打包的入口文件是相对当前路径的app.js文件
    output: {
        filename: 'app.bundle.js', // 打包后输出的文件名为app.bundle.js
        path: path.resolve(__dirname, 'dist') // 输出文件存放的文件夹
    }
};

module.exports = config;