import classes from "./ProgressList.module.css"

import * as React from "react"
import LinearProgress from "@mui/material/LinearProgress"
import { useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#b1e1ff",
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
      {/* 탄수화물 */}
      <div className={classes.progress_item}>
        <div className={classes.nutrient_text}>탄수화물</div>
        <div className={classes.linear_progress}>
          <LinearProgress
            variant="determinate"
            value={progress_value[0]}
            color="inherit"
          />
        </div>
        <div className={classes.circular_progress}>
          <ThemeProvider theme={theme}>
            <CircularProgress
              variant="determinate"
              value={progress_value[0]}
              color="inherit"
              thickness="2.5"
            />
          </ThemeProvider>
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
            value={progress_value[1]}
            color="inherit"
          />
        </div>
        <div className={classes.circular_progress}>
          <ThemeProvider theme={theme}>
            <CircularProgress
              variant="determinate"
              value={progress_value[1]}
              color="inherit"
              thickness="2.5"
            />
          </ThemeProvider>
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
            value={progress_value[2]}
            color="inherit"
          />
        </div>
        <div className={classes.circular_progress}>
          <ThemeProvider theme={theme}>
            <CircularProgress
              variant="determinate"
              value={progress_value[2]}
              color="inherit"
              thickness="2.5"
            />
          </ThemeProvider>
          <span className={classes.percent_text}>{progress_value[2]}%</span>
          <div className={classes.inner_circle}></div>
        </div>
      </div>
    </div>
  )
}
export default ProgressList
