import { Router } from "express";
import { check } from "express-validator";

import { deleteUser, getUserById, getUsers, postUser, putUser } from "../controllers/users.controller.js";
import { changeEmail, hasRole, validateFields, validateJWT } from "../middleware/index.js";

const routerUser = Router();

routerUser.get("/", [
    validateJWT,
    hasRole("Administrador", "Operador", "Consultor"),
    validateFields
], getUsers);

routerUser.get("/:id", [
    validateJWT,
    hasRole("Administrador", "Operador", "Consultor"),
    check("id", "No es un ID válido").isMongoId(),
    validateFields
], getUserById);

routerUser.post("/", [
    validateJWT,
    hasRole("Administrador", "Operador"),
    check("userName", "Debe ingresar el nombre de usuario").not().isEmpty(),
    check("password", "Debe ingresar una contraseña").not().isEmpty(),
    check("role", "Debe asignar un rol").not().isEmpty(),
    check('userData').optional(),
    check('userData.email', "Debes registrar un email").not().isEmpty(),
    validateFields
], postUser);

routerUser.put("/:id", [
    validateJWT,
    hasRole("Administrador", "Operador"),
    check("id", "No es un ID válido").isMongoId(),
    changeEmail
], putUser);

routerUser.delete("/:id", [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un ID válido").isMongoId(),
    validateFields
], deleteUser);

export { routerUser };
