import { Router } from "express";

import { hasRole, validateJWT } from "../middleware/index.js";

import { getRoles, postRole } from "../controllers/role.controller.js";

const routerRole = Router();

routerRole.get("/", 
// [
    // validateJWT,
    // hasRole("Administrador", "Operador", "Consultor")
    // ], 
    getRoles
);

routerRole.post("/", postRole);

export { routerRole };