import {WebServer} from "./core/WebServer"

const server = new WebServer();
server.setPort(3000);
server.start();