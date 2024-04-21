import "./App.css";
import Chart from "./components/Charts/Chart";
import DashboardHeading from "./components/Dashboard/DashboardHeading";
import { Stack } from "@mui/material";
import AddAmountForm from "./components/Form/AddAmountForm";
import { useEffect } from "react";

function App() {
  return (
    <Stack>
      <DashboardHeading />
      <Chart />
      <AddAmountForm />
    </Stack>
  );
}

export default App;
