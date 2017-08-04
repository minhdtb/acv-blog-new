import {WebServer} from "./core/WebServer"
import {ServerRenderer} from "./renderer/ServerRenderer";
import * as Q from 'q';

const mongoose = require('mongoose');

mongoose.Promise = Q.Promise;
const uri = 'mongodb://localhost:27017/acv_blog';
mongoose.connect(uri, {
    promiseLibrary: Q.Promise,
    useMongoClient: true
}, error => {
    if (error)
        throw error;

    const server = new WebServer(new ServerRenderer());
    server.setPort(3000);
    server.start();
});

