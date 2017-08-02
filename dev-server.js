const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('./config/webpack.client.config.js');
const serverConfig = require('./config/webpack.server.config.js');


module.exports = function setupDevServer(app, cbs) {

    /*
     *  Setup the dev middleware for webpack.
     */
    const clientBundleCompiler = webpack(modifiedWebpackConfig());
    const devMiddleware = webpackDevMiddleware(clientBundleCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });

    /*
     *  The index renderer will receive the new HTML after it's rendered by webpack
     */
    clientBundleCompiler.plugin('done', () => {
        const filePath = path.join(clientConfig.output.path, 'index.html');
        const index = devMiddleware.fileSystem.readFileSync(filePath, 'utf-8');

        // Send the new index back to the renderer
        cbs.onHtmlChange(index)
    });

    /*
     *  Create and watch the server bundle compiler.
     */
    const serverBundleCompiler = webpack(serverConfig);
    const mfs = new MFS();
    const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);

    serverBundleCompiler.outputFileSystem = mfs;

    serverBundleCompiler.watch('', (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));

        // Send the new bundle back to the renderer
        cbs.onBundleChange(mfs.readFileSync(outputPath, 'utf-8'))
    });


    /*
     *  Add dev and hot middleware to the app
     */
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(clientBundleCompiler))
};


/*
 *  Webpack config needs to be modified to work with hot reloading
 */
function modifiedWebpackConfig() {
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );

    return clientConfig
}
