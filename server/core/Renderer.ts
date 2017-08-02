import * as express from "express";

export interface Renderer {
    getRouter(application: express.Express): express.Router;
}