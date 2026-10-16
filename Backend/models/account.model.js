import mongoose from "mongoose";

// It defines what details to store every time money is deposited, withdrawn, or transferred.
const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer"],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    }
  }
);

// This schema holds the main bank account details of a user along with their full passbook history.
const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true
    },

    balance: {
      type: Number,
      default: 0
    },

    transactions: [transactionSchema]
  },
  {
    // Automatically creates and manages 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

// Model Creation: Compiles the schema into a live 'Account' model so we can read and write data to MongoDB.
const Account = mongoose.model("Account", accountSchema);

// Allows other controller files to import this Account model and use it.
export default Account;