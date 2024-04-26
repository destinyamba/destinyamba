import { Box, Button, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dates";

interface Transaction {
  _id: string;
  category: string;
  description: string;
  amount: number;
  submittedAt: string;
}

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getAlltransactions().then((data) => {
      setTransactions(data.reverse());
    });
  }, []);

  async function getAlltransactions() {
    const url = import.meta.env.VITE_REACT_APP_REACT_API_URL + "transactions";
    const response = await fetch(url);
    return await response.json();
  }

  const [sliceNumber, setSliceNumber] = useState<number>(5);

  function handleSeeMore() {
    setSliceNumber(sliceNumber + 5);
  }

  return (
    <Stack>
      {transactions.slice(0, sliceNumber).map((transaction) => (
        <Stack
          bgcolor={blue[600]}
          color="white"
          mb={3}
          display="flex"
          direction="row"
          justifyContent="space-between"
          p={1.5}
          alignItems="center"
          borderRadius={1}
          key={transaction._id}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography textTransform="capitalize">
              {transaction?.category}
            </Typography>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "200px",
              }}
            >
              {transaction?.description}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography>&#8358; {transaction?.amount}</Typography>
            <Typography>{formatDate(transaction?.submittedAt)}</Typography>
          </Box>
        </Stack>
      ))}
      {sliceNumber < transactions.length && (
        <Button onClick={handleSeeMore}>See More</Button>
      )}
    </Stack>
  );
};

export default RecentTransactions;
