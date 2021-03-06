const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const vueConfig = require('./vue-loader.config');

module.exports = {
    devtool: '#source-map',
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.common.js',
            'vue-router': 'vue-router/dist/vue-router.js',
            'vuex': 'vuex/dist/vuex.js'
        }
    },
    entry: {
        app: './client/entry-client.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/, loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader',
                        tsx: 'babel-loader!ts-loader',
                    }
                }
            },
            {
                test: /\.ts$/, loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.tsx$/, loader: 'babel-loader!ts-loader',
                options: {
                    appendTsxSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
    ]
};
