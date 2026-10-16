
// Local ISPs often fail to resolve MongoDB's complex +srv connection strings.
// By importing 'dns' and setting Google (8.8.8.8) and Cloudflare (1.1.1.1) as servers,
// we bypass the local network to guarantee a successful database connection.
import dns from 'dns'; 
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/db.js";
import accountRoutes from "./routes/account.route.js";
import contactRoutes from "./routes/contact.route.js";

// Read my .env file and make those variables available through process.env.
dotenv.config();

import resumeRoutes from "./routes/resume.route.js";

const app = express();

// send HTTP requests to this backend server without being blocked by the browser.
app.use(cors());

//  allows to parse middleware for understand json
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("SecureBank Backend is running");
});

app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);

// process.env.PORT try to get port number 
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});