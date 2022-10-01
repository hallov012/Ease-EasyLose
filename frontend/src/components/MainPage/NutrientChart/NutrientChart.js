import classes from "./NutrientChart.module.css";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";

function NutrientChart(props) {
  const dietSum = props.dietSum;
  const [value, setValue] = useState({ percent: [0, 0, 0], total: 0 });

  useEffect(() => {
    if (dietSum) {
      const totalSum = dietSum.carb + dietSum.protein + dietSum.fat;
      const temp = [0, 0, 0];
      if (totalSum) {
        temp[0] = Math.ceil((dietSum.carb / totalSum) * 100);
        temp[1] = Math.ceil((dietSum.protein / totalSum) * 100);
        temp[2] = Math.ceil((dietSum.fat / totalSum) * 100);
        setValue({ percent: temp, total: totalSum });
      }
    }
  }, [dietSum]);

  const colorSet = props.colorSet;

  const data = {
    series: value.percent,
    options: {
      chart: {
        type: "donut",
      },
      labels: ["탄수화물", "단백질", "지방"],
      colors: [
        `${colorSet.carbColor}`,
        `${colorSet.proteinColor}`,
        `${colorSet.fatColor}`,
      ],
      legend: {
        show: true,
        customLegendItems: ["탄수화물", "단백질", "지방"],
        markers: {
          fillColors: [
            `${colorSet.carbColor}`,
            `${colorSet.proteinColor}`,
            `${colorSet.fatColor}`,
          ],
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
  };
  return (
    <div className={classes.chart_box}>
      <span>섭취 영양소 비율</span>
      <div
        className={classes.alert}
        style={{ display: value.total ? "none" : "block" }}
      >
        아직 입력된 정보가 없어요!
      </div>
      <div style={{ display: value.total ? "block" : "none" }}>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="donut"
        />
      </div>
    </div>
  );
}
export default NutrientChart;
