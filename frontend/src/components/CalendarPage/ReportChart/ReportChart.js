import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import classes from "./ReportChart.module.css";

function ReportChart({ detailData, testList }) {
  const colorset = ["#25316D", "#7c83fd", "#b1e1ff", "#A084CA", "#FFCACA"];
  const [consumedata, setConsume] = useState([0, 0, 0, 0]);
  const [fooddata, setFood] = useState({
    0: [0, 0, 0, 0],
    1: [0, 0, 0, 0],
    2: [0, 0, 0, 0],
    3: [0, 0, 0, 0],
  });

  useEffect(() => {
    if (detailData) {
      const temp = [];
      temp.push(
        Math.round((detailData.totalCalorie / detailData.dailyCalorie) * 100)
      );
      temp.push(
        Math.round((detailData.totalCarb / detailData.dailyCarb) * 100)
      );
      temp.push(
        Math.round((detailData.totalProtein / detailData.dailyProtein) * 100)
      );
      temp.push(Math.round((detailData.totalFat / detailData.dailyFat) * 100));
      setConsume(temp);
    }
  }, [detailData]);

  useEffect(() => {
    const temp = {
      0: [0, 0, 0, 0],
      1: [0, 0, 0, 0],
      2: [0, 0, 0, 0],
      3: [0, 0, 0, 0],
    };
    for (var i = 0; i < 4; i++) {
      if (Object.keys(testList).includes(String(i))) {
        const food = testList[i];
        temp[i][0] = Math.round((food.calorie / detailData.dailyCalorie) * 100);
        temp[i][1] = Math.round((food.carb / detailData.dailyCarb) * 100);
        temp[i][2] = Math.round((food.protein / detailData.dailyProtein) * 100);
        temp[i][3] = Math.round((food.fat / detailData.dailyFat) * 100);
      }
    }
    setFood(temp);
  }, [testList]);

  const data = {
    series: [
      {
        name: "섭취량",
        data: consumedata,
      },
      {
        name: "PRODUCT B",
        data: fooddata[0],
      },
      {
        name: "PRODUCT C",
        data: fooddata[1],
      },
      {
        name: "PRODUCT D",
        data: fooddata[2],
      },
      {
        name: "PRODUCT E",
        data: fooddata[3],
      },
    ],
    options: {
      colors: colorset,
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
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: "50%",
        },
      },
      xaxis: {
        type: "string",
        categories: ["칼로리", "탄수화물", "단백질", "지방"],
      },
      legend: {
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
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return val + "%";
        },
      },
    },
  };
  return (
    <div>
      <div style={{ width: "100%", height: "28vh" }}>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height="100%"
        />
      </div>
      <div className={classes.legend_box}>
        <div className={classes.legend_item}>
          <div
            className={classes.legend_color}
            style={{ background: `${colorset[0]}` }}
          ></div>
          <div>섭취량</div>
        </div>
        {Object.keys(testList).includes(String(0)) ? (
          <div className={classes.legend_item}>
            <div
              className={classes.legend_color}
              style={{ background: `${colorset[1]}` }}
            ></div>
            <div>{testList[0].name}</div>
          </div>
        ) : null}
        {Object.keys(testList).includes(String(1)) ? (
          <div className={classes.legend_item}>
            <div
              className={classes.legend_color}
              style={{ background: `${colorset[2]}` }}
            ></div>
            <div>{testList[1].name}</div>
          </div>
        ) : null}
        {Object.keys(testList).includes(String(2)) ? (
          <div className={classes.legend_item}>
            <div
              className={classes.legend_color}
              style={{ background: `${colorset[3]}` }}
            ></div>
            <div>{testList[2].name}</div>
          </div>
        ) : null}
        {Object.keys(testList).includes(String(3)) ? (
          <div className={classes.legend_item}>
            <div
              className={classes.legend_color}
              style={{ background: `${colorset[4]}` }}
            ></div>
            <div>{testList[3].name}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default ReportChart;
