import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// async because we perform database and bcrypt operations that return Promises
export const registerUser = async (req, res) => {
  try {
    // get registration data in req.body in (object destructing)
    const { fullName, email, phone, password } = req.body;

    // It takes the original password and creates a secure hash.
    // 10 controls the computational cost used by bcrypt when generating the password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // This connects directly to the model
    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword
    });

    // This is where the document actually gets saved to MongoDB.
    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Check required fields
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check new password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

   //  Fetches the user from the database using their ID.
   // This is required to verify the user exists, check their old password, and update it.
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Current password is incorrect"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });

  } catch (error) {
    console.log("Change password error:", error);

    res.status(500).json({
      message: "Unable to change password",
      error: error.message
    });
  }
};