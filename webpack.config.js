var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js'
    },
    stats: "errors-only",
    watch: true,
    devtool: "cheap-eval-source-map",
    devServer: {
        port: 8080,
        stats: "errors-only"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'index.html',
            inject: false
        })
    ]
};

module.exports = config;
