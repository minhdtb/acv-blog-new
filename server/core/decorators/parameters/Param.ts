import {Request} from 'express';
import {getParameters, IParameter} from "../../common/Parameter";

export function Param<Function>(name?: string): ParameterDecorator {
    return (target: Object, method: string, index: number) => {
        let parameters = getParameters(target);
        if (!parameters[method]) {
            parameters[method] = [];
        }

        parameters[method].push(new ParamParameter(name, index));
    };
}

export class ParamParameter implements IParameter {

    constructor(public name: string,
                public index: Number) {
        if (!this.name) {
            this.name = 'value' + this.index;
        }
    }

    public getValue(req: Request) {
        return req.params[this.name];
    }
}