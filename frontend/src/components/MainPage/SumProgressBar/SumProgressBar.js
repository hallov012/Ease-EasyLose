import classes from "./SumProgressBar.module.css";
import { useState, useEffect } from "react";
import * as React from "react";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SumProgressBar(props) {
  const userDailyDiet = props.userDailyDiet;
  const [value, setValue] = useState({
    percent: [33, 33, 33],
    amount: [0, 0, 0],
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: `${props.colorSet.carbColor}`,
      },
      secondary: {
        main: `${props.colorSet.proteinColor}`,
        // contrastText: '#fff',
      },
      error: {
        main: `${props.colorSet.fatColor}`,
      },
    },
  });

  useEffect(() => {
    if (userDailyDiet) {
      if (userDailyDiet[0].total.calorie) {
        const temp = { percent: [0, 0, 0], amount: [0, 0, 0] };
        temp.amount[0] = userDailyDiet[0].total.carb;
        temp.amount[1] = userDailyDiet[0].total.protein;
        temp.amount[2] = userDailyDiet[0].total.fat;
        const total = temp.amount[0] + temp.amount[1] + temp.amount[2];
        temp.percent[0] = Math.ceil((temp.amount[0] / total) * 100);
        temp.percent[1] = Math.ceil((temp.amount[1] / total) * 100);
        temp.percent[2] = Math.ceil((temp.amount[2] / total) * 100);
        setValue(temp);
      } else {
        setValue({
          percent: [0, 0, 0],
          amount: [0, 0, 0],
        });
      }
    }
  }, [userDailyDiet]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className={classes.info_box}>
          <div className={classes.info_item}>
            <Chip label="탄수화물" color="primary" size="small" />
            <span className={classes.nut_span}>
              {Math.round(value.amount[0])}g
            </span>
          </div>
          <div className={classes.info_item}>
            <Chip label="단백질" color="secondary" size="small" />
            <span className={classes.nut_span}>
              {Math.round(value.amount[1])}g
            </span>
          </div>
          <div className={classes.info_item}>
            <Chip label="지방" color="error" size="small" />
            <span className={classes.nut_span}>
              {Math.round(value.amount[2])}g
            </span>
          </div>
        </div>
      </ThemeProvider>
      <div className={classes.sum_progress}>
        <div
          className={classes.first_line}
          style={{ width: value.percent[0] + "%" }}
        >
          {value.percent[0]}%
        </div>
        <div
          className={classes.second_line}
          style={{ width: value.percent[1] + "%" }}
        >
          {value.percent[1]}%
        </div>
        <div
          className={classes.third_line}
          style={{ width: value.percent[2] + "%" }}
        >
          {value.percent[2]}%
        </div>
      </div>
    </div>
  );
}
export default SumProgressBar;
