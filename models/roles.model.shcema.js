import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    
    role:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

RoleSchema.methods.toJSON = function () {
    const {__v, _id, ...role} = this.toObject();
    return role;
};

const roleModel = mongoose.model('Roles', RoleSchema);

export default roleModel;