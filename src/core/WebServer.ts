import {HttpServer} from "./base/HttpServer";
import glob = require('glob');
import {join} from "path";
import * as express from "express";
import * as _ from "lodash";
import {HttpMethod} from "./common/HttpMethod";
import {buildUrl} from "./common/Route";
import {View} from "./common/View";
import * as path from 'path'

import "reflect-metadata";

export class WebServer extends HttpServer {

    public static readonly controllers: any[] = [];

    private express: express.Express;

    constructor() {
        let application = express();
        super(application);

        this.express = application;
    }

    private async loadControllers() {
        try {
            const p = path.resolve(__dirname, '../controllers');
            const files = await new Promise<string[]>((resolve, reject) => {
                glob('*.js', {cwd: p}, (error, matches) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(matches);
                });
            });

            for (const file of files) {
                require(join(p, file));
            }
        } catch (e) {
            this.getLogger().error(e);
        }
    }

    private registerRoutes() {
        let router = express.Router();
        let controllers = WebServer.controllers;
        for (const controller of controllers) {
            let routes = Reflect.getOwnMetadata('custom:routes', controller.prototype);
            let parameters = Reflect.getOwnMetadata('custom:parameters', controller.prototype);
            let instance = new controller;

            _.keys(routes)
                .map(key => routes[key])
                .forEach(route => {
                    let url = buildUrl(controller.prototype, route.name, route.url);
                    console.log(HttpMethod[route.method] + ' - ' + url);
                    router[HttpMethod[route.method]](url, this.createRoute(route, instance, parameters));
                });
        }

        this.express.use(router);

        this.express.get('*', (req, res) => {
            res.send('bbbbb');
        });
    }

    private createRoute(route, instance, parameters) {
        return async (req: express.Request, res: express.Response) => {
            const values: any[] = [];
            if (parameters) {
                const params = parameters[route.name];
                if (params) {
                    for (const param of params) {
                        values[param.index] = param.getValue(req);
                    }
                }
            }

            let result = route.callback.apply(instance, values);
            if (result instanceof Promise) {
                result = await result;
            } else if (result instanceof View) {
                return res.render(result.template, result.options);
            }

            res.send(result);
            res.end();
        };
    }

    private initialize() {
        return new Promise((resolve, reject) => {
            this.loadControllers()
                .then(() => {
                    this.registerRoutes();
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public start() {
        this.initialize()
            .then(() => {
                super.start();
            })
    }

    public getExpress(): express.Express {
        return this.express;
    }
}