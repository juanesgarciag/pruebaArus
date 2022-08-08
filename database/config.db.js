import mongoose from "mongoose";

const dbConection = async () => {
try {
    await mongoose.connect(process.env.MONGO_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Conectado a la DB");
    } catch (err) {
        console.log(err);
        throw new Error("Error a la hora de realizar la conexión con la DB");
    }
};

export { dbConection };
