import { Router } from "express";
import { deleteUser, getUserById, getUsers, postUser, putUser } from "../controllers/users.controller.js";
import { changeEmail } from "../middleware/index.js";

const routerUser = Router();

routerUser.get("/", getUsers);

routerUser.get("/:id", getUserById);

routerUser.post("/", postUser);

routerUser.put("/:id", [
    changeEmail
], putUser);

routerUser.delete("/:id", deleteUser);

export { routerUser };
