const path = require('path');
const vueConfig = require('./vue-loader.config');

module.exports = {
    // Webpack debugging tool
    devtool: '#source-map',

    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'vue-router': 'vue-router/dist/vue-router.js'
        }
    },
    // The default entry file and the dependencies used there
    entry: {
        app: './client/entry-client.ts'
    },
    // Where the output will be written to.
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },

    // Define what happens to each module
    module: {

        // noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            // All Vue files are loaded with the vue-loader
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                },
                exclude: /node_modules/
            },
            // All image / static assets are processed with the url-loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
};
