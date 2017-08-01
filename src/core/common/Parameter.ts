import {Request} from 'express';

export interface Parameter {
    name: string,
    index: Number,

    getValue(req: Request): any
}

export function getParameters(target): {} {
    if (!Reflect.hasOwnMetadata('custom:parameters', target)) {
        Reflect.defineMetadata('custom:parameters', {}, target);
    }

    return Reflect.getOwnMetadata('custom:parameters', target);
}