import classes from "./NutrientChart.module.css"
import ReactApexChart from "react-apexcharts"

function NutrientChart() {
  const data = {
    series: [30, 50, 20],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["탄수화물", "단백질", "지방"],
      colors: ["#afb4ff", "#7c83fd", "#b1e1ff"],
      legend: {
        show: true,
        customLegendItems: ["탄수화물", "단백질", "지방"],
        markers: {
          fillColors: ["#afb4ff", "#7c83fd", "#b1e1ff"],
          width: 18,
          height: 18,
          radius: 12,
          offsetX: -5,
        },
        fontSize: "16px",
        offsetX: -20,
        offsetY: 20,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
          },
        },
      ],
    },
  }
  return (
    <div className={classes.chart_box}>
      <span>섭취 영양소 비율</span>
      <div>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="donut"
        />
      </div>
    </div>
  )
}
export default NutrientChart
