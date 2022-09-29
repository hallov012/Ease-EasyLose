import classes from "./ProgressList.module.css"

import * as React from "react"
import LinearProgress from "@mui/material/LinearProgress"
import { useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(248, 40, 72, .5)",
    },
  },
})

function ProgressList(props) {
  const [progress_value, setValue] = useState([0, 0, 0])
  useEffect(() => {
    if (props.percent !== [0, 0, 0]) {
      setValue(props.percent)
    }
  }, [props.percent])

  return (
    <div className={classes.progress_box}>
      <ThemeProvider theme={theme}>
        {/* 탄수화물 */}
        <div className={classes.progress_item}>
          <div className={classes.nutrient_text}>탄수화물</div>
          <div className={classes.linear_progress}>
            <LinearProgress
              variant="determinate"
              value={progress_value[0] <= 100 ? progress_value[0] : 100}
              color={progress_value[0] <= 100 ? "inherit" : "primary"}
            />
          </div>
          <div className={classes.circular_progress}>
            <CircularProgress
              variant="determinate"
              value={progress_value[0] <= 100 ? progress_value[0] : 100}
              color={progress_value[0] <= 100 ? "inherit" : "primary"}
              thickness="2.5"
            />
            <span className={classes.percent_text}>{progress_value[0]}%</span>
            <div className={classes.inner_circle}></div>
          </div>
        </div>
        {/* 단백질 */}
        <div className={classes.progress_item}>
          <div className={classes.nutrient_text}>단백질</div>
          <div className={classes.linear_progress}>
            <LinearProgress
              variant="determinate"
              value={progress_value[1] <= 100 ? progress_value[1] : 100}
              color={progress_value[1] <= 100 ? "inherit" : "primary"}
            />
          </div>
          <div className={classes.circular_progress}>
            <CircularProgress
              variant="determinate"
              value={progress_value[1] <= 100 ? progress_value[1] : 100}
              color={progress_value[1] <= 100 ? "inherit" : "primary"}
              thickness="2.5"
            />
            <span className={classes.percent_text}>{progress_value[1]}%</span>
            <div className={classes.inner_circle}></div>
          </div>
        </div>
        {/* 지방 */}
        <div className={classes.progress_item}>
          <div className={classes.nutrient_text}>지방</div>
          <div className={classes.linear_progress}>
            <LinearProgress
              variant="determinate"
              value={progress_value[2] <= 100 ? progress_value[2] : 100}
              color={progress_value[2] <= 100 ? "inherit" : "primary"}
            />
          </div>
          <div className={classes.circular_progress}>
            <CircularProgress
              variant="determinate"
              value={progress_value[2] <= 100 ? progress_value[2] : 100}
              color={progress_value[2] <= 100 ? "inherit" : "primary"}
              thickness="2.5"
            />
            <span className={classes.percent_text}>{progress_value[2]}%</span>
            <div className={classes.inner_circle}></div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
export default ProgressList
