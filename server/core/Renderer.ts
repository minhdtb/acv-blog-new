import * as express from "express";

export interface Renderer {

    router: express.Router;

    initialize(express: express.Express): void;
}