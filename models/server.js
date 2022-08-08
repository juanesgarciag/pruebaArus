import express from 'express';
import cors from 'cors';
import { dbConection } from '../database/config.db.js';
import { routerUser } from '../routes/user.routes.js';
import { routerRole } from '../routes/role.routes.js';
import { routerServer } from '../routes/server.routes.js';


class Server {
    constructor() {
        this.expressApp = express();
        this.usersPath = "/api/users";
        this.rolesPath = "/api/roles";
        this.serversPath = "/api/servers";

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
        this.expressApp.use(this.usersPath, routerUser);
        this.expressApp.use(this.rolesPath, routerRole);
        this.expressApp.use(this.serversPath, routerServer);
    }

    listen(){
        this.expressApp.listen(this.PORT, () => {
            console.log(`Conexión establecida en http://localhost:${this.PORT}`);
        })
    }

}


export {Server};