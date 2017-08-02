const webpack = require('webpack');
const base = require('./webpack.base.config.js');

module.exports = Object.assign({}, base, {
    target: 'node',

    devtool: false,

    entry: './client/entry-server.ts',

    output: Object.assign({}, base.output, {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    }),

    externals: Object.keys(require('../package.json').dependencies),

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
});
