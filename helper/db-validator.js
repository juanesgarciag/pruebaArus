
import Role from "../models/roles.model.shcema.js"
import User from "../models/user.model.schema.js"

//Valida que los roles en esten autorizados en DB
const isValidRole = async (role = "") => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
};

//Validar si el correo ya existe en DB
const isValidEmail = async (email = "") => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo ${email} ya se encuentra registrado.`);
    }
};

//Valida si el ID de mongo esta en DB
const isValidUserId = async (id = "") => {
    const existId = await User.findById(id).exec();
    if (!existId) {
        throw new Error(`El id ${id}, no existe`);
    }
};



export {isValidRole, isValidEmail};