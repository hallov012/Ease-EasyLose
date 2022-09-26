import classes from "./WeightGraph.module.css"

import ReactApexChart from "react-apexcharts"

function WeightGraph() {
  const data = {
    series: [
      {
        name: "몸무게(kg)",
        data: [54, 55, 54.5, 54, 53, 53.2, 54],
      },
    ],
    options: {
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        height: 50,
      },

      dataLabels: {
        enabled: true,
        style: {
          colors: ["#7c83fd"],
        },
        background: {
          borderRadius: 10,
          borderColor: "#7c83fd",
        },
      },
      stroke: {
        curve: "straight",
        colors: ["#7c83fd"],
        width: 3,
      },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["9/12", "9/13", "9/14", "9/15", "9/16", "9/17", "9/18"],
      },
    },
  }
  return (
    <div className={classes.graph_box}>
      <div className={classes.text}>몸무게(kg) 변화</div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={"100%"}
      />
    </div>
  )
}
export default WeightGraph
