import * as fs from 'fs';
import {resolve} from "path";
import {createBundleRenderer, BundleRenderer} from 'vue-server-renderer';
import * as LRU from 'lru-cache';

export class Renderer {

    private index: string;
    private baseDir: string;

    public Renderer(index: string, baseDir: string) {
        this.index = resolve(index);
        this.baseDir = resolve(baseDir);
    }

    private createRenderer(bundle, options): BundleRenderer {
        return createBundleRenderer(bundle, Object.assign(options, {
            template: fs.readFileSync(this.index, 'utf-8'),
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: this.baseDir,
            runInNewContext: false
        }));
    }
}