import mongoose from "mongoose";

const connect = async (req, res) => {
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}tataclip`)
}

export default connect;