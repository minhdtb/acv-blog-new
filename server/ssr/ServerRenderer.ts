import * as fs from 'fs';
import {resolve} from "path";
import {createBundleRenderer, BundleRenderer} from 'vue-server-renderer';
import * as LRU from 'lru-cache';
import * as express from "express";
import {Renderer} from "../core/Renderer";

const serialize = require('serialize-javascript');
const production = process.env.NODE_ENV === 'production';

const serve = (path, cache) => express.static(resolve(__dirname, path), {
    maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0
});

export class ServerRenderer implements Renderer {

    private static getFile(file: string) {
        return fs.readFileSync(resolve(file), 'utf-8');
    }

    private static parseHtml(template: string) {
        const contentMarker = '<!-- APP -->';
        const i = template.indexOf(contentMarker);

        return {
            head: template.slice(0, i),
            tail: template.slice(i + contentMarker.length)
        }
    }

    getRouter(application: express.Express): express.Router {
        const router = express.Router();

        let renderer: BundleRenderer;
        let indexHTML;

        if (production) {
            renderer = createBundleRenderer(ServerRenderer.getFile('../../dist/server-bundle.js'), {
                cache: LRU({
                    max: 1000,
                    maxAge: 1000 * 60 * 15
                })
            });

            indexHTML = ServerRenderer.parseHtml(ServerRenderer.getFile('../../dist/index.html'));
        } else {
            require('../../../dev-server')(application, {
                onHtmlChange: index => {
                    indexHTML = ServerRenderer.parseHtml(index);
                },
                onBundleChange: bundle => {
                    renderer = createBundleRenderer(bundle);
                }
            })
        }

        application.use('/dist', express.static(resolve('../../dist')));

        router.get('*', (req, res) => {

            if (!renderer || !indexHTML) {
                return res.end('Waiting for webpack compilation... Refresh in a bit.')
            }

            const context = {
                url: req.url,
                initialState: false
            };

            const renderStream = renderer.renderToStream(context);

            res.setHeader('Content-Type', 'text/html');

            renderStream.once('data', () => {
                res.write(indexHTML.head)
            });

            renderStream.on('data', chunk => {
                res.write(chunk)
            });

            renderStream.on('end', () => {
                if (context.initialState) {
                    res.write(
                        `<script>window.__INITIAL_STATE__=${
                            serialize(context.initialState, {isJSON: true})
                            }</script>`
                    )
                }

                res.end(indexHTML.tail)
            });


            renderStream.on('error', err => {
                if (err && err['code'] === '404') {
                    res.status(404).end('404 | Page Not Found');
                    return
                }

                res.status(500).end('Internal Error 500')
            })
        });

        return router;
    }
}