import { useEffect, useState } from "react";
import classes from "./GoalPicker.module.css";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a369e5",
    },
    secondary: {
      main: "#242f9b",
      // contrastText: '#fff',
    },
    error: {
      main: "#7c83fd",
    },
  },
});

function GoalPicker({ setValue, value }) {
  const history = useHistory();
  const [selected, setSelected] = useState([false, false, false]);
  useEffect(() => {
    let temp = 0;
    switch (value) {
      case "KEEP":
        temp = 0;
        break;
      case "DIET":
        temp = 1;
        break;
      case "BULK":
        temp = 2;
        break;
    }

    setSelected(() => {
      const newArray = [false, false, false];
      if (!value) return newArray;
      newArray[Number(temp)] = true;
      return newArray;
    });
  }, [value]);
  const array = [
    {
      title: "유지",
      explanation: "체중 유지를 목표로 합니다",
      subexp: ["50%", "30%", "20%"],
      value: "KEEP",
    },
    {
      title: "다이어트",
      explanation: "체중 감량을 목표로 합니다",
      subexp: ["30%", "40%", "30%"],
      value: "DIET",
    },
    {
      title: "벌크업",
      explanation: "체중 증가를 목표로 합니다",
      subexp: ["40%", "40%", "20%"],
      value: "BULK",
    },
  ];

  return (
    <div className={classes.container}>
      {array.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setValue(array[index].value);
              setSelected(() => {
                const newArray = [false, false, false];
                newArray[index] = true;
                return newArray;
              });
              history.push("/signup/complete");
            }}
            className={selected[index] ? classes.pickedItem : classes.goalItem}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "1000",
                marginLeft: "3vw",
              }}
            >
              {item.title}
            </div>
            <div className={classes.exp} style={{ marginLeft: "3vw" }}>
              <div>{item.explanation}</div>
              <ThemeProvider theme={theme}>
                <div className={classes.info_box}>
                  <div className={classes.info_item}>
                    <Chip label="탄수화물" color="primary" size="small" />
                    <span className={classes.nut_span}>{item.subexp[0]}</span>
                  </div>
                  <div className={classes.info_item}>
                    <Chip label="단백질" color="secondary" size="small" />
                    <span className={classes.nut_span}>{item.subexp[1]}</span>
                  </div>
                  <div className={classes.info_item}>
                    <Chip label="지방" color="error" size="small" />
                    <span className={classes.nut_span}>{item.subexp[2]}</span>
                  </div>
                </div>
              </ThemeProvider>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoalPicker;
