import { BarChart } from "@mui/x-charts/BarChart";
import { months } from "../../utils/dates";
import { Stack } from "@mui/material";

const Chart = () => {
  return (
    <Stack>
      <BarChart
        xAxis={[
          {
            id: "months",
            data: months,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 32, 5, 32, 5, 32, 5, 32, 5, 32, 5],
          },
        ]}
        width={380}
        height={300}
      />
    </Stack>
  );
};

export default Chart;
