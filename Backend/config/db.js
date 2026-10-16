// Mongoose is a library that helps Node.js communicate with MongoDB.
import mongoose from "mongoose";

// create connection function with async 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  
  } catch (error) {
    console.log("MongoDB connection failed", error);
    // human readable message shows
        console.log(error.message);
   
  }
};

export default connectDB;