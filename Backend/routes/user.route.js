import express from "express";
import { registerUser, loginUser, changePassword } from "../controllers/user.controller.js";
// Imports middleware that verifies a JWT token.
import { protect } from "../middleware/auth.middleware.js";

// router allows us to create a group of related URLs.
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change-password", changePassword);

router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.user.userId
  });
});


export default router;