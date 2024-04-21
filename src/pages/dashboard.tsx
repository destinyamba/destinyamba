import { Grid } from "@mui/material";
import DashboardHeading from "../components/Dashboard/DashboardHeading";
import Chart from "../components/Charts/Chart";

const dashboard = () => {
  return (
    <Grid container item xs>
      <DashboardHeading />
      <Chart />
    </Grid>
  );
};

export default dashboard;
