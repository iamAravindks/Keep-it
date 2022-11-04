import mongoose from "mongoose";
import config from "../config.js";
import colors from 'colors'

const connectDB = async () => {
  try {
    const con = await mongoose.connect(config.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected : ${con.connection.host}`.blue.underline);
  } catch (error) {
    console.log();
    console.log(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDB;
