import classes from "./NutrientProgressBox.module.css"
import ReactApexChart from "react-apexcharts"

function NutrientProgressBox() {
  const plan = [1520, 160, 280, 100, 32, 2700, 300]
  const now = [1100, 130, 320, 80, 16, 2400, 200]
  const title = [
    "열량 (kcal)",
    "탄수화물 (g)",
    "단백질 (g)",
    "지방 (g)",
    "당 (g)",
    "나트륨 (mg)",
    "콜레스트롤 (mg)",
  ]
  const dataSet = plan.map((value, idx) => {
    return {
      x: title[idx],
      y: Math.ceil((now[idx] / value) * 100),
      goals: [
        {
          name: "목표",
          value: 100,
          strokeWidth: 6,
          strokeHeight: 0,
          strokeLineCap: "round",
          strokeColor: "#00033f",
        },
      ],
    }
  })

  const data = {
    series: [
      {
        name: "현재",
        data: dataSet,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
        offsetX: -10,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ["#7c83fd"],
      dataLabels: {
        formatter: function (val, opt) {
          return `${now[opt.dataPointIndex]} / ${plan[opt.dataPointIndex]}`
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          align: "left",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  return (
    <div className={`${classes.nutrient_box} box_shadow`}>
      <div className={classes.top_area}>
        <span>영양비율</span>
        <div className={classes.chart_info}>
          <div className={classes.info_item}>
            <div style={{ background: "var(--text-color)" }}></div>
            <p>목표치</p>
          </div>
          <div className={classes.info_item}>
            <div style={{ background: "var(--main-color)" }}></div>
            <p>현재</p>
          </div>
        </div>
      </div>
      <div className={classes.chart_box}>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={250}
        />
      </div>
    </div>
  )
}
export default NutrientProgressBox
