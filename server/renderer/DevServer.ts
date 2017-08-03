import * as path from "path"

const webpack = require('webpack');
const MFS = require('memory-fs');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const clientConfig = require(path.resolve('./config/webpack.client.config.js'));
const serverConfig = require(path.resolve('./config/webpack.server.config.js'));

export function setupDevServer(app, cbs) {

    const clientBundleCompiler = webpack(modifiedWebpackConfig());
    const devMiddleware = webpackDevMiddleware(clientBundleCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    });

    clientBundleCompiler.plugin('done', () => {
        const filePath = path.join(clientConfig.output.path, 'index.html');
        const index = devMiddleware.fileSystem.readFileSync(filePath, 'utf-8');
        cbs.onHtmlChange(index)
    });

    const serverBundleCompiler = webpack(serverConfig);
    const mfs = new MFS();
    const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);

    serverBundleCompiler.outputFileSystem = mfs;
    serverBundleCompiler.watch('', (err, stats) => {
        if (err) throw err;

        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));

        cbs.onBundleChange(mfs.readFileSync(outputPath, 'utf-8'))
    });

    app.use(devMiddleware);
    app.use(webpackHotMiddleware(clientBundleCompiler))
}

function modifiedWebpackConfig() {
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );

    return clientConfig
}
