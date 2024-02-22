import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI, ":MONGODB_URI");
    const connInst = await mongoose.connect(
      // process.env.MONGODB_URI
      // "mongodb+srv://sahilraja:Cf6iMhfY5YG4TozK@agricocluster.7ealjjl.mongodb.net/?retryWrites=true&w=majority&appName=AgricoCluster"
      // `${process.env.MONGODB_URI}`
      // `${process.env.MONGODB_URI}/${DB_NAME}`
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\nMongoDB Connected!! \nDB Host : ${connInst.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection ERROR!!", error);
    process.exit(1);
  }
};

export default connectDB;
