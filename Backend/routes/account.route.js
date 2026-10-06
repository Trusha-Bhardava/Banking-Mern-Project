import express from "express";

import {
  createAccount,
  getAccount,
  depositMoney,
  withdrawMoney,
  transferMoney,
  getTransactions,
  getBalance,
  getAccountDetails,
  closeAccount
} from "../controllers/account.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


// Create bank account
router.post("/create", createAccount);

// get account details
router.get("/details", protect, getAccountDetails);

// Get account
router.get("/:userId", getAccount);

// Deposit
router.post("/deposit", depositMoney);

// Withdraw
router.post("/withdraw", withdrawMoney);

// Transfer
router.post("/transfer", transferMoney);

// Transactions
router.get("/transactions/:userId", getTransactions);

// get balance
router.get("/balance/:userId", protect, getBalance);

// close account
router.delete("/close/:userId", closeAccount);

export default router;