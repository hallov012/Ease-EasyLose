import classes from "./NutrientChartGraph.module.css";

import ReactApexChart from "react-apexcharts";

function NutrientChartGraph({ nutData }) {
  const dataset = { extra: [], carb: [], protein: [], fat: [], date: [] };
  for (const daily of nutData) {
    const extraValue =
      daily.dailyCalorie -
      daily.dailyCarb * 4 -
      daily.dailyProtein * 4 -
      daily.dailyFat * 8;
    dataset.extra.push(extraValue);
    dataset.carb.push(daily.dailyCarb * 4);
    dataset.protein.push(daily.dailyProtein * 4);
    dataset.fat.push(daily.dailyFat * 8);
    dataset.date.push(daily.date.substr(5).replace("-", "/"));
  }

  const data = {
    series: [
      {
        name: "그 외",
        data: dataset.extra,
      },
      {
        name: "탄수화물",
        data: dataset.carb,
      },
      {
        name: "단백질",
        data: dataset.protein,
      },
      {
        name: "지방",
        data: dataset.fat,
      },
    ],
    options: {
      colors: ["#cecece", "#afb4ff", "#7c83fd", "#b1e1ff"],
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
          columnWidth: "60%",
        },
      },
      xaxis: {
        type: "category",
        categories: dataset.date,
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "kcal";
          },
        },
      },
    },
  };
  return (
    <div className={classes.graph_box}>
      <div className={classes.top_area}>
        <div className={classes.text}>섭취량(kcal) 변화</div>
      </div>

      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={"100%"}
      />
      <div
        className={classes.item_box}
        style={{ marginTop: "1vh", marginLeft: "3vw" }}
      >
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
        <div className={classes.info_item}>
          <div style={{ background: "#cecece" }}></div>
          <span>그 외</span>
        </div>
      </div>
    </div>
  );
}
export default NutrientChartGraph;
