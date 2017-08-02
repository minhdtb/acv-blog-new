import {WebServer} from "./core/WebServer"
import {ServerRenderer} from "./ssr/ServerRenderer";

const server = new WebServer(new ServerRenderer());
server.setPort(3000);
server.start();