import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = mongoose.Schema({
  // _id: String,
  userName: {
    type: String,
    require: [true, "El nombre de usuario es obligatorio"],
  },
  password: {
    type: String,
    require: [true, "Debe ingresar una contraseña"],
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Roles"
    // enum: ['ADMIN', 'OPERADOR', 'CONSULTOR'],
  },
  userData:
    {
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      email: {
          type: String,
          require: [true, "El email es obligatorio"],
          unique: true,
      },
    },
  servers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server"
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, isActive, ...user } = this.toObject();
  // user.uid = _id;
  return user;
};

UserSchema.plugin(mongoosePaginate);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
