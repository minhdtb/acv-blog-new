// Core
const webpack = require('webpack');

// Additional config files
const base = require('./webpack.base.config.js');
const vueConfig = require('./vue-loader.config.js');

// Plugins to use with webpack.
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Config object.
const config = Object.assign({}, base, {

    // Setup all the plugins we use for development.
    // Combine the plugins listed in the base and add these to it.
    plugins: ( base.plugins || [] ).concat([
        // strip comments in Vue code
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // generate output HTML
        new HTMLPlugin({
            template: './client/index.html'
        })
    ])
});

// Some additional optimization is done for production.
if (process.env.NODE_ENV === 'production') {
    // Use ExtractTextPlugin to extract CSS into a single file
    // so it's applied on initial render.
    // vueConfig is already included in the config via LoaderOptionsPlugin
    // here we overwrite the loader config for <style lang="stylus">
    // so they are extracted.
    vueConfig.loaders = {
        stylus: ExtractTextPlugin.extract({
            loader: 'css-loader!stylus-loader',
            fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader
        })
    };

    config.plugins.push(
        new ExtractTextPlugin('styles.[hash].css'),

        // this is needed in webpack 2 for minifying CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = config;
