import {
  Stack,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";

const AddAmountForm = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>();
  function addNewTransaction(ev: any) {
    ev.preventDefault();
    const url = import.meta.env.VITE_REACT_APP_REACT_API_URL + "transaction";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        description,
        amount,
      }),
    }).then((response) => {
      response.json().then((json) => {
        console.log("result", json);
      });
    });
  }

  return (
    <form onSubmit={addNewTransaction}>
      <Stack spacing={3} mb={3}>
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            labelId="category"
            id="category"
            fullWidth
            required
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            id="description"
            label="Description"
            fullWidth
            required
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            value={amount || ""}
            onChange={(event) => setAmount(Number(event.target.value))}
            id="amount"
            startAdornment={
              <InputAdornment position="start">&#8358;</InputAdornment>
            }
            label="Amount"
            type="number"
            fullWidth
            required
          />
        </FormControl>
        <Button variant="contained" type="submit" startIcon={<Plus />}>
          Add Amount
        </Button>
      </Stack>
    </form>
  );
};

export default AddAmountForm;
