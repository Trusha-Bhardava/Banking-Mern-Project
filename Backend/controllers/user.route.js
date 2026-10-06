import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import authMiddleware from "../middleware/auth.middleware.js";
export default router;

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword
    });

    // Save user in MongoDB
    await user.save();

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {

    console.log("Registration error:", error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received");
    console.log("Email:", email);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Login successful
    res.status(200).json({
      message: "Login successful",
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
});



export default router;