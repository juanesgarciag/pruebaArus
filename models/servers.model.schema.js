import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ServerSchema = mongoose.Schema({

    serverName:{
        type: String,
        require: [true, "Debe indicar el nombre del servicio"]
    },
    serverCapacity:{
        type: Number,
        require: [true, "Debe indicar la capacidad del servicio"]
    },
    serverOverloadAlert: {
        type: Number,
        require: [true, "Debe indicar cuando alertar para aumento de servidores"]
    },
    userAssociated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

ServerSchema.methods.toJSON = function () {
    const {__v, _id, ...server} = this.toObject();

    return server;
}

ServerSchema.plugin(mongoosePaginate);

const serverModel = mongoose.model("Server", ServerSchema);

export default serverModel;