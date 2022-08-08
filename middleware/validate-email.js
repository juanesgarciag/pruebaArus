import User from "../models/user.model.schema.js";

// No permite actualizar email
const changeEmail = async (req, res, next) => {
    
    const {id} = req.params;
    const {userData} = req.body;

    const user = await User.findById(id);

    if(userData.email !== user.userData.email){
        return res.status(406).send("No puedes modificar el email");
    }

    next();
};

export {changeEmail};

