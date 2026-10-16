import mongoose from "mongoose";

// craete schema which is rules for describing user document
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create a Mongoose User model using userSchema. way for our application to work with User documents
const User = mongoose.model("User", userSchema);

export default User;