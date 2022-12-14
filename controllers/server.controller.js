import { response, request } from "express";

import User from "../models/user.model.schema.js";
import Server from "../models/servers.model.schema.js";
import mongoose from "mongoose";

const serv = new Server();

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

const getServerById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const server = await Server.findById(id).populate({
      path: "userAssociated",
      select: "userName",
    });

    res.json(server);
  } catch (error) {
    throw new Error(error);
  }
};

const getServersByUserId = async ( req = request, res = response ) => {
  const { id } = req.params;

  try {
    
    const serversUser = await Server.find({'userAssociated': id});

    res.json(serversUser);

  } catch (error) {
    throw new Error(error);
  }
}

const postServer = async (req = request, res = response) => {
  const { _id, ...rest } = req.body;

  const server = new Server(rest);

  await server.save();

  // try {
  //   const savedServer = await server.save();

  //   user.servers = user.servers.concat(savedServer._id);
  //   await user.save();
  // } catch (error) {
  //   throw new Error(error);
  // }

  res.json(server);
};

const serverActualization = async (req = request, res = response) => {
  const {id} = req.params;
  const {serverActuall} = req.body;

  const server = await Server.findById(id);
  
  if(serverActuall >= server.serverOverloadAlert){
    server.serverCapacity += 10;
    server.serverActuall = serverActuall;
    server.serverOverloadAlert += 10;
    server.save(); 
  }

  res.json(server);

}

const putServer = async (req = request, res = response) => {
  const { id } = req.params;

  const { ...rest } = req.body;

  try {
    const server = await Server.findByIdAndUpdate(id, rest);

    res.json(server);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteServer = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const server = await Server.findByIdAndDelete(id);

    res.json(server);
  } catch (error) {
    throw new Error(error);
  }
};

export { getServers, getServerById, getServersByUserId, postServer, putServer, deleteServer, serverActualization };
