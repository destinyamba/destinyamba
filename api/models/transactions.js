import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  submittedAt: { type: Date },
});

const Transaction = model("Transaction", TransactionSchema);

export { Transaction };
