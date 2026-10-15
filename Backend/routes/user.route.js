import express from "express";
import { registerUser, loginUser, changePassword } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

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