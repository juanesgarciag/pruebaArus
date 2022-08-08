import {request, response} from 'express';


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

    return (req, res = response, next) =>{

        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere validar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.user.role.role)){
            return res.status(401).json({
                msg: 'Usuario sin permisos - Acceso denegado'
            })
        }


        next();
    }

}

export {isAdminRole, hasRole};