import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middleware/validate-fields.js";

import { login } from "../controllers/auth.controller.js";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    check("email", "El correo no es válido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

export { routerAuth };
