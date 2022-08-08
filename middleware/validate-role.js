import {request, response} from 'express';
import User from "../models/user.model.schema.js";


const isAdminRole = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token primero'
        })
    }

    const {role} = req.user;

    //Verifica si el el rol es el permitido
    if(role.role !== 'Administrador'){
        return res.status(401).json({
            msg: 'Usuario sin permisos - Acceso denegado'
        })
    }

    next();
}

const hasRole = (...roles) =>{

    return async (req, res = response, next) =>{

        try {
            if(!req.user){
                return res.status(500).json({
                    msg: 'Se quiere validar el role sin validar el token primero'
                });
            };

            const findRole = await User.findById(req.user._id).populate({path: 'role', select: 'role'});
    
            if(!roles.includes(findRole.role.role)){
                return res.status(401).json({
                    msg: 'Usuario sin permisos - Acceso denegado'
                });
            };
    
            next();
            
        } catch (error) {
            throw new Error(error);
        };
    };
};

export {isAdminRole, hasRole};