import { response, request } from "express";

import Role from "../models/roles.model.shcema.js";

const getRoles = async (req = request, res = response) => {
    const roles = await Role.find();

    res.json(roles);
};

const postRole = async (req = request, res = response) => {

    const {...rest} = req.body;
    
    const role = new Role(rest);

    await role.save();

    res.json(role);
}

export { getRoles, postRole };
