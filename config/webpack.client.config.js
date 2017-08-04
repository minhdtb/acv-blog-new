const webpack = require('webpack');

const base = require('./webpack.base.config.js');
const vueConfig = require('./vue-loader.config.js');

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = Object.assign({}, base, {
    plugins: ( base.plugins || [] ).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return (
                    /node_modules/.test(module.context) &&
                    !/\.css$/.test(module.request)
                )
            }
        }),
        new HTMLPlugin({
            template: './client/index.html'
        })
    ])
});

if (process.env.NODE_ENV === 'production') {
    vueConfig.loaders = {
        stylus: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
    };
    config.plugins.push(
        new ExtractTextPlugin('styles.[hash].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new UglifyJsPlugin()
    )
}

module.exports = config;
