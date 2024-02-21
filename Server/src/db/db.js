import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connInst = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Connected!! \nDB Host : ${connInst.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection ERROR!!");
    process.exit(1);
  }
};

export default connectDB;
