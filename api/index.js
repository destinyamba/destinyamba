import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json("ok response");
});

app.post("/api/expenses", (req, res) => {
  res.json(req.body);
});

app.put("/api/expenses/:id", (req, res) => {
  // Extract the expense ID from the request parameters
  const { id } = req.params;

  // Extract the updated expense data from the request body
  const { amount, description, category } = req.body;

  // Retrieve the existing expense from a database or other data source
  const existingExpense = getExpenseById(id);

  // Update the existing expense with the new data
  const updatedExpense = {
    ...existingExpense,
    amount,
    description,
    category,
    updatedAt: new Date(),
  };

  // Save the updated expense to the database or other data source
  saveExpense(updatedExpense);

  // Send a response to the client
  res.json(updatedExpense);
});

app.listen(4040);
