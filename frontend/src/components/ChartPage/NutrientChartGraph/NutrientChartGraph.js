import classes from "./NutrientChartGraph.module.css";
import { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";

function NutrientChartGraph({ nutData }) {
  const [value, setValue] = useState({
    extra: Array.from({ length: 7 }, () => 0),
    carb: Array.from({ length: 7 }, () => 0),
    protein: Array.from({ length: 7 }, () => 0),
    fat: Array.from({ length: 7 }, () => 0),
    date: Array.from({ length: 7 }, () => 0),
  });

  useEffect(() => {
    if (nutData) {
      const dataset = { extra: [], carb: [], protein: [], fat: [], date: [] };
      for (const i in nutData) {
        const daily = nutData[i];
        const extraValue =
          daily.calorie - daily.carb * 4 - daily.protein * 4 - daily.fat * 8;
        dataset.extra.push(extraValue);
        dataset.carb.push(daily.carb * 4);
        dataset.protein.push(daily.protein * 4);
        dataset.fat.push(daily.fat * 8);
        dataset.date.push(daily.date.substr(5).replace("-", "/"));
      }
      setValue(dataset);
    }
  }, [nutData]);

  const data = {
    series: [
      {
        name: "그 외",
        data: value.extra,
      },
      {
        name: "탄수화물",
        data: value.carb,
      },
      {
        name: "단백질",
        data: value.protein,
      },
      {
        name: "지방",
        data: value.fat,
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
        categories: value.date,
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
