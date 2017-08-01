import {WebServer} from "./src/core/WebServer"
import {ServerRenderer} from "./src/ssr/ServerRenderer";

const server = new WebServer(new ServerRenderer());
server.setPort(3000);
server.start();