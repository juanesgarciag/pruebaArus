import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { dbConection } from "../database/config.db.js";
import {
  routerAuth,
  routerRole,
  routerServer,
  routerUser,
} from "../routes/index.routes.js";
import { socketController } from "../sockets/socket.controller.js";

class ServerApp {
  constructor() {
    this.expressApp = express();
    this.socketApp = createServer(this.expressApp);
    this.io = new Server(this.socketApp, {});

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      roles: "/api/roles",
      servers: "/api/servers",
    };

    this.PORT = process.env.PORT || 3000;

    //Db connect
    this.dbConect();

    // Middlewares
    this.middlewares();

    //Routes
    this.routes();

    // Sockets
    this.sockets();
  }

  async dbConect() {
    await dbConection();
  }

  middlewares() {
   // Cors
    this.expressApp.use(cors());

    //Lectura y parseo de body
    this.expressApp.use(express.json());

    //Public
    this.expressApp.use(express.static("public"));
  }

  routes() {
    this.expressApp.use(this.paths.auth, routerAuth);
    this.expressApp.use(this.paths.users, routerUser);
    this.expressApp.use(this.paths.roles, routerRole);
    this.expressApp.use(this.paths.servers, routerServer);
  }

  sockets() {
    console.log("Escuchando sockets");
    this.io.on("connection", socketController);
  }

  listen() {
    this.socketApp.listen(this.PORT, () => {
      console.log(`Conexión establecida en ${process.env.URI}${this.PORT}`);
    });
  }
}

export { ServerApp };
