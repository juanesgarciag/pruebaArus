import express from 'express';
import cors from 'cors';
import http from 'http';

import { dbConection } from '../database/config.db.js';
import { routerAuth, routerRole, routerServer, routerUser  } from '../routes/index.routes.js';

class Server {
    constructor() {
        this.expressApp = express();
        this.paths = {
            auth:       "/api/auth",
            users:      "/api/users",
            roles:      "/api/roles",
            servers:    "/api/servers"
        }

        this.PORT = process.env.PORT || 3000;

        //Db connect
        this.dbConect();

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async dbConect() {
        await dbConection();
    }

    middlewares(){
        //Cors
        this.expressApp.use(cors());

        //Lectura y parseo de body
        this.expressApp.use(express.json());

        //Public
        this.expressApp.use(express.static('public'));
    }

    routes(){
        this.expressApp.use(this.paths.auth, routerAuth);
        this.expressApp.use(this.paths.users, routerUser);
        this.expressApp.use(this.paths.roles, routerRole);
        this.expressApp.use(this.paths.servers, routerServer);
    }

    listen(){
        this.expressApp.listen(this.PORT, () => {
            console.log(`Conexión establecida en http://localhost:${this.PORT}`);
        })
    }

}


export {Server};