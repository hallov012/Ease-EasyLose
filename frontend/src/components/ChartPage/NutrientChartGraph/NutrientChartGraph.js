import classes from "./NutrientChartGraph.module.css"

import ReactApexChart from "react-apexcharts"

function NutrientChartGraph() {
  const data = {
    series: [
      {
        name: "탄수화물",
        data: [44, 55, 41, 67, 22, 43, 30],
      },
      {
        name: "단백질",
        data: [13, 23, 20, 8, 13, 27, 28],
      },
      {
        name: "지방",
        data: [11, 17, 15, 15, 21, 14, 10],
      },
    ],
    options: {
      colors: ["#afb4ff", "#7c83fd", "#b1e1ff"],
      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          columnWidth: "80%",
        },
      },
      dataLables: {
        enabled: true,
      },
      xaxis: {
        type: "category",
        categories: ["9/12", "9/13", "9/14", "9/15", "9/16", "9/17", "9/18"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    },
  }
  return (
    <div className={classes.graph_box}>
      <div className={classes.top_area}>
        <div className={classes.text}>섭취량(kcal) 변화</div>
        <div className={classes.item_box}>
          <div className={classes.info_item}>
            <div style={{ background: "var(--main-color)" }}></div>
            <span>탄수화물</span>
          </div>
          <div className={classes.info_item}>
            <div style={{ background: "var(--sub-color)" }}></div>
            <span>단백질</span>
          </div>
          <div className={classes.info_item}>
            <div style={{ background: "var(--light-color)" }}></div>
            <span>지방</span>
          </div>
        </div>
      </div>

      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={"100%"}
      />
    </div>
  )
}
export default NutrientChartGraph
