import { Router } from "express";
import { check } from "express-validator";

import {
  deleteServer,
  getServerById,
  getServers,
  getServersByUserId,
  postServer,
  putServer,
  serverActualization,
} from "../controllers/server.controller.js";
import { validateFields } from "../middleware/validate-fields.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import { hasRole } from "../middleware/validate-role.js";

const routerServer = Router();

routerServer.get(
  "/",
  [
    validateJWT,
    // hasRole("Administrador", "Operador", "Consultor"),
  ],
  getServers
);

routerServer.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    // hasRole("Administrador", "Operador", "Consultor")
  ],
  getServerById
);

routerServer.get("/byuser/:id", getServersByUserId);

routerServer.post(
  "/",
  [
    validateJWT,
    // hasRole("Administrador", "Operador"),
    check("serverName", "Debe ingresar un nombre para el servidor")
      .not()
      .isEmpty(),
    check("serverCapacity", "Debe ingresar la capacidad del servidor")
      .not()
      .isEmpty(),
    check("serverOverloadAlert", "Debe ingresar la alerta").not().isEmpty(),
    validateFields,
  ],
  postServer
);

routerServer.post("/serverupdate/:id", serverActualization);

routerServer.put(
  "/:id",
  [
    validateJWT,
    // hasRole("Administrador", "Operador"),
    check("id", "No es un ID válido").isMongoId(),
    validateFields,
  ],
  putServer
);

routerServer.delete(
  "/:id",
  [
    validateJWT,
    // hasRole("Administrador"),
    check("id", "No es un ID válido").isMongoId(),
    validateFields,
  ],
  deleteServer
);

export { routerServer };
