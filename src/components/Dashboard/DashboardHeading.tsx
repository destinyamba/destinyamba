import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { currentMonth, months } from "../../utils/dates";
import { blue } from "@mui/material/colors";

const DashboardHeading = () => {
  const [expenseOrIncome, setExpenseOrIncome] = useState<string>("expense");

  const handleToggleChange = (
    event: MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      setExpenseOrIncome(newValue);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" color={"black"}>
          Expense Tracker
        </Typography>
      </Box>
      <Divider sx={{ mb: 4, borderWidth: 1, borderColor: "black" }} />

      <Stack display="flex" direction="row" justifyContent="space-between">
        <Box>
          <ToggleButtonGroup
            value={expenseOrIncome}
            exclusive={true}
            onChange={handleToggleChange}
            aria-label="category"
          >
            <ToggleButton
              value="expense"
              aria-label="expense"
              sx={{
                "&.Mui-selected": {
                  bgcolor: blue[300],
                },
                "&.Mui-selected:hover": {
                  bgcolor: blue[200],
                },
              }}
            >
              <Typography>Expense</Typography>
            </ToggleButton>
            <ToggleButton
              value="income"
              aria-label="income"
              sx={{
                "&.Mui-selected": {
                  bgcolor: blue[300],
                },
                "&.Mui-selected:hover": {
                  bgcolor: blue[200],
                },
              }}
            >
              <Typography>Income</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <FormControl fullWidth>
            <InputLabel id="month">Month</InputLabel>
            <Select
              id="month-select"
              value={selectedMonth}
              label="Month"
              onChange={handleMonthChange}
              fullWidth
              sx={{ width: 120, height: 48 }}
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};

export default DashboardHeading;
