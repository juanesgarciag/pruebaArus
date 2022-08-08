import { response, request } from "express";

import User from "../models/user.model.schema.js";
import Server from "../models/servers.model.schema.js";

const getServers = async (req = request, res = response) => {
  const { page = 1, limit = 5 } = req.query;
  const userData = { path: "userAssociated", select: "userName" };

  const options = {
    populate: userData,
    page,
    limit,
  };

  const servers = await Server.paginate({}, options);

  res.json(servers);
};

const postServer = async (req = request, res = response) => {
  const { userAssociated, ...rest } = req.body;

  const user = await User.findById(userAssociated);

  const server = new Server({
    userAssociated: user._id,
    ...rest,
  });

  try {
    const savedServer = await server.save();

    user.servers = user.servers.concat(savedServer._id);
    await user.save();
  } catch (error) {
    throw new Error(error);
  }

  res.json(server);
};

const putServer = async (req = request, res = response) => {
  const { id } = req.params;

  const { ...rest } = req.body;

  const server = await Server.findByIdAndUpdate(id, rest);

  res.json(server);
};

const deleteServer = async (req = request, res = response) => {
  const { id } = req.params;

  const server = await Server.findByIdAndDelete(id);

  res.json(server);
};

export { getServers, postServer, putServer, deleteServer };
