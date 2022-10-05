import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

function ReportChart({ detailData, testList }) {
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
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
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
          borderRadius: 10,
        },
      },
      xaxis: {
        type: "string",
        categories: ["칼로리", "탄수화물", "단백질", "지방"],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  };
  return (
    <div style={{ marginBottom: "30rem" }}>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={250}
      />
    </div>
  );
}
export default ReportChart;
