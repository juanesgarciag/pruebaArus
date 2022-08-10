import { response, request } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.schema.js";

const getUsers = async (req = request, res = response) => {
  const { page = 1, limit = 5 } = req.body;

  const roleData = ({path: 'role', select: 'role'});
  const serverData = ({path: 'servers', select: 'serverName'})

  const options = {
    populate: [roleData, serverData],
    page,
    limit,
  };

  const users = await User.paginate({ isActive: true }, options);

  res.json(users);
};

const getUserById = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate({path: 'role', select: "role"})
    .populate({path: 'servers', select: "serverName"});

  res.json(user);
};

const postUser = async (req = request, res = response) => {
  const { password, ...rest } = req.body;
  const user = new User({ password, ...rest });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  await user.save();

  res.json(user);
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    res.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { isActive: false });

  res.json(user);
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
