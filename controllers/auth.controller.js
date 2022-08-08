import { response, request } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.schema.js";
import { generateJWT } from "../helper/generate-jwt.js";

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Valida si el email existe
    const user = await User.findOne( {"userData.email": `${email}`} );

    if (!user) {
      return res.status(400).json({
        msg: "Usuario y/o contraseña no son correctas",
      });
    }

    //validar si el usuario esta activo
    if (!user.isActive) {
      return res.status(400).json({
        msg: "Usuario no existe",
      });
    }

    //Validar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario y/o contraseña no son correctas",
      });
    }

    //Generar el JWT
    const tokenJWT = await generateJWT(user._id);

    res.json({
      user,
      tokenJWT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Se ha presentado un error, comuniquese con el administrador",
    });
  }
};

export { login };
