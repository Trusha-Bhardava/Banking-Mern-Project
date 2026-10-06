import Account from "../models/account.model.js";
import User from "../models/user.model.js";

// Create account
export const createAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    const existingAccount = await Account.findOne({ userId });

    if (existingAccount) {
      return res.status(400).json({
        message: "Account already exists"
      });
    }

    const accountNumber =
      "SB" + Math.floor(10000000 + Math.random() * 90000000);

    const account = new Account({
      userId,
      accountNumber,
      balance: 0
    });

    await account.save();

    res.status(201).json({
      message: "Bank account created successfully",
      account
    });

  } catch (error) {
    console.log("Create account error:", error);

    res.status(500).json({
      message: "Unable to create account",
      error: error.message
    });
  }
};


// Get account
export const getAccount = async (req, res) => {
  try {
    const { userId } = req.params;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Bank account not found"
      });
    }

    const user = await User.findById(userId);

    res.status(200).json({
      account: {
        id: account._id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        user: {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone
        }
      }
    });

  } catch (error) {
    console.log("Get account error:", error);

    res.status(500).json({
      message: "Unable to get account",
      error: error.message
    });
  }
};


// Deposit money
export const depositMoney = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Enter a valid amount"
      });
    }

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Bank account not found"
      });
    }

    account.balance += Number(amount);

    account.transactions.unshift({
      type: "deposit",
      amount: Number(amount),
      description: "Money deposited"
    });

    await account.save();

    res.status(200).json({
      message: "Money deposited successfully",
      balance: account.balance
    });

  } catch (error) {
    console.log("Deposit error:", error);

    res.status(500).json({
      message: "Deposit failed",
      error: error.message
    });
  }
};


// Withdraw money
export const withdrawMoney = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Enter a valid amount"
      });
    }

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Bank account not found"
      });
    }

    if (account.balance < Number(amount)) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    account.balance -= Number(amount);

    account.transactions.unshift({
      type: "withdraw",
      amount: Number(amount),
      description: "Money withdrawn"
    });

    await account.save();

    res.status(200).json({
      message: "Money withdrawn successfully",
      balance: account.balance
    });

  } catch (error) {
    console.log("Withdraw error:", error);

    res.status(500).json({
      message: "Withdraw failed",
      error: error.message
    });
  }
};


// Get transactions
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Bank account not found"
      });
    }

    res.status(200).json({
      transactions: account.transactions
    });

  } catch (error) {
    console.log("Transaction error:", error);

    res.status(500).json({
      message: "Unable to get transactions",
      error: error.message
    });
  }
};

// Transfer money
export const transferMoney = async (req, res) => {
  try {
    const { userId, receiverAccountNumber, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Enter a valid amount"
      });
    }

    const senderAccount = await Account.findOne({ userId });

    if (!senderAccount) {
      return res.status(404).json({
        message: "Sender account not found"
      });
    }

    if (senderAccount.balance < Number(amount)) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    const receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber
    });

    if (!receiverAccount) {
      return res.status(404).json({
        message: "Receiver account not found"
      });
    }

    if (
      senderAccount.accountNumber === receiverAccount.accountNumber
    ) {
      return res.status(400).json({
        message: "You cannot transfer money to yourself"
      });
    }

    // Remove money from sender
    senderAccount.balance -= Number(amount);

    senderAccount.transactions.unshift({
      type: "transfer",
      amount: Number(amount),
      description: `Transfer to ${receiverAccountNumber}`
    });

    // Add money to receiver
    receiverAccount.balance += Number(amount);

    receiverAccount.transactions.unshift({
      type: "deposit",
      amount: Number(amount),
      description: `Received from ${senderAccount.accountNumber}`
    });

    await senderAccount.save();
    await receiverAccount.save();

    res.status(200).json({
      message: "Money transferred successfully",
      balance: senderAccount.balance
    });

  } catch (error) {
    console.log("Transfer error:", error);

    res.status(500).json({
      message: "Transfer failed",
      error: error.message
    });
  }
};

// get balance
export const getBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    res.status(200).json({
      accountNumber: account.accountNumber,
      balance: account.balance
    });

  } catch (error) {
    console.log("Get balance error:", error);

    res.status(500).json({
      message: "Unable to get balance",
      error: error.message
    });
  }
};

// get account details
export const getAccountDetails = async (req, res) => {
  try {

    const userId = req.user.userId;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    res.status(200).json({
      message: "Account details fetched successfully",
      account: {
        userId: account.userId,
        accountNumber: account.accountNumber,
        balance: account.balance,
        createdAt: account.createdAt,
        transactionCount: account.transactions.length
      }
    });

  } catch (error) {

    console.log("Account details error:", error);

    res.status(500).json({
      message: "Failed to fetch account details",
      error: error.message
    });

  }
};

// delete account
export const closeAccount = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find account
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    // Account must have zero balance
    if (account.balance > 0) {
      return res.status(400).json({
        message: "Cannot close account while balance is greater than zero"
      });
    }

    // Delete account
    await Account.findByIdAndDelete(account._id);

    res.status(200).json({
      message: "Bank account closed successfully"
    });

  } catch (error) {
    console.log("Close account error:", error);

    res.status(500).json({
      message: "Unable to close account",
      error: error.message
    });
  }
};



