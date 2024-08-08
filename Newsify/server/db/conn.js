import mongoose from "mongoose";

export const connDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backend",
    }).then(() => {
        console.log("DB connected");
    }).catch((e) => {
        console.log(e);
    })
}

export default  connDB