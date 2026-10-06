import mongoose from "mongoose";

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
    timestamps: true
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;