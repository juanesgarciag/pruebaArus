import { Router } from "express";
import { deleteServer, getServers, postServer, putServer } from "../controllers/server.controller.js";

const routerServer = Router();

routerServer.get("/", getServers);

routerServer.post("/", postServer);

routerServer.put("/:id", putServer);

routerServer.delete("/:id", deleteServer);

export {routerServer};