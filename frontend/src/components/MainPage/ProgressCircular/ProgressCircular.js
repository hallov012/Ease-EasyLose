import classes from "./ProgressCircular.module.css"

import * as React from "react"
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

function ProgressCircular(props) {
  const percent = props.percent
  const [percent_value, setValue] = useState(0)
  const [circleColor, setColor] = useState("inherit")
  useEffect(() => {
    if (percent) {
      if (percent_value > 100) {
        setColor("primary")
        setValue(100)
      } else {
        setValue(percent)
      }
    }
  })

  return (
    <div className={classes.progress_box}>
      <ThemeProvider theme={theme}>
        <CircularProgress
          variant="determinate"
          value={percent_value}
          color={circleColor}
          thickness="2"
        />
      </ThemeProvider>
      <span className={classes.percent_text}>{percent}%</span>
      <div className={classes.inner_circle}></div>
    </div>
  )
}
export default ProgressCircular
