import { request, response } from "express";
import jwt from 'jsonwebtoken';

import User from "../models/user.model.schema.js"

const validateJWT = async (req = request, res = response, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      msg: "No hay token valido",
    });

  try {
    
    //valida el que el token se valido
    const { uid } = jwt.verify(authorization, process.env.SIGNKEY)

    // Trae el usuario que corresponde al uid del params uid
    const user = await User.findById(uid);

    // validar que existe el usuario
    if(!user){
        return res.status(401).json({
            msg: 'Token no valido - Usuario no valido, sin acceso'
        })
    }

    //Verificar si el usuario esta activo - isActive:true
    if(!user.isActive){
        return res.status(401).json({
            msg: 'Token no valido - Usuario no valido, sin acceso'
        })
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
        msg: 'Token invalido'
    })
  }
};

export { validateJWT };
