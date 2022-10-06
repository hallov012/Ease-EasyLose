import classes from "./WeightGraph.module.css"

import ReactApexChart from "react-apexcharts"
import dateFormat, { masks } from "dateformat"

function WeightGraph({ weightData }) {
  const dataset = { weight: [], date: [] }
  for (const log of weightData) {
    dataset.weight.push(log.weight)
    dataset.date.push(dateFormat(log.date, "mm/dd"))
  }

  const data = {
    series: [
      {
        name: "몸무게(kg)",
        data: dataset.weight,
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
          colors: ["#242f9b"],
        },
        background: {
          borderRadius: 10,
          borderColor: "#242f9b",
        },
      },
      stroke: {
        curve: "straight",
        colors: ["#242f9b"],
        width: 3,
      },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: dataset.date,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "kg"
          },
        },
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
