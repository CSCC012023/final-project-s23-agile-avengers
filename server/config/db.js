import * as mongoose from "mongoose";

// const db = process.env.MONGO_URI;

const db = "mongodb+srv://shashwat444:abcd1234@todo-cluster.kaifbpc.mongodb.net/"

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;