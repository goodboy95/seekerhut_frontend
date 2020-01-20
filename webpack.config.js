var path = require('path');
var entryPath = require('./config_module/entry');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: entryPath,
    output: {
        path: path.resolve(__dirname + '/frontend/js'),
        filename: '[name]',
        chunkFilename: '[id].bundle.js',
    },
    externals: {
        jquery: 'jQuery',
        layui: 'layui',
        vue: 'Vue',
        cookies: 'Cookies',
        vuerouter: 'vue-router'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
