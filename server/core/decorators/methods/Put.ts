import {HttpRoute} from "../../common/HttpRoute";
import {HttpMethod} from "../../common/HttpMethod";
import {getRoutes} from "../../common/Route";

export function Put<Function>(route?: string): MethodDecorator {
    return (target: Function, method: string, descriptor: TypedPropertyDescriptor<any>) => {
        let routes = getRoutes(target);
        routes[method] = new HttpRoute(null, method, route, HttpMethod.put, descriptor.value);
    };
}