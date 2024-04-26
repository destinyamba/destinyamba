import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Transaction } from "./models/transactions.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/transactions", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const transactions = await Transaction.find();

    res.json(transactions);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/transaction", async (req, res) => {
  const { category, description, amount } = req.body;

  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URL);

    // Add a submittedAt date to the transaction
    const submittedAt = new Date();

    // Create the transaction object
    const transaction = {
      category,
      description,
      amount,
      submittedAt,
    };

    // Create the transaction in the database
    const transactionResponse = await Transaction.create(transaction);

    // Send the response with the created transaction
    res.json(transactionResponse);
  } catch (error) {
    // Handle errors
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4040);
