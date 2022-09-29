import classes from "./ProgressCircular.module.css"

import * as React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(248, 40, 72, .5)",
    },
  },
})

function ProgressCircular(props) {
  const percent = props.percent
  return (
    <div className={classes.progress_box}>
      <ThemeProvider theme={theme}>
        <CircularProgress
          variant="determinate"
          value={percent > 100 ? 100 : percent}
          color={percent > 100 ? "primary" : "inherit"}
          thickness={percent > 100 ? 4 : 2}
        />
      </ThemeProvider>
      <span className={classes.percent_text}>{percent}%</span>
      <div className={classes.inner_circle}></div>
    </div>
  )
}
export default ProgressCircular
