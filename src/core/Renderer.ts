import * as express from "express";

export interface Renderer {
    
    render(req: express.Request, res: express.Response): void;

    initialize(app: express.Express): void;
}