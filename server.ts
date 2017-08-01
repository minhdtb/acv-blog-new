import {WebServer} from "./src/core/WebServer"

const server = new WebServer();
server.setPort(3000);
server.start();