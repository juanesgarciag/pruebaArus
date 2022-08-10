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
    },serverActuall: {
        type: Number,
        default: 0,
    },
    serverIp: {
        type: String,
        default: "0.0.0.0",
    },
    serverOverloadAlert: {
        type: Number,
        require: [true, "Debe indicar cuando alertar para aumento de servidores"]
    },
    userAssociated: {
        type: String,
        // ref: "User"
    }
});

ServerSchema.methods.toJSON = function () {
    const {__v, ...server} = this.toObject();

    return server;
}

ServerSchema.plugin(mongoosePaginate);

const serverModel = mongoose.model("Server", ServerSchema);

export default serverModel;