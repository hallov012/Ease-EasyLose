import classes from "./NutrientProgressGraph.module.css";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

function NutrientProgressGraph(props) {
  const colorSet = props.colorSet;
  const userInfo = props.userInfo;
  const dietSum = props.dietSum;
  const [value, setValue] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (userInfo && dietSum) {
      const temp = [0, 0, 0, 0];
      temp[0] = Math.ceil((dietSum.calorie / userInfo.dailyCalorie) * 100);
      temp[1] = Math.ceil((dietSum.carb / userInfo.dailyCarb) * 100);
      temp[2] = Math.ceil((dietSum.protein / userInfo.dailyProtein) * 100);
      temp[3] = Math.ceil((dietSum.fat / userInfo.dailyFat) * 100);
      setValue(temp);
    }
  }, [userInfo, dietSum]);

  const data = {
    series: [
      {
        name: "목표치",
        data: [100, 100, 100, 100],
      },
      {
        name: "현재",
        data: value,
      },
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "top",
          },
        },
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: [`${colorSet.proteinColor}`, `${colorSet.carbColor}`],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["열량", "탄수화물", "단백질", "지방"],
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  };
  return (
    <div className={classes.chart_box}>
      <div className={classes.top_area}>
        <span>목표 달성률</span>
        <div className={classes.chart_info}>
          <div className={classes.info_item}>
            <div style={{ background: "var(--main-color)" }}></div>
            <p>목표치</p>
          </div>
          <div className={classes.info_item}>
            <div style={{ background: "var(--sub-color)" }}></div>
            <p>현재</p>
          </div>
        </div>
      </div>
      <div>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
        />
      </div>
    </div>
  );
}
export default NutrientProgressGraph;
