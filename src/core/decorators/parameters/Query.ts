import 'reflect-metadata';
import {getParameters, Parameter} from "../../common/Parameter";
import {Request} from 'express';

export function Query<Function>(name: string): ParameterDecorator {
    return (target: Function, method: string, index: number) => {
        let parameters = getParameters(target);
        if (!parameters[method]) {
            parameters[method] = [];
        }

        parameters[method].push(new QueryParameter(name, index));
    };
}

export class QueryParameter implements Parameter {

    constructor(public name: string,
                public index: Number) {
    }

    public getValue(req: Request) {
        return req.query[this.name];
    }
}