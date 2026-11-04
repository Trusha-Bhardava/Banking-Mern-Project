import mongoose from "mongoose";

// craete schema which is rules for describing user document
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true,'Full name is required'],
      minlength: [10, 'Full name must be at least 10 characters long'],
      maxlength: [50, 'Full name cannot exceed 50 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email address is required'], 
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    }
  },
  {
    timestamps: true
  }
);
// Create a Mongoose User model using userSchema. way for our application to work with User documents
const User = mongoose.model("User", userSchema);

export default User;