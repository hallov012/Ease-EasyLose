import classes from "./NutrientProgressBox.module.css";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

function NutrientProgressBox(props) {
  const colorSet = props.colorSet;
  console.log(colorSet);
  const nutrient = [
    "calorie",
    "carb",
    "protein",
    "fat",
    "sugar",
    "salt",
    "cholesterol",
  ];
  const [NutData, setNutData] = useState({
    plan: Array.from({ length: 7 }, () => 0),
    now: Array.from({ length: 7 }, () => 0),
  });

  useEffect(() => {
    if (props.userInfo && props.dietSum) {
      const temp = {
        plan: [0, 0, 0, 0, 32, 2700, 300],
        now: Array.from({ length: 7 }, () => 0),
      };
      temp.plan[0] = props.userInfo.dailyCalorie;
      temp.plan[1] = props.userInfo.dailyCarb;
      temp.plan[2] = props.userInfo.dailyProtein;
      temp.plan[3] = props.userInfo.dailyFat;

      const now_temp = Array.from({ length: 7 }, () => 0);
      for (var i = 0; i < 7; i++) {
        now_temp[i] = props.dietSum[nutrient[i]];
      }
      temp.now = now_temp;
      setNutData(temp);
    }
  }, [props.userInfo, props.dietSum]);

  const title = [
    "열량 (kcal)",
    "탄수화물 (g)",
    "단백질 (g)",
    "지방 (g)",
    "당 (g)",
    "나트륨 (mg)",
    "콜레스트롤 (mg)",
  ];

  const dataSet = NutData.plan.map((value, idx) => {
    return {
      x: title[idx],
      y: Math.ceil((NutData.now[idx] / value) * 100),
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
    };
  });
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
      colors: [`${colorSet.carbColor}`],
      dataLabels: {
        enabled: false,
        // formatter: function (val, opt) {
        //   return `${NutData.now[opt.dataPointIndex]} / ${
        //     NutData.plan[opt.dataPointIndex]
        //   }`
        // },
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
  };

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
  );
}
export default NutrientProgressBox;
