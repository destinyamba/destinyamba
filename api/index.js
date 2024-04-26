import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Transaction } from "./models/transactions.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();

app.use(cors());
app.use(express.json());

// Function to connect to MongoDB
async function connectToDatabase() {
  await mongoose.connect(process.env.MONGO_URL);
}

// Function to handle errors
function handleError(res, error) {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
}

// Endpoint to get all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    handleError(res, error);
  }
});

// Endpoint to create a new transaction
app.post("/api/transaction", async (req, res) => {
  const { category, description, amount } = req.body;
  try {
    await connectToDatabase();
    const submittedAt = new Date();
    const transaction = { category, description, amount, submittedAt };
    const transactionResponse = await Transaction.create(transaction);
    res.json(transactionResponse);
  } catch (error) {
    handleError(res, error);
  }
});

// Endpoint to get all the income transactions
app.get("/api/income", async (req, res) => {
  try {
    await connectToDatabase();
    const income = await Transaction.find({ category: "income" });
    res.json(income);
  } catch (error) {
    handleError(res, error);
  }
});

// Endpoint to get all the expense transactions
app.get("/api/expenses", async (req, res) => {
  try {
    await connectToDatabase();
    const expenses = await Transaction.find({ category: "expense" });
    res.json(expenses);
  } catch (error) {
    handleError(res, error);
  }
});

// Function to get transactions by category and month
async function getTransactionsByCategoryAndMonth(req, res, category) {
  try {
    await connectToDatabase();
    const { month } = req.params;
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: "Invalid month" });
    }
    const startDate = new Date(new Date().getFullYear(), monthNumber - 1, 1);
    const endDate = new Date(new Date().getFullYear(), monthNumber, 0);
    const transactions = await Transaction.find({
      category,
      submittedAt: { $gte: startDate, $lte: endDate },
    });
    res.json(transactions);
  } catch (error) {
    handleError(res, error);
  }
}

// Endpoint to get all expenses for a specific month
app.get("/api/expenses/:month", async (req, res) => {
  await getTransactionsByCategoryAndMonth(req, res, "expense");
});

// Endpoint to get all income for a specific month
app.get("/api/income/:month", async (req, res) => {
  await getTransactionsByCategoryAndMonth(req, res, "income");
});

app.listen(4040);
