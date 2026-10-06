import dns from 'dns'; 
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/db.js";
import accountRoutes from "./routes/account.route.js";
import contactRoutes from "./routes/contact.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.send("SecureBank Backend is running");
});

app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});